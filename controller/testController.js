// controller/testController.js

const DailyTest = require("../src/dailyTest");

const getDailyTest = async (req, res) => {
  try {
    const test = await DailyTest.findOne()
      .populate("questions");

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "No test available"
      });
    }

    res.status(200).json({
      success: true,
      totalQuestions: test.questions.length,
      questions: test.questions
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = { getDailyTest };