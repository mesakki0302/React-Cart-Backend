// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: Number,
  description: String,
  category: String,
  image: { type: String, required: true },
  rating: {
    rate: Number,
    count: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);