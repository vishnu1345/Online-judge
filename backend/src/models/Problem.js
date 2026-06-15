const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    statement:{
        type: String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    difficulty:{
        type:String,
        enum : ["Easy" , "Medium" , "Hard"],
        required:true
    }
    
});

module.exports = mongoose.model("Problem" , problemSchema);