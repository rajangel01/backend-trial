//mongodb+srv://rajangel820764:Rajkumar@2003@rajkumar.1a4s6fg.mongodb.net/
// mongodb+srv://rajangel820764:<db_password>@rajkumar.1a4s6fg.mongodb.net/?appName=Rajkumar
const mongoose = require("mongoose");

const connectDB = async () => {
  // const MongoURI = "mongodb+srv://rajangel820764:<db_password>@rajkumar.1a4s6fg.mongodb.net/test1?appName=Rajkumar"
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;