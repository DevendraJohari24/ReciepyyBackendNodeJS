const express = require("express");
const { check } = require("express-validator");

const mealsController = require("../controllers/meals-controller");

const router = express.Router();

router.get("/", mealsController.getAllMeals);


router.get("/:mealID", mealsController.getMealById);


router.get("/mealId/:mealID", mealsController.getMealByMealID);

router.get("/mealsName/:mealsName", mealsController.getMealByName);

router.get("/categoryBelong/:categoryName", mealsController.getMealByCategoryName);

router.post(
  "/",
  [
    check("mealID").not().isEmpty(),
    check("name").not().isEmpty(),
    check("image").not().isEmpty(),
    check("description").isLength({min: 5}),
    check("category").not().isEmpty(),
    check("steps").not().isEmpty(),
    check("complexity").not().isEmpty(),
    check("affordability").not().isEmpty(),
    check("ingredients").not().isEmpty(),
  ],
  mealsController.createMeal
);

router.patch(
  "/:mealID",
  [
    check("name").not().isEmpty(),
    check("image").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("category").not().isEmpty(),
    check("steps").not().isEmpty(),
    check("complexity").not().isEmpty(),
    check("affordability").not().isEmpty(),
    check("ingredients").not().isEmpty(),
  ],
  mealsController.updateMeal
);

router.delete("/:mealID", mealsController.deleteMeal);
router.delete("/mealName/:mealName", mealsController.deleteMealByName);

module.exports = router;
