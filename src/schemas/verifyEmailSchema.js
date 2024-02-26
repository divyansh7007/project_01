const mongoose = require("mongoose");
const { Schema } = mongoose;

const verifyEmailSchema = new Schema({
  verified: { type: Boolean, default: true },
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
});

const VerifyEmail = mongoose.models?.VerifyEmail || mongoose.model('VerifyEmail', verifyEmailSchema);

module.exports = VerifyEmail;
