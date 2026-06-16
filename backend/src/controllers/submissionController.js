const judgeService = require('../services/judgeService');
const TestCase = require('../models/Testcase');

const submitCode = async (req, res) => {
  const { code } = req.body;
    const {id} = req.params;

  const testCaseDoc = await TestCase.findOne({
    problemId: id,
  });

  if (!testCaseDoc) {
    return res.status(404).json({
      error: "No testcases found",
    });
  }

  const result = await judgeService.judgeSubmission({
    code,
    testcases: testCaseDoc.cases,
  });
  
  res.json(result);
};


module.exports = { submitCode };