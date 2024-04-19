// Importing necessary modules and files
const express = require('express'); // Importing Express framework
const User = require('../models/user.js'); // Importing User model

const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const expressAsyncHandler = require('express-async-handler'); // Middleware to handle asynchronous functions
const util = require('../util.js'); // Importing utility function to generate token
const genrateToken = util.genrateToken;
const isAuth = util.isAuth;
const Address = require('../models/address.js');

// Creating a router instance
const userRouter = express.Router();

// Route to seed initial data for users
userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // Inserting initial user data into the database
    const createUser = await User.insertMany(data.users); // Assuming 'data.users' is defined elsewhere
    res.send({createUser}); // Sending response
  })
);

// POST request for signing in users
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body; // Extracting email and password from request body
    // Finding user by email in the database
    const user = await User.findOne({email});
    // Checking if user exists and password matches
    if (user && bcrypt.compareSync(password, user.password)) {
      // Sending user data along with a token
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        mobNo: user?.mobNo,
        token: genrateToken(user), // Generating token for authentication
      });
    } else {
      // If user does not exist or password is incorrect, sending error message
      res.status(401).send({message: 'Invalid Email or Password'});
    }
  })
);

// POST route for signing up users
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const {name, email, password} = req.body; // Extracting user details from request body
    // Checking if user with the given email already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      // If user already exists, sending error message
      res.status(400).send({message: 'User already exists'});
    } else {
      // If user does not exist, creating a new user with hashed password
      const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10), // Hashing the password before saving
      });
      // Saving the new user to the database
      const user = await newUser.save();
      // Sending user data along with a token
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: true,
        token: genrateToken(user), // Generating token for authentication
      });
    }
  })
);

//post route for adding address

userRouter.get(
  '/shipping/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const address = await Address.find({userId: id});
    res.send(address);
  })
);

userRouter.delete(
  '/address/:id',
  expressAsyncHandler(async (req, res) => {
    await Address.deleteOne({_id: req.params.id});
    res.send({id: req.params.id});
  })
);
userRouter.put(
  '/address/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address) {
      address.name = req.body.name;
      address.mobNo = req.body.mobNo;
      address.pinCode = req.body.pinCode;
      address.address = req.body.address;
      address.town = req.body.town;
      address.state = req.body.state;
      address.city = req.body.city;
      const newAddress = await address.save();
      res.send(newAddress);
    } else {
      res.status(404).send({message: 'Address not found !'});
    }
  })
);

userRouter.post(
  '/address',
  expressAsyncHandler(async (req, res) => {
    const newAdress = Address({
      name: req.body.name,
      mobNo: req.body.mobNo,
      pinCode: req.body.pinCode,
      address: req.body.address,
      town: req.body.town,
      state: req.body.state,
      city: req.body.city,
      userId: req.body.userId,
    });
    const address = await newAdress.save();
    res.send(address);
  })
);

userRouter.put(
  '/updateProfile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name;
      user.mobNo = req.body.mobNo;
      const updatedUser = await user.save();
      res.send({
        _id: user._id,
        name: updatedUser.name,
        eamil: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        mobNo: updatedUser.mobNo,
        token: genrateToken(updatedUser),
      });
    } else {
      res.status(404).send({message: 'User not found'});
    }
  })
);

module.exports = userRouter;
