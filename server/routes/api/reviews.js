const { Router } = require("express");
const mongoose = require("mongoose");

const authenticate = require("../../middlewares/authenticate");
const User = require("../../models/User");
const Review = require("../../models/Review");
const Message = require("../../models/Message");

const router = Router();
const REQUIRED_CREDITS = 1;

router.post("/requests", authenticate, async (req, res) => {
  // TODO: implement two phase commit for database operations

  const { title, language, code, comments } = req.body;

  // check for required fields
  if (!language || !code) {
    res.status(400).send({ response: "Missing input." });
    return;
  }

  // check if user has enough credits
  if (req.user.balance < REQUIRED_CREDITS) {
    res.status(403).send({ response: "Insufficient credits." });
    return;
  }

  const date = Date.now();

  try {
    // create initial message
    const message = new Message({
      authorId: req.user.id,
      date,
      code,
      comments,
    });

    // create new review and embed message
    const review = new Review({
      requesterId: req.user.id,
      date,
      title,
      language,
      messages: [message],
    });

    // update user balance
    const requester = await User.findById(req.user.id);
    requester.balance -= REQUIRED_CREDITS;

    // save new and updated documents to database
    await Promise.all([message.save(), review.save(), requester.save()]);

    res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.sendStatus(500);
  }
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
