const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require("../middleware/authMiddleware");

/* ================= CREATE ================= */
router.post('/products', auth, async (req, res) => {
  try {
    const{title,price,description,category,image} = req.body
    const product = await Product.create({title,price,description,category,image});
    await product.save
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= READ ================= */

// GET ALL
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET BY ID
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// GET BY CATEGORY
router.get('/products/category/:cat', async (req, res) => {
  const products = await Product.find({ category: req.params.cat });
  res.json(products);
});

/* ================= UPDATE ================= */
router.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ================= DELETE ================= */
router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
