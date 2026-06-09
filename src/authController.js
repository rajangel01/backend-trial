const Otp = require("./otp")
const nodemailer = require("nodemailer");

// console.log("EMAIL:", process.env.EMAIL);
// console.log("APP_PASSKEY:", process.env.APP_PASSKEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSKEY
  }
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Naya OTP save
    await Otp.create({
      email,
      otp,
    });

    // Email send
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification OTP for GATEProCS",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2>Email Verification</h2>

          <p>Your OTP is:</p>

          <h1 style="
            color:#0d6efd;
            letter-spacing:5px;
          ">
            ${otp}
          </h1>

          <p>
            This OTP is valid for
            <strong>5 minutes</strong>.
          </p>

          <p>
            Please do not share this OTP
            with anyone.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log("OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};



exports.verifyOtp = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({
      email,
      otp
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // OTP use ho gaya, delete kar do
    await Otp.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};