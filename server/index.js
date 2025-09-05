const express = require('express');
const cors = require('cors');
require('dotenv').config();

const menuroutes = require('./routes/menuroutes');
const filterroutes = require('./routes/filterroutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const port = process.env.DB_PORT || 4000;

// --------------------
// OTP STORE (in memory)
// --------------------
let otpStore = {};

// Send OTP
app.post("/api/auth/send-otp", (req, res) => {
  const { phoneNumber, name } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phoneNumber] = otp;

  // TODO: Replace with SMS provider (Twilio/Firebase/etc.)
  console.log(`OTP for ${phoneNumber}: ${otp}`);

  res.json({ success: true, message: "OTP sent successfully" });
});

// Verify OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: "Phone number and OTP required" });
  }

  if (otpStore[phoneNumber] && otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber];
    return res.json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

// --------------------
// Other routes
// --------------------
app.use("/api/m", menuroutes);
app.use("/api/cat", filterroutes);

// --------------------
// Start server
// --------------------
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
