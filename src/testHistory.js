const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema({
    testId: {
        type: String,
        ref: "Test",
        required: true
    },

    userId: {
        type: Number,
        ref: "User",
        required: true
    },

    attempted: {
        type: Number,
        default: 0
    },

    unattempted: {
        type: Number,
        default: 0
    },

    correct: {
        type: Number,
        default: 0
    },

    wrong: {
        type: Number,
        default: 0
    },

    score: {
        type: Number,
        default: 0
    },

    accuracy: {
        type: Number,
        default: 0
    },

    timeTaken: {
        type: Number, // seconds
        required: true
    },

    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("TestHistory", testAttemptSchema);