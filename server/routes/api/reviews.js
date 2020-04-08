const { Router } = require('express');

const router = Router();

router.post('/requests', (req, res) => {
  res.sendStatus(500);
});

module.exports = router;
