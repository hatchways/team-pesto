const { Router } = require("express");

const authenticate = require("../../middlewares/authenticate");
const Review = require("../../models/Review");
const Message = require("../../models/Message");
const MatchQueue = require("../../services/MatchQueue");
const { createNotification } = require("../../controllers/notifications");

const router = Router();
const REQUIRED_CREDITS = 1;

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ reviewerId: userId }, null, {
      sort: { date: -1 },
    }).populate({
      path: "messages",
      model: "message",
      populate: {
        path: "author",
        model: "user",
      },
    });

    const filteredReviews = reviews.map((review) => review.filteredSchema());

    res.send({ reviews: filteredReviews });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:reviewId/status", authenticate, async (req, res) => {
  const review = await Review.findOne({ _id: req.params.reviewId });

  if (!review) {
    res.sendStatus(404);
    return;
  }

  // check if user is the requested reviewer
  // eslint-disable-next-line eqeqeq
  if (req.user.id != review.reviewerId) {
    res.sendStatus(403);
    return;
  }

  if (req.body.status === "accepted") {
    review.status = req.body.status;
    await review.save();
    await MatchQueue.remove(review.id);

    await createNotification({
      reviewId: review.id,
      recipientId: review.requesterId,
      counterpartId: req.user.id,
      code: 2,
    });

    res.status(200).send("Accepted");
    return;
  }

  if (req.body.status === "rejected") {
    review.declinedIds.push(review.reviewerId);
    review.reviewerId = null;
    await review.save();
    await MatchQueue.promote(review.id);
    res.status(200).send("Rejected");
    return;
  }

  // send status 400 if request body unrecognized
  res.sendStatus(400);
});

router.put(
  "/:requestId/messages/:messageId",
  authenticate,
  async (req, res) => {
    const { messageId } = req.params;
    const userId = req.user.id;
    const { code, comments } = req.body;

    if (!code && !comments) {
      res.sendStatus(400);
      return;
    }

    try {
      const message = await Message.findById(messageId);

      if (!message) {
        res.sendStatus(404);
        return;
      }

      // eslint-disable-next-line eqeqeq
      if (message.author == userId) {
        message.code = code;
        message.comments = comments;

        await message.save();
        res.sendStatus(200);
        return;
      }
      res.sendStatus(403);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    }
  }
);

router.get("/requests", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await Review.find({ requesterId: userId }, null, {
      sort: { date: -1 },
    }).populate({
      path: "messages",
      model: "message",
      populate: {
        path: "author",
        model: "user",
      },
    });

    const filteredRequests = requests.map((request) =>
      request.filteredSchema()
    );

    res.send({ requests: filteredRequests });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.sendStatus(500);
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

    if (singleRequest[0]) {
      singleRequest[0].filteredSchema();
    } else {
      res.sendStatus(400);
      return;
    }

    res.send({ singleRequest });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.sendStatus(500);
  }
});

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
    author: requester.id,
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
    messages: [message.id],
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

router.post(
  "/:requestId",
  authenticate,
  async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;
    const { code, comments } = req.body;

    if (!code && !comments) {
      return res.sendStatus(400);
    }

    try {
      const request = await Review.findById(requestId);
      const { requesterId, reviewerId } = request;

      // return 403 if user is neither requester nor reviewer.
      // note: must coerce from Object ID to String
      if (userId !== String(requesterId) && userId !== String(reviewerId)) return res.sendStatus(403);

      const newMessage = await new Message({
        author: String(requesterId),
        date: Date.now(),
        code,
        comments,
      });
      const message = await newMessage.save();
      request.messages.push(newMessage['_id']);
      await request.save();
      return res.status(201).send(message);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
