const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", todoSchema);
