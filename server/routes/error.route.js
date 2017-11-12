const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  const err = new Error();
  err.status = 404;
  next(err);
});

router.use(function (err, req, res, next) {
  res.json({ error: `404 cannot GET ${req.originalUrl}` });
});

module.exports = router;