const Categories = require("../model/Categories");
const HttpError = require("../model/http-error");
const {validationResult} = require('express-validator');


// Creating a Category

const createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
  
    const { catID, name, description, image } =
      req.body;

    const createCategory = new Categories({
      catID,
      name,
      description,
      image
    });

    try{
      console.log(createCategory);
        await createCategory.save();
    }
    catch(err){
        const error = new HttpError(
            'Creating Category failed, please try again',
            500
        );
        return next(error);
    }

    return res.status(201).json({category: createCategory});
}


// Get all the categories


// Getting category by ID

const getAllCategories = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    let category;
    try{
         category = await Categories.find();
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!category){
        const error =  new HttpError('Could not find a place for the provided id.', 404);
        return next(error);
    }

    res.json({category: category});
}






// Getting category by ID

const getCategoryById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const catID = req.params.catID;
    let category;
    try{
         category = await Categories.findById(catID);
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!category){
        const error =  new HttpError('Could not find a place for the provided id.', 404);
        return next(error);
    }

    res.json({category: category.toObject({getters: true})});
}






// get Category By Category ID
const getCategoryByCatID = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const categoryID = req.params.categoryID;
  let category;
  try {
    category = await Categories.findOne({ catID: categoryID });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong , could not fetch a id",
      500
    );
    return next(error);
  }

  if (!category) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ category: category.toObject({ getters: true }) });
};






// Getting Category By categoryName

const getCategoryByName = async (req, res, next) => {
      const categoryName = req.params.categoryName;

      let category;

     try{
         category = await Categories.findOne({name: categoryName});
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!category){
        const error =  new HttpError('Could not find a place for the provided id.', 404);
        return next(error);
    }

    res.json({category: category.toObject({getters: true})});
}




// Updating a Category
const updateCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError(
        "Invalid inputs passed, please check your data.",
        422
      );
    }

    const { name, description, image } =
        req.body; 

    const catId = req.params.catID;

    let category;
    try {
        category = await Categories.findById(catId);
    } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update Category.',
      500
    );
    return next(error);
  }

  category.name = categoryName;
  category.image = categoryImage;
  category.description = categoryDescription;

  try {
    await category.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update Category.',
      500
    );
    return next(error);
  }

  res.status(200).json({ category: category.toObject({ getters: true }) });
}


// Deleting a Category

const deleteCategory = async(req, res, next) => {
  const catId = req.params.catID;

  let category;
  try {
    category = await Categories.findById(catId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Category.',
      500
    );
    return next(error);
  }

   try {
    await category.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Category.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted Category.' });
}


// Deleting a Category

const deleteCategoryByName = async(req, res, next) => {
  const name = req.params.categoryName;

  console.log(name);
  let category;
  try {
    category = await Categories.findOne({name: name});
    console.log(category);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Category.',
      500
    );
    return next(error);
  }

   try {
    await category.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Category.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted Category.' });
}




exports.getCategoryById = getCategoryById;
exports.getCategoryByName = getCategoryByName;
exports.getCategoryByCatID = getCategoryByCatID;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
exports.getAllCategories = getAllCategories;
exports.deleteCategoryByName = deleteCategoryByName;
