const HttpError = require("../model/http-error");
const {validationResult} = require('express-validator');
const Meals = require("../model/Meals");


// Creating a Meal

const createMeal = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
  
    const {
      mealID,
      name,
      description,
      image,
      category,
      affordability,
      complexity,
      steps,
      ingredients,
    } = req.body;

    const createMeal = new Meals({
      mealID,
      name,
      description,
      image,
      category,
      affordability,
      complexity,
      steps,
      ingredients,
    });

    try{
        await createMeal.save();
    }
    catch(err){
        const error = new HttpError(
            'Creating Category failed, please try again',
            500
        );
        return next(error);
    }

    return res.status(201).json({meal: createMeal});
}

// Getting Meals by ID
const getMealById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    let meal;
    const mealId = req.params.mealID;
    try{
        meal = await Meals.findById(mealId);
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!meal){
        const error =  new HttpError('Could not find a Meal for the provided id.', 404);
        return next(error);
    }

    res.json({meal: meal.toObject({getters: true})});
}



// Getting Meals by ID
const getMealByMealID = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    let meal;
    const mealID = req.params.mealID;
    try{
        meal = await Meals.findOne({ mealID: mealID });
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!meal){
        const error =  new HttpError('Could not find a Meal for the provided id.', 404);
        return next(error);
    }

    res.status(200).json({meal: meal.toObject({getters: true})});
}


// Getting Meals By MealsName

const getMealByName = async (req, res, next) => {
    const mealsName = req.params.mealsName;

    let meal;

     try{
      meal = await Meals.findOne({name: mealsName});
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!meal){
        const error =  new HttpError('Could not find a Meal for the provided Name.', 404);
        return next(error);
    }

    res.json({meal: meal.toObject({getters: true})});
}



// Getting Category By categoryName

const getAllMeals = async (req, res, next) => {
    let meal;
    
     try{
      meal = await Meals.find();
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!meal){
        const error =  new HttpError('Could not find a Meal for the provided Name.', 404);
        return next(error);
    }

    res.json({meal: meal});
}



// Getting Category By categoryName

const getMealByCategoryName = async (req, res, next) => {
    const categoryName = req.params.categoryName;

    let meal;
    
     try{
      meal = await Meals.find({category: {$all: [categoryName]}});
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong , could not fetch a id', 500
        );
        return next(error);
    }

    if(!meal){
        const error =  new HttpError('Could not find a Meal for the provided Name.', 404);
        return next(error);
    }

    res.json({meal: meal});
}



// Updating a Category
const updateMeal = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError(
        "Invalid inputs passed, please check your data.",
        422
      );
    }

    const {
      name,
      description,
      image,
      category,
      affordability,
      complexity,
      steps,
      ingredients
    } = req.body; 

    const mealId = req.params.mealID;

    let meal;
    try {
        meal = await Meals.findById(mealId);
    } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update Meal.',
      500
    );
    return next(error);
  }

    meal.name = name;
    meal.description=description;
    meal.image = image;
    meal.category = category;
    meal.affordability = affordability;
    meal.complexity = complexity;
    meal.steps = steps;
    meal.ingredients = ingredients;
  try {
    await meal.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update Meal.',
      500
    );
    return next(error);
  }

  res.status(200).json({ meal: meal.toObject({ getters: true }) });
}


// Deleting a Category

const deleteMeal = async(req, res, next) => {
  const mealId = req.params.mealID;

  let meal;
  try {
    meal = await Meals.findById(mealId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Meal.',
      500
    );
    return next(error);
  }

   try {
    await meal.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Meal.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted Category.' });
}


// Deleting a Category

const deleteMealByName = async(req, res, next) => {
  const name = req.params.mealName;
  let meal;
  try {
    meal = await Meals.findOne({name: name});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete meal.',
      500
    );
    return next(error);
  }

   try {
    await meal.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete meal.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Meal Deleted.' });
}





exports.getMealById = getMealById;
exports.getMealByMealID = getMealByMealID;
exports.getAllMeals = getAllMeals;
exports.getMealByName = getMealByName;
exports.getMealByCategoryName = getMealByCategoryName;
exports.createMeal = createMeal;
exports.updateMeal = updateMeal;
exports.deleteMeal = deleteMeal;
exports.deleteMealByName = deleteMealByName;
