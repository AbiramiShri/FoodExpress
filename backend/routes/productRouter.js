const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data.js');
const Product = require('../models/products.js');
const Wishlist = require('../models/wishlist.js');
const util = require('../util.js');
const isAuth = util.isAuth;

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({category: req.query.category}); //return all products
    res.send(products);
  })
);

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    let regEx = new RegExp(req.query.name, 'i');
    const serachedProducts = await Product.find({name: regEx});
    if (serachedProducts) {
      res.send(serachedProducts);
    } else {
      res.status(402).send({message: 'Opps No product found!!'});
    }
  })
);

productRouter.post(
  '/wishlist',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const item = await Wishlist.findOne({product: req.body._id});
    if (item) {
      res.status(409).send({message: 'Item Already exits'});
    } else {
      const newItem = new Wishlist({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        userId: req.user._id,
        product: req.body._id,
      });
      const wishlistItem = await newItem.save();
      res.send(wishlistItem);
    }
  })
);

productRouter.post(
  '/add-product',
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      ingredients: res.body.ingredients,
      specialInstruction: res.body.specialInstruction,
    });
    const products = await newProduct.save();

    res.send(products);
  })
);

productRouter.get(
  '/wishlist',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const items = await Wishlist.find({userId: req.user._id});
    res.send(items);
  })
);
productRouter.delete(
  '/wishlist/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const items = await Wishlist.deleteOne({productId: req.params.id});
    res.send(req.params.id);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createProducts = await Product.insertMany(data.products);
    res.send({products: createProducts});
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product); // Send the product as JSON response
    } else {
      res.status(404).json({message: 'Product not found'}); // Product not found
    }
  })
);

productRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      await product.remove();
      res.send({message: 'Product deleted successfully'});
    } else {
      res.status(404).send({message: 'Product not found!'});
    }
  })
);

productRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.image = req.body.image || product.image;
      product.category = req.body.category || product.category;
      product.price = req.body.price || product.price;
      product.specialInstruction =
        req.body.specialInstruction || product.specialInstruction;
      product.ingredients = req.body.ingredients || product.ingredients;

      const updatedProduct = await product.save();

      res.send(updatedProduct);
    } else {
      res.status(404).send({message: 'Product not found!'});
    }
  })
);

module.exports = productRouter;
