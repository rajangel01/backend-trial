// utils/generateDailyTest.js

const Question = require("../src/question");
const DailyTest = require("../src/dailyTest");

const generateDailyTest = async () => {
  try {
    // Purana test delete
    await DailyTest.deleteMany({});

    // Random 65 Questions
    const questions = await Question.aggregate([
      { $sample: { size: 25 } }
    ]);
    // _id remove karo taaki naye documents create hon
    const copiedQuestions = questions.map(({ _id, ...rest }) => rest);

    // DailyTest me save karo
    await DailyTest.insertMany(copiedQuestions);

    console.log("Daily Test Generated");
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateDailyTest;
