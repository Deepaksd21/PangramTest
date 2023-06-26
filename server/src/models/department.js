const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Department = model("Department", departmentSchema);

module.exports = Department;
