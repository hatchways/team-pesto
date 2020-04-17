const { Router } = require("express");

const authenticate = require("../../middlewares/authenticate");
const Review = require("../../models/Review");
const Message = require("../../models/Message");
const MatchQueue = require("../../services/MatchQueue");

const router = Router();
const REQUIRED_CREDITS = 1;

router.post("/requests", authenticate, async (req, res) => {
  const { title, language, code, comments } = req.body;
  const requester = req.user;

  // check for required fields
  if (!language || !code) {
    res.status(400).send({ response: "Invalid input." });
    return;
  }

  // check if user has enough credits
  if (requester.balance < REQUIRED_CREDITS) {
    res.status(403).send({ response: "Insufficient credits." });
    return;
  }

  const date = Date.now();

  // create initial message
  const message = new Message({
    authorId: requester.id,
    date,
    code,
    comments,
  });

  // create new review and embed message
  const review = new Review({
    requesterId: requester.id,
    date,
    title,
    language,
    messages: [message],
  });

  // update user balance
  const originalBalance = requester.balance;
  requester.balance -= REQUIRED_CREDITS;

  // save new and updated documents to database
  const results = await Promise.allSettled([
    message.save(),
    review.save(),
    requester.save(),
  ]);

  // if all documents saved successfully
  if (results.every((r) => r.status === "fulfilled")) {
    await MatchQueue.queueReview(review.id);

    res.sendStatus(201);
    return;
  }

  // rollback database changes if unsuccessful
  requester.balance = originalBalance;
  await Promise.all([
    Message.findByIdAndDelete(message.id),
    Review.findByIdAndDelete(review.id),
    requester.save(),
  ]);
  res.sendStatus(500);
});

router.get("/requests", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const usersRequests = await Review.find({ requesterId: userId });

    const filteredRequests = usersRequests.map((request) =>
      request.filteredSchema()
    );

    res.send({ usersRequests: filteredRequests });
  } catch (err) {
    console.error(err);
  }
});

router.get("/requests/:id", authenticate, async (req, res) => {
  const requestId = req.params.id;

  try {
    const userId = req.user.id;

    const singleRequest = await Review.find({
      _id: { $in: [requestId] },
      requesterId: { $in: [userId] },
    });

    singleRequest[0].filteredSchema();

    res.send({ singleRequest });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
