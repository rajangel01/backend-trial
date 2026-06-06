const mongoose =  require("mongoose");

const userSchema  = new mongoose.Schema({
    userId:{
        type:Number,
        unique:true
    },
    name:{
        type:String,
        required:true 
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    totalAttemptedTests: {
    type: Number,
    default: 0
    },
    averageScore: {
    type: Number,
    default: 0
    },
    highestScore: {
    type: Number,
    default: 0
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("testuser",userSchema);