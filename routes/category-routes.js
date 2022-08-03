const express = require("express");
const { check } = require("express-validator");

const categoryController = require("../controllers/categories-controller");

const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.get("/:catID", categoryController.getCategoryById);

router.get("/categoryID/:categoryID", categoryController.getCategoryByCatID);


router.get("/categoryName/:categoryName", categoryController.getCategoryByName);

router.post(
  "/",
  [
    check("catID").not().isEmpty(),
    check("name").not().isEmpty(),
    check("image").not().isEmpty(),
    check("description").isLength({ min: 5}),
  ],
  categoryController.createCategory
);

router.patch(
  "/:catID",
  [
    check("name").not().isEmpty(),
    check("image").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  categoryController.updateCategory
);

router.delete("/:catID", categoryController.deleteCategory);
router.delete("/categoryName/:categoryName", categoryController.deleteCategoryByName);


module.exports = router;
