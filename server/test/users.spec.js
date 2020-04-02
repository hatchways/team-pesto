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
  before(async () => {
    await testDb.clear();
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
        res.body.should.have.property("token");

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

describe("POST /api/users/login", () => {
  before(async () => {
    await testDb.clear();

    const users = [
      new User({
        name: "Mario",
        email: "mario@nintendo.com",
        password: "zrWLfy3JG8",
      }).save(),
      new User({
        name: "Luigi",
        email: "luigi@nintendo.com",
        password: "zrWLfy3JG8",
      }).save(),
      new User({
        name: "Sonic",
        email: "rings@sega.com",
        password: "NymRit",
      }).save(),
    ];

    await Promise.all(users);
  });

  it("should return status code 200 and jwt on success", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "rings@sega.com", password: "NymRit" })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.have.property("token");

        done();
      });
  });

  it("should return status code 401 if email is unregistered", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "saint_nick@northpole.org", password: "NymRit" })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);

        done();
      });
  });

  it("should return status code 401 if password is incorrect", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "rings@sega.com", password: "fwFOJf" })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);

        done();
      });
  });

  it("should return the correct user if password is shared", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "luigi@nintendo.com", password: "zrWLfy3JG8" })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);

        done();
      });
  });

  it("should return status code 400 if email missing", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ password: "zrWLfy3JG8" })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });

  it("should return status code 400 if password missing", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "luigi@nintendo.com" })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        done();
      });
  });
});
