const Problem = require("../models/Problem");
const TestCase = require("../models/Testcase");

const getProblemDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            })
        }
        // console.log("problemId" , id);
        const testcase = await TestCase.findOne({
            problemId: id
        })
        // console.log(testcases);
        res.status(200).json({
            success: true,
            problem,
            testcase
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getProblemDetails };