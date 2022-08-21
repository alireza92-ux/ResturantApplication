const express = require("express");

const indexController = require("../controllers/indexController");

const router = new express.Router();

router.get("/foodCategory", indexController.getFoodCategories);

router.get("/food", indexController.getAllFoods);

router.get("/food/:id", indexController.getFoodDetails);

router.get("/slider", indexController.getSliderImages);

module.exports = router;
