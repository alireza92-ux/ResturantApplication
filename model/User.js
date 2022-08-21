const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required..."],
  },
  lastName: {
    type: String,
    required: [true, "last name is required..."],
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
    required: [true, "user address is required..."],
  },
  email: {
    type: String,
    required: [true, "email is required..."],
    unique: [true, "email must be unique..."],
  },
  password: {
    type: String,
    required: [true, "password is required..."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
const User = new mongoose.model("User", UserSchema);

module.exports = User;
