const mongoose = require("mongoose");

const SliderSchmea = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "slider image is required..."],
  },
  title: {
    type: String,
    required: [true, "slider title is required"],
  },
  description: {
    type: String,
    required: [true, "slider description is required..."],
  },
});

const Slider = new mongoose.model("Slider", SliderSchmea);

module.exports = Slider;
