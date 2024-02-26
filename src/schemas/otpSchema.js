import mongoose from "mongoose";
const { Schema } = mongoose;

const otpSchema = new Schema({
  OTP: { type: String, require: true },
  created_At: { type: Number },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        // Regular expression for basic email format validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  resend_Time: { type: Number, default: 0 },
  timeForResend: { type: Number },
});

const Otp = mongoose.models.otps || mongoose.model('otps', otpSchema);

module.exports = Otp;