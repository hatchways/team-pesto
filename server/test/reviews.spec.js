const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");

const { passportSecret } = require("../config/keys");
const reviewsRouter = require("../routes/api/reviews");
const User = require("../models/User");
const Review = require("../models/Review");
const TestApp = require("./TestApp");
const TestDb = require("./TestDb");

const should = chai.should();
chai.use(chaiHttp);

const app = TestApp();
app.use("/api/reviews", reviewsRouter);

const testUser1 = new User({
  name: "Scrooge McDuck",
  email: "ghost@christmaspast.com",
  password: "money$",
  balance: 100,
});
const testUser2 = new User({
  name: "Penny Less",
  email: "penniless@email.com",
  password: "password123",
  balance: 0,
});

describe("POST /api/reviews/requests", () => {
  before(async () => {
    await TestDb.connect();

    const saveUsers = [testUser1.save(), testUser2.save()];
    await Promise.all(saveUsers);
  });

  it("should successfully create a request and return code 201 if request is well-formed and user balance is sufficient", (done) => {
    const token = jwt.sign({ id: testUser1.id }, passportSecret);

    chai
      .request(app)
      .post("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My Review Request",
        language: "javascript",
        code: `console.log('hello world!');`,
        comments: "please take a look at my code",
      })
      .end(async (err, res) => {
        should.not.exist(err);
        res.should.have.status(201);

        const review = await Review.findOne({ title: "My Review Request" });
        should.exist(review);
        review.requesterId.toString().should.equal(testUser1.id);
        review.language.should.equal("javascript");
        review.messages.should.have.lengthOf(1);

        const message = review.messages[0];
        message.authorId.toString().should.equal(testUser1.id);
        message.code.should.equal(`console.log('hello world!');`);
        message.comments.should.equal("please take a look at my code");

        const requester = await User.findById(testUser1.id);
        requester.balance.should.equal(99);

        done();
      });
  });

  it("should return code 401 if user is not authenticated", (done) => {
    chai
      .request(app)
      .post("/api/reviews/requests")
      .set("Authorization", null)
      .send({
        title: "Unauthorized Request",
        language: "javascript",
        code: `console.log('foo bar baz');`,
        comments: "please take another look at my code",
      })
      .end(async (err, res) => {
        should.not.exist(err);
        res.should.have.status(401);

        const review = await Review.findOne({ title: "Unauthorized Request " });
        should.not.exist(review);

        done();
      });
  });

  it("should return code 403 if user has insufficient credits", (done) => {
    const token = jwt.sign({ id: testUser2.id }, passportSecret);

    chai
      .request(app)
      .post("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "No Credit Request",
        language: "javascript",
        code: `console.log('hello world!');`,
        comments: "please take a look at my code",
      })
      .end(async (err, res) => {
        should.not.exist(err);
        res.should.have.status(403);

        const requester = await User.findById(testUser2.id);
        requester.balance.should.equal(0);

        const review = await Review.findOne({ title: "No Credit Request" });
        should.not.exist(review);

        done();
      });
  });

  it("should return code 400 if review request does not include the language field", (done) => {
    const token = jwt.sign({ id: testUser1.id }, passportSecret);

    chai
      .request(app)
      .post("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Missing Language",
        code: `console.log('hello world!');`,
        comments: "please take a look at my code",
      })
      .end(async (err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        const review = await Review.findOne({ title: "Missing Language" });
        should.not.exist(review);

        done();
      });
  });

  it("should return code 400 if review request does not include code snippet", (done) => {
    const token = jwt.sign({ id: testUser1.id }, passportSecret);

    chai
      .request(app)
      .post("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Missing Code",
        language: "javascript",
        comments: "please take a look at my code",
      })
      .end(async (err, res) => {
        should.not.exist(err);
        res.should.have.status(400);

        const review = await Review.findOne({ title: "Missing Code" });
        should.not.exist(review);

        done();
      });
  });

  after(async () => {
    await TestDb.close();
  });
});

