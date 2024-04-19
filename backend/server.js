const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter.js');
const productRouter = require('./routes/productRouter.js');
const orderRouter = require('./routes/orderRoute.js');

dotenv.config();

const app = express();

// Custom CORS middleware
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'http://foodexpress.altervista.org'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware to parse incoming requests with JSON payloads
app.use(express.json({limit: '30mb', extended: true}));

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({limit: '30mb', extended: true}));

app.get('/', (req, res) => {
  console.log('Welcome to FoodExpress Backend!');
  res.send('Welcome to FoodExpress Backend!');
});

// MongoDB connection URI
const uri =
  'mongodb+srv://shriabishri:MyFamily1915@abishri.5x4yote.mongodb.net/FoodExpress?retryWrites=true&w=majority';

// Connecting to MongoDB database
mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Food express DB...');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Mounting routers
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({message: 'Something went wrong!'});
});

const PORT = process.env.PORT || 1307;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
