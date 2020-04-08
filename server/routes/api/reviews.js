const { Router } = require('express');

const authenticate = require('../../middlewares/authenticate');

const router = Router();
const REQUIRED_CREDITS = 1;

router.post('/requests',
  authenticate,
  (req, res) => {
    const { title, language, code, comments } = req.body;

    // check for required fields
    if (!language || !code) {
      res.status(400).send({ response: 'Missing input.' });
      return;
    }

    // check if user has enough credits
    if (req.user.balance < REQUIRED_CREDITS) {
      res.status(403).send({ response: 'Insufficient credits.' });
      return;
    }

    res.sendStatus(500);
  }
);

module.exports = router;
