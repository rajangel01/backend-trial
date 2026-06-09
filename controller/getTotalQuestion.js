const Question = require("../src/question")

const getTotalQuestions = async(req, res) => {
    try{
        const totalQuestions = await Question.countDocuments();
    res.status(200).json({
      success: true,
      totalQuestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

module.exports = { getTotalQuestions };