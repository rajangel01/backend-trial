// controller/testController.js

const DailyTest = require("../src/dailyTest");

const getDailyTest = async (req, res) => {
  try {
    const questions = await DailyTest.find();
    
        res.status(200).json({
          success: true,
          questions,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
  }
};

module.exports = { getDailyTest };