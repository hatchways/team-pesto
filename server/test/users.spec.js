const chai = require("chai");
const chaiHttp = require("chai-http");
const express = require("express");

const usersRouter = require("../routes/api/users");
const User = require("../models/User");
const testDb = require("./TestDb");

const should = chai.should();
chai.use(chaiHttp);

const { json } = express;
const app = express();
app.use(json());
app.use("/api/users", usersRouter);

testDb.connect();

describe("POST /api/users/signup", () => {
  before((done) => {
    testDb.clear().then(() => {
      done();
    });
  });

  it("should return status code 400 if missing name", (done) => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({
        email: "email@email.com",
        password: "password",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });

  it("should return status code 400 if missing email", (done) => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({
        name: "John Smith",
        password: "password",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });

  it("should return status code 400 if missing password", (done) => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({
        name: "John Smith",
        email: "email@email.com",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });

  it("should return status code 201 and JWT token on success", (done) => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({
        name: "John Smith",
        email: "email@email.com",
        password: "password",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(201);
        res.should.have.header("Authorization");

        done();
      });
  });

  it("should return status code 409 if email already registered", (done) => {
    const existingUser = new User({
      name: "Jane Doe",
      email: "test@email.com",
      password: "scoobydoo",
    });

    existingUser.save().then(() => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          name: "Bobby Bob",
          email: "test@email.com",
          password: "password123",
        })
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(409);

          done();
        });
    });
  });
});
