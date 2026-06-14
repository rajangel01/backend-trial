const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    qId: {
      type: String,
      required: true,
      unique: true,
    },

    questionType: {
      type: String,
      enum: ["MCQ", "MSQ", "NAT"],
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    qImage: String,

    options: [
      {
        text: String,
        image: String,
      },
    ],

    correctAnswer: {
      type: String,
      required: true,
    },

    solution: String,

    solutionImage: String,

    subject: String,

    marks: Number,

    negativeMarks: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("question", questionSchema);
