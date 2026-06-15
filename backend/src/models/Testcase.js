const mongoose = require("mongoose");

const testCaseSchema = mongoose.Schema({
    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },
    cases:[
        {
            input: String,
            output: String
        }
    ]
});

module.exports = mongoose.model("TestCase" , testCaseSchema);