const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/order.js');
const util = require('../util.js');
const isAuth = util.isAuth;

const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({userId: req.user._id});
    res.send(orders);
  })
);

orderRouter.get(
  '/admin-orders',
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().sort({_id: -1}).limit(20);
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({message: 'cart is empty!'});
    } else {
      const newOrder = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        totalprice: req.body.totalprice,
        shippingPrice: req.body.shippingPrice,
        paymentId: req.body.paymentId,
        userId: req.user._id,
        email: req.body.email,
        userName: req.body.userName,
      });

      const order = await newOrder.save();

      //   let testAccount = await nodemailer.createTestAccount();
      // res.send(order);

      res.status(201).send({message: 'Order Placed !', order: order});
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    const order = await Order.findById(id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({message: 'Order Not Found'});
    }
  })
);

module.exports = orderRouter;
