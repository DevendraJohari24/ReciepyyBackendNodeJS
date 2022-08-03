const mongoose = require('mongoose')
const MealsSchema = new mongoose.Schema({
  mealID: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  complexity: { type: String, required: true },
  affordability: { type: String, required: true },
  category: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  ingredients: [{ type: String, required: true }],
});


const Meals = mongoose.model('Meals', MealsSchema)

module.exports = Meals;