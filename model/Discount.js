const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Types.ObjectId,
    ref: "Food",
    required: [true, "food is required..."],
  },
  percent: {
    type: Number,
    required: [true, "discount percent is required..."],
    max: 100,
  },
  endDate: {
    type: Date,
    required: [true, "end date is required..."],
  },
});

const Discount = new mongoose.model("Discount", DiscountSchema);

module.exports = Discount;
