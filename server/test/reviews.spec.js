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


const testRequester = new User({
  name: 'Requester',
  email: 'requester@email.com',
  password: 'helppls',
  experience: [
    { language: 'python', level: 0 },
  ],
});
const testReviewer = new User({
  name: 'Reviewer',
  email: 'reviewer@email.com',
  password: 'here2help',
  experience: [
    { language: 'python', level: 2 },
  ],
});
const randomUser = new User({
  name: 'Random',
  email: 'user@email.com',
  password: 'qwertyuiop',
  experience: [
    { language: 'javascript', level: 0 },
  ],
});

describe('PUT /api/reviews/:reviewId/status', () => {
  before(async () => {
    await TestDb.connect();

    const saveUsers = [
      testRequester.save(),
      testReviewer.save(),
      randomUser.save(),
    ];
    await Promise.all(saveUsers);

    const token = jwt.sign({ id: testRequester.id }, passportSecret);

    await chai
      .request(app)
      .post('/api/reviews/requests')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Accept This',
        language: 'python',
        code: `print('good code')`,
        comments: 'check it out',
      });
    await chai
      .request(app)
      .post('/api/reviews/requests')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Reject This',
        language: 'python',
        code: `print('good code')`,
        comments: 'check it out',
      });
    
    // wait for review matching
    await setTimeout(() => {}, 1000);    
  });

  it('should return status 200 and change review status to accepted if request accepted', async () => {
    const token = jwt.sign({ id: testReviewer.id }, passportSecret);
    const review = await Review.findOne({ title: 'Accept This' });

    const res = await chai
      .request(app)
      .put(`/api/reviews/${review.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'accept' });

    res.should.have.status(200);
    const updatedReview = await Review.findById(review.id);
    updatedReview.status.should.equal('accepted');
  });

  it('should return status 200 and modify review document accordingly if request declined', () => {
    const token = jwt.sign({ id: testReviewer.id }, passportSecret);
    const review = await Review.findOne({ title: 'Reject This' });

    const res = await chai
      .request(app)
      .put(`/api/reviews/${review.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'reject' });

    res.should.have.status(200);
    const updatedReview = await Review.findById(review.id);
    updatedReview.status.should.equal('pending');
    updatedReview.reviewerId.should.not.equal(testReviewer.id);
    updatedReview.declinedIds.should.include(testReviewer.id);
  });

  it('should return status 401 if user not authorized', () => {
    const review = await Review.findOne({ title: 'Accept This' });

    const res = await chai
      .request(app)
      .put(`/api/reviews/${review.id}/status`)
      .send({ status: 'accept' });
    res.should.have.status(401);
  });

  it('should return status 401 if user authorized but is not the requested reviewer', () => {
    const token = jwt.sign({ id: randomUser.id }, passportSecret);
    const review = await Review.findOne({ title: 'Accept This' });

    const res = await chai
      .request(app)
      .put(`/api/reviews/${review.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'accept' });
    res.should.have.status(401);
  });

  it('should return status 400 if request body is invalid', () => {
    const token = jwt.sign({ id: testReviewer.id }, passportSecret);
    const review = await Review.findOne({ title: 'Accept This' });

    const res = await chai
      .request(app)
      .put(`/api/reviews/${review.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'asdflk;jas' });
    res.should.have.status(400);
  });

  after(async () => {
    await TestDb.close();
  });
});
