// Importing necessary modules and files
import express from 'express'; // Importing Express framework
import cors from 'cors'; // Importing CORS middleware for cross-origin requests
import mongoose from 'mongoose'; // Importing mongoose for MongoDB connection
import dotenv from 'dotenv'; // Importing dotenv for environment variables
import userRouter from './routes/userRouter.js'; // Importing userRouter from custom route file

dotenv.config(); // Loading environment variables from .env file

// Creating an instance of Express application
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json({limit: '30mb', extended: true}));
// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({limit: '30mb', extended: true}));

// Defining the port number for the server
const PORT = process.env.PORT || 1307;

// MongoDB connection URI
const uri =
  'mongodb+srv://shriabishri:MyFamily1915@abishri.5x4yote.mongodb.net/FoodExpress?retryWrites=true&w=majority';

// Connecting to MongoDB database
mongoose.connect(uri, (err) => {
  if (err) throw err; // If error occurs during connection, throw error
  console.log('Connected to Food express DB...'); // Log success message if connected
});

// Middleware to enable CORS
app.use(cors());

// Mounting userRouter for handling user-related routes
app.use('/api/users', userRouter);

// Error handling middleware to handle server errors
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message}); // Sending error message with status code 500
});

// Starting the server and listening on the defined port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Logging server start message
});
