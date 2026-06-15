
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const ConnectDB = require("./src/database");
const User = require("./src/user");
const Question = require("./src/question");
const {getTotalUsers} = require("./controller/getTotalUser");
const {getTotalQuestions} = require("./controller/getTotalQuestion");
// const { submitTest } = require("./controller/testController");
// require("./controller/dailyTestCron")
const {
  sendOtp,
} = require("./src/authController")
const{
  verifyOtp,
} = require("./src/authController")
const {
  updateYoutubeVideo,
  getYoutubeVideo,
} = require("./controller/ytLink");
let Counter = require("./src/counter");
const cron = require("node-cron");
const generateDailyTest = require("./controller/generateDailyTest");
const { getDailyTest } = require("./controller/testController");

ConnectDB();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

//Update Daily Question
cron.schedule("0 0 * * *", async () => {
  console.log("Generating Daily Test...");
  await generateDailyTest();
});

// generateDailyTest();

// Counter Function
async function getNextUserId() {
  const counter = await Counter.findByIdAndUpdate(
    "userId",
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  return counter.seq;
}

// User signup API
app.post("/signup", async (req, res) => {
  try {
    // const { name, number, email, address, password } = req.body;
    const newUserId = await getNextUserId();
    const userId = newUserId;
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    const address = req.body.address;
    const password = req.body.password;

    // check user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // create user
    const newUser = new User({
      userId,
      name,
      number,
      email,
      address,
      password,
    });

    await newUser.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Login API
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // check user
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

app.post("/login-by-email", async (req, res) => {
  try {
    const email = req.body.email;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

app.post("/add-question", async (req, res) => {
  try {
    const question = new Question(req.body);

    await question.save();

    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/all-questions", async (req, res) => {
  try {
    const questions = await Question.find();

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
});


// app.get("/daily-test", async (req, res) => {

//     const test = await DailyTest.findOne()
//         .populate("questions");

//     res.json(test);

// });

app.post("/send-otp", sendOtp);
app.post("/verify-otp", verifyOtp);
app.get("/total-users", getTotalUsers);
app.get("/total-questions", getTotalQuestions);
app.put("/youtube-video-update", updateYoutubeVideo);
app.get("/youtube-video", getYoutubeVideo);
app.get("/daily-test", getDailyTest);
// app.post("/submit-test", submitTest);

// app.listen(port, () => {
//   console.log("server is running on port " + port);
// });

module.exports = app