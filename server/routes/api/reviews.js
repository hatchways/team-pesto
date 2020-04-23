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

    if (singleRequest[0]) {
      singleRequest[0].filteredSchema();
    } else {
      return res.sendStatus(400);
    }

    res.send({ singleRequest });
  } catch (err) {
    console.error(err);
  }
});

router.post(
  "/:requestId",
  authenticate,
  async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;
    const { code, comments } = req.body;

    if (!code || !comments) {
      return res.sendStatus(400);
    }

    try {
      const request = await Review.findById(requestId);
      const { requesterId, reviewerId } = request;

      // return 403 if user is neither requester nor reviewer
      if (userId !== requesterId && userId !== reviewerId) return res.sendStatus(403);

      const message = await new Message({
        authorId: requesterId,
        
      });


      // const message = new Message({
      //   authorId: requester.id,
      //   date,
      //   code,
      //   comments,
      // });

      return res.status(201).send(message);
    } catch (err) {
      console.error(err);
    }
  }
);

router.put(
  "/:requestId/messages/:messageId",
  authenticate,
  async (req, res) => {
    const messageId = req.params.messageId;
    const requestId = req.params.requestId;
    const userId = req.user.id;
    const { code, comments } = req.body;

    if (!code || !comments) {
      return res.sendStatus(400);
    }

    try {
      const request = await Review.findById(requestId);
      const message = request.messages.id(messageId);

      if (!message) {
        return res.sendStatus(404);
      }

      if (message["_id"] == messageId && message.authorId == userId) {
        request.messages.id(messageId).code = code;
        request.messages.id(messageId).comments = comments;

        await request.save();
        return res.sendStatus(200);
      } else {
        return res.sendStatus(403);
      }
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
