const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

const getProducts = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice, sort = 'createdAt', order = 'desc' } = req.query;
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const filter = {};

  if (category) filter.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
  if (search) filter.$or = ['name', 'sku', 'category', 'supplier'].map((field) => ({ [field]: { $regex: escapeRegex(search), $options: 'i' } }));
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    if (Object.values(filter.price).some(Number.isNaN)) return res.status(400).json({ success: false, message: 'minPrice and maxPrice must be numbers' });
  }
  const allowedSort = ['name', 'price', 'quantity', 'category', 'createdAt', 'updatedAt'];
  const sortField = allowedSort.includes(sort) ? sort : 'createdAt';
  const sortOrder = order.toLowerCase() === 'asc' ? 1 : -1;
  const [products, total] = await Promise.all([
    Product.find(filter).sort({ [sortField]: sortOrder }).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter)
  ]);
  res.json({ success: true, total, page, totalPages: Math.ceil(total / limit), count: products.length, products });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, omitUndefined: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted', id: product._id });
});

const adjustStock = asyncHandler(async (req, res) => {
  const change = Number(req.body.change);
  if (!Number.isInteger(change) || change === 0) return res.status(400).json({ success: false, message: 'change must be a non-zero whole number (positive to restock, negative for a sale)' });
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, ...(change < 0 ? { quantity: { $gte: Math.abs(change) } } : {}) },
    { $inc: { quantity: change } },
    { new: true, runValidators: true }
  );
  if (!product) {
    const exists = await Product.exists({ _id: req.params.id });
    return res.status(exists ? 400 : 404).json({ success: false, message: exists ? 'Insufficient stock for this sale' : 'Product not found' });
  }
  res.json({ success: true, message: 'Stock updated', product });
});

const lowStockReport = asyncHandler(async (req, res) => {
  const lowStockItems = await Product.find({ $expr: { $lte: ['$quantity', '$reorderLevel'] } }).sort({ quantity: 1 });
  res.json({ success: true, count: lowStockItems.length, lowStockItems });
});

const categorySummary = asyncHandler(async (req, res) => {
  const summary = await Product.aggregate([
    { $group: { _id: '$category', totalItems: { $sum: 1 }, totalQuantity: { $sum: '$quantity' }, totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } }, avgPrice: { $avg: '$price' } } },
    { $sort: { _id: 1 } }
  ]);
  res.json({ success: true, categories: summary.length, summary });
});

function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct, adjustStock, lowStockReport, categorySummary };
