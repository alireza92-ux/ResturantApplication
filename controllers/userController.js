const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const Address = require("../model/Address");

exports.registerUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    firstLine,
    secondLine,
    postalCode,
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("email must be unique...");
      error.statusCode = 422;
      throw error;
    }

    const address = await Address.create({ firstLine, secondLine, postalCode });

    await User.create({ firstName, lastName, address, email, password });

    res.status(201).json({ message: "user was registered successfuly!" });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("cannot find any user...");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      const error = new Error("cannot find any user...");
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    next(err);
  }
};
