const Problem = require('../models/Problem');

const getAllProblems = async (req , res) =>{
    try {
        const problems = await Problem.find();

        res.status(200).json({
            success: true,
            count: problems.length,
            problems
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
    
};

module.exports = {
  getAllProblems
};