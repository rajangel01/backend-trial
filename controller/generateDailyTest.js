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

    const questionIds = questions.map(q => q._id);

    await DailyTest.create({
      questions: questionIds
    });

    console.log("New Daily Test Generated");
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateDailyTest;