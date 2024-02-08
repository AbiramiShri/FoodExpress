import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import expressAsyncHandler from 'express-async-handler';
import {genrateToken} from '../util.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createUser = await User.insertMany(data.users);
    res.send({createUser});
  })
);

// POST request for signing in users
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        mobNo: user?.mobNo,
        token: genrateToken(user),
      });
    } else {
      res.status(401).send({message: 'Invalid Email or Password'});
    }
  })
);

// POST route for signing up users
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    console.log(req, 'signup req');
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      res.status(400).send({message: 'User already exists'});
    } else {
      const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genrateToken(user),
      });
    }
  })
);

export default userRouter;
