const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      //select: false  security
    },

    refreshToken:{
      type: String,
      default: null
    },

    otp: {
      type: Number,
      default: null
    },

    otpExpiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("User", userSchema);
