const chai = require("chai");
const chaiHttp = require("chai-http");
const express = require("express");

const reviewsRouter = require("../routes/api/reviews");
const User = require("../models/User");
const testDb = require("./TestDb");

const should = chai.should();
chai.use(chaiHttp);

const { json } = express;
const app = express();
app.use(json());
app.use("/api/reviews", reviewsRouter);

describe("POST /api/reviews/requests", () => {
  before(async () => {
    await testDb.connect();

    const users = [
      new User({
        name: "Scrooge McDuck",
        email: "ghost@christmaspast.com",
        password: "money$",
        balance: 100,
      }).save(),
      new User({
        name: "Penny Less",
        email: "penniless@email.com",
        password: "password123",
        balance: 0,
      }).save(),
    ];

    await Promise.all(users);
  });

  it("should successfully create a request and return code 201 if request is well-formed and user balance is sufficient", (done) => {
    chai
      .request(app)
      .post("/api/reviews/requests")
      // TODO: attach jwt to req header
      .send({
        title: "My Review Request",
        language: "javascript",
        code: `console.log('hello world!');`,
        comments: "please take a look at my code",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(201);
        // TODO: check if request is in database
        // TODO: check that balance was correctly reduced

        done();
      });
  });

  it("should return code 401 if user is not authenticated", (done) => {
    chai
      .request(app)
      .post("/api/reviews/requests")
      .set("Authorization", null)
      .send({
        title: "My Second Review Request",
        language: "javascript",
        code: `console.log('foo bar baz');`,
        comments: "please take another look at my code",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);

        done();
      });
  });

  it("should return code 403 if user has insufficient credits", (done) => {
    chai
      .request(app)
      .post("/api/reviews/requests")
      // TODO: attach jwt to req header
      .send({
        title: "My Review Request",
        language: "javascript",
        code: `console.log('hello world!');`,
        comments: "please take a look at my code",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);

        done();
      });
  });

  it("should return code 400 if review request does not include the language field", (done) => {
    chai
      .request(app)
      .post("/api/reviews/requests")
      // TODO: attach jwt to req header
      .send({
        title: "My Review Request",
        code: `console.log('hello world!');`,
        comments: "please take a look at my code",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });

  it("should return code 400 if review request does not include code snippet", (done) => {
    chai
      .request(app)
      .post("/api/reviews/requests")
      // TODO: attach jwt to req header
      .send({
        title: "My Review Request",
        language: "javascript",
        comments: "please take a look at my code",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });
});
