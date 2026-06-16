const {submitCode , getMySubmissions } = require('../controllers/submissionController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware')

router.post('/submit/:id' , authMiddleware , submitCode);
router.get("/submissions", authMiddleware , getMySubmissions);

module.exports = router;