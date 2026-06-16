const {submitCode} = require('../controllers/submissionController');
const express = require('express');
const router = express.Router();

router.post('/submit/:id' , submitCode);

module.exports = router;