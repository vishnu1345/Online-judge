const express = require('express');
const router = express.Router();

const { getAllProblems } = require("../controllers/fetchProblems");
const {getProblemDetails} = require("../controllers/singleProblem");

router.get("/", getAllProblems);
router.get("/:id" , getProblemDetails);

module.exports = router;