require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const express = require("express");

const pingRouter = require("../routes/ping");

chai.should();
chai.use(chaiHttp);

const { json } = express;
const app = express();
app.use(json());
app.use("/ping", pingRouter);

describe("/POST ping", () => {
  it("it should return 400", (done) => {
    chai
      .request(app)
      .post(`/ping/`)
      .send({ teamName: "Pikachu" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("response")
          .eql("Pikachu is not part of the team. Modify your .env");
        done();
      });
  });
});
