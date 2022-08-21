const mongoose = require("mongoose");

const FoodImageSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Types.ObjectId,
    ref: "Food",
    required: [true, "food is required..."],
  },
  image: {
    type: String,
    required: [true, "food image is required..."],
  },
});

const FoodImage = new mongoose.model("FoodImage", FoodImageSchema);

module.exports = FoodImage;
