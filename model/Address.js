const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  firstLine: {
    type: String,
    required: [true, "first line is required..."],
  },
  secondLine: {
    type: String,
    required: [true, "second line is required..."],
  },
  postalCode: {
    type: String,
    required: [true, "postal code is required..."],
  },
});

const Address = new mongoose.model("Address", AddressSchema);

module.exports = Address;
