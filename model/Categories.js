const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema({
  catID: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
