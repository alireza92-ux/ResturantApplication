const FoodCategory = require("../model/FoodCategory");
const Food = require("../model/Food");
const Slider = require("../model/Slider");
const Discount = require("../model/Discount");
const FoodImage = require("../model/FoodImage");

exports.getFoodCategories = async (req, res, next) => {
  try {
    let filter = {};

    if (req.query.parent) {
      filter = { Parent: req.query.parent };
    }

    const foodCategories = await FoodCategory.find(filter);

    res.status(200).json({ foodCategories });
  } catch (err) {
    next(err);
  }
};

exports.getAllFoods = async (req, res, next) => {
  try {
    let filter = {};

    if (req.query.category) {
      filter = { category: req.query.category };
    }

    const foods = await Food.find(filter);

    let foodList = [];
    for (let food of foods) {
      const tmpFood = food.toObject();
      const discount = await Discount.findOne({ foodId: food._id });
      const foodImage = await FoodImage.findOne({ foodId: food._id });

      if (discount)
        tmpFood.discountedPrice = (discount.percent * food.price) / 100;

      if (foodImage) tmpFood.foodImage = foodImage.image;
      else tmpFood.foodImage = null;

      foodList.push(tmpFood);
    }

    res.status(200).json({ foods: foodList });
  } catch (err) {
    next(err);
  }
};

exports.getSliderImages = async (req, res, next) => {
  try {
    const sliderImages = await Slider.find();

    res.status(200).json({ sliderImages });
  } catch (err) {
    next();
  }
};

exports.getFoodDetails = async (req, res, next) => {
  try {
    let foodDetails = {};

    const food = await Food.findOne({ _id: req.params.id });

    if (!food) {
      const error = new Error("cannot find any food...");
      error.statusCode = 404;
      throw error;
    }

    foodDetails = { ...food.toObject() };

    const discount = await Discount.findOne({ foodId: food._id });
    const foodImages = await FoodImage.find({ foodId: food._id });

    if (discount)
      foodDetails.discountedPrice = (discount.percent * food.price) / 100;

    foodDetails.fooodImages = foodImages;

    res.status(200).json({ ...foodDetails });
  } catch (err) {
    next(err);
  }
};
