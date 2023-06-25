const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    hobbies: [
      {
        type: String,
        trim: true,
      },
    ],
    userType: {
      type: String,
      enum: ["Employee", "Manager"],
      default: "Employee",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
