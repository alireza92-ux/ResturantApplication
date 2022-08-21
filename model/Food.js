const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  foodTitle: {
    type: String,
    required: [true, "food title is required..."],
  },
  foodDescription: {
    type: String,
    required: [true, "food description is required..."],
  },
  price: {
    type: Number,
    required: [true, "food price is required..."],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "FoodCategory",
    required: [true, "food category is required..."],
  },
});

const Food = new mongoose.model("Food", FoodSchema);

module.exports = Food;
