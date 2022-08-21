const mongoose = require("mongoose");

const FoodCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "food category name is required..."],
  },
  categoryTitle: {
    type: String,
    required: [true, "food category title is required..."],
  },
  categoryDescription: {
    type: String,
    required: [true, "food category description is required..."],
  },
  Parent: {
    type: mongoose.Types.ObjectId,
    ref: "FoodCategory",
  },
});

const FoodCategory = new mongoose.model("FoodCategory", FoodCategorySchema);

module.exports = FoodCategory;
