const express = require('express');
const router = express.Router();

// Demo route
router.get('/', (req, res) => {
  res.send('Customer API working');
});

module.exports = router;
