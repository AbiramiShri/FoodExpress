// Importing necessary modules and files
import express from 'express'; // Importing Express framework
import User from '../models/user.js'; // Importing User model
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing
import expressAsyncHandler from 'express-async-handler'; // Middleware to handle asynchronous functions
import {genrateToken} from '../util.js'; // Importing utility function to generate token

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
    console.log(req, 'signup req'); // Logging signup request
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
        isAdmin: user.isAdmin,
        token: genrateToken(user), // Generating token for authentication
      });
    }
  })
);

// Exporting the userRouter for use in other files
export default userRouter;
