const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    problemId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Problem",
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:["cpp", "java", "python"]
    },
    verdict:{
        type:String,
        enum:["Pending", "Accepted" , "Rejected" , "Time Limit Exceeded", "Runtime Error" , "Compilation Error"],
        default:"Pending"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Submission" , submissionSchema);