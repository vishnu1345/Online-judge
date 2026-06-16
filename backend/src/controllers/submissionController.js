const judgeService = require('../services/judgeService');
const TestCase = require('../models/Testcase');
const Submission = require('../models/Submission');

const submitCode = async (req, res) => {
    try {
        const {code , language} = req.body;
        const { id } = req.params;
        
        const submission = await Submission.create({
            userId : req.user.id,
            problemId : id,
            code,
            language,
            verdict : "Pending"
        });

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
        
        submission.verdict = result.verdict;

        await submission.save();

        return res.json({
            submissionId : submission._id,
            verdict : submission.verdict,
            error: result.error,
            expected: result.expected,
            received: result.received
        })

    } catch (error) {
        return res.status(500).json({
            error : error.message
        })
    }
};

const getMySubmissions = async (req, res) => {
  const submissions = await Submission.find({
    userId: req.user.id,
  })
    .populate("problemId", "title difficulty")
    .sort({
      createdAt: -1,
    });

  res.json(submissions);
};


module.exports = { submitCode , getMySubmissions };