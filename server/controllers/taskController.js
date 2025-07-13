const todoModel = require("../models/todoModel");

// Create Task Controller
const createTaskController = async (req, res) => {
  try {
    const { task } = req.body;

    const Task = new todoModel({
      taskName: task,
    });
    const isAlready = await todoModel.findOne({ taskName: task });
    if (isAlready) {
      return res.status(400).send({ message: "Task Already exist" });
    }
    await Task.save();

    res.status(201).send({ message: "Task added successfully.." });
  } catch (error) {
    res.status(500).send({ message: "server error", Error: error });
  }
};

// Show All task controller
const showAllTaskController = async (req, res) => {
  try {
    const Tasks = await todoModel.find();

    res.status(200).send({ message: "Task added successfully..", data: Tasks });
  } catch (error) {
    res.status(500).send({ message: "server error", Error: error });
  }
};

// Delete Task controller
const deleteTaskController = async (req, res) => {
  try {
    const Id = req.body.id;
    await todoModel.findByIdAndDelete(Id);
    res.status(200).send({ message: "Task deleted" });
  } catch (error) {
    res.status(500).send({ message: "server error", Error: error });
  }
};

// get Single data controller
const getSingleDataController = async (req, res) => {
  try {
    const Id = req.params.id;
    const Task = await todoModel.findById(Id);
    res.status(200).send({ message: "successfully received", data: Task });
  } catch (error) {
    res.status(500).send({ message: "server error", Error: error });
  }
};

// Update task Controller
const updateTaskController = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = req.body;
    await todoModel.findByIdAndUpdate(_id, data);
    res.status(200).send({ message: "Updated Successfully.." });
  } catch (error) {
    res.status(500).send({ message: "This Task Already Exist", Error: error });
  }
};

module.exports = {
  createTaskController,
  showAllTaskController,
  deleteTaskController,
  getSingleDataController,
  updateTaskController,
};
