const jwt = require('jsonwebtoken'); // Importing JSON Web Token (JWT) module

// Function to generate JWT token
const genrateToken = function (user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    // Secret key used for signing the token
    '73fd13885dfb14f1e2cbef94d9d696797d41943fdb98183a0a4e9e75ae1dc84a',
    {
      // Expiry time for the token
      expiresIn: '30d',
    }
  );
};

// Middleware function to authenticate user
const isAuth = function (req, res, next) {
  // Extracting authorization header from the request
  const authorization = req.headers.authorization;

  if (authorization) {
    // Extracting token from the authorization header
    const token = authorization.slice(7, authorization.length); // Removing 'Bearer ' prefix
    // Verifying the token
    jwt.verify(
      token,
      // Secret key used for signing the token
      '73fd13885dfb14f1e2cbef94d9d696797d41943fdb98183a0a4e9e75ae1dc84a',
      (err, decode) => {
        if (err) {
          // If token verification fails, sending unauthorized status with error message
          res.status(401).send({message: err.message});
        } else {
          // If token is verified, attaching decoded user information to the request object
          req.user = decode;
          next(); // Proceeding to the next middleware
        }
      }
    );
  } else {
    // If no authorization header is found, sending unauthorized status with error message
    res.status(401).send({message: 'No token'});
  }
};

// Exporting both functions
module.exports = {
  genrateToken: genrateToken,
  isAuth: isAuth,
};