// Users for GET Request test
const User1 = new User({
  name: "Scrooge McDuck",
  email: "ghost@christmaspast.com",
  password: "money$",
  balance: 100,
});
const User2 = new User({
  name: "Penny Less",
  email: "penniless@email.com",
  password: "password123",
  balance: 0,
});
const User1Reviews = new Review({
  requesterId: {},
  reviewerId: {},
  title: "password123",
  language: "javascript",
  status: "pending",
  messages: [],
});

describe("GET /api/reviews/requests", () => {
  before(async () => {
    await TestDb.connect();

    const saveUsers1 = User1.save();
    const saveUsers2 = User2.save();
    User1Reviews.requesterId = User1._id;
    User1Reviews.reviewerId = User2._id;
    const saveReviews = User1Reviews.save();
    await Promise.all([saveUsers1, saveUsers2, saveReviews]);
  });

  it("should successfully return array of users requests with at least a length of one", (done) => {
    const token = jwt.sign({ id: User1._id }, passportSecret);

    chai
      .request(app)
      .get("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .end(async (err, res) => {
        should.not.exist(err);
        const usersRequests = await Review.find({ requesterId: User1._id });
        should.exist(usersRequests);
        usersRequests.should.be.an("array").with.length.above(0);

        done();
      });
  });

  it("should successfully return all fields needed", (done) => {
    const token = jwt.sign({ id: User1._id }, passportSecret);

    chai
      .request(app)
      .get("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .end(async (err, res) => {
        should.not.exist(err);
        const usersRequests = await Review.find({ requesterId: User1._id });
        should.exist(usersRequests);

        usersRequests[0].requesterId.toString().should.equal(User1.id);
        usersRequests[0].reviewerId.toString().should.equal(User2.id);
        usersRequests[0].title.length.should.be.above(0);
        usersRequests[0].language.length.should.be.above(0);
        usersRequests[0].status.length.should.be.above(0);
        usersRequests[0].messages.should.be.an("array");

        done();
      });
  });

  after(async () => {
    await TestDb.close();
  });
});

// Users for GET :id Request test
const User1Single = new User({
  name: "Scrooge McDuck",
  email: "ghost@christmaspast.com",
  password: "money$",
  balance: 100,
});
const User2Single = new User({
  name: "Penny Less",
  email: "penniless@email.com",
  password: "password123",
  balance: 0,
});
const User1SingleReviews = new Review({
  requesterId: {},
  reviewerId: {},
  title: "password123",
  language: "javascript",
  status: "pending",
  messages: [],
});

describe("GET /api/reviews/requests/:id", () => {
  before(async () => {
    await TestDb.connect();

    const saveUsers1 = User1Single.save();
    const saveUsers2 = User2Single.save();
    User1SingleReviews.requesterId = User1Single._id;
    User1SingleReviews.reviewerId = User2Single._id;
    const saveReviews = User1SingleReviews.save();
    await Promise.all([saveUsers1, saveUsers2, saveReviews]);
  });

  it("should successfully return an array with a length of one", (done) => {
    const token = jwt.sign({ id: User1Single.id }, passportSecret);

    chai
      .request(app)
      .get("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .end(async (err, res) => {
        should.not.exist(err);
        const singleRequest = await Review.find({
          _id: { $in: [User1SingleReviews.id] },
          requesterId: { $in: [User1Single.id] },
        });
        should.exist(singleRequest);
        singleRequest.should.be.an("array").with.lengthOf(1);
        done();
      });
  });

  it("should successfully return all fields needed", (done) => {
    const token = jwt.sign({ id: User1Single.id }, passportSecret);

    chai
      .request(app)
      .get("/api/reviews/requests")
      .set("Authorization", `Bearer ${token}`)
      .end(async (err, res) => {
        should.not.exist(err);
        const singleRequest = await Review.find({
          _id: { $in: [User1SingleReviews.id] },
          requesterId: { $in: [User1Single.id] },
        });
        should.exist(singleRequest);

        singleRequest[0].requesterId.toString().should.equal(User1Single.id);
        singleRequest[0].reviewerId.toString().should.equal(User2Single.id);
        singleRequest[0].title.length.should.be.above(0);
        singleRequest[0].language.length.should.be.above(0);
        singleRequest[0].status.length.should.be.above(0);
        singleRequest[0].messages.should.be.an("array");

        done();
      });
  });

  after(async () => {
    await TestDb.close();
  });
});
