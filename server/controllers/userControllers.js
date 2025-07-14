const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const userRegController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPass = await bcrypt.hash(password, 10);
    const User = new userModel({
      name,
      email,
      password: hashPass,
    });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email Already taken*" });
    }

    await User.save();
    res.status(201).send({ message: "Registration successfully.." });
  } catch (error) {
    res.status(500).send({ message: "server issue" });
  }
};

// Login Controller

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const matchEmail = await userModel.findOne({ email });
    if (!matchEmail) {
      return res.status(404).send({ message: "Email Not found!" });
    }

    const matchPass = await bcrypt.compare(password, matchEmail.password);
    if (!matchPass) {
      return res.status(400).send({ message: "Incorrect Password!" });
    }
    res.status(200).send({ message: "Login Successfully", data: matchEmail });
  } catch (error) {
    res.status(500).send({ message: "server issue" });
  }
};

module.exports = {
  userRegController,
  userLoginController,
};
