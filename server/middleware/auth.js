// Middle ware is for permission for user actions
require("dotenv").config();
const jwt = require('jsonwebtoken');


const secret = process.env.USER_AUTH_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Google token length longer than 500, isCustomAuth here is our own token
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {  
      // Auth with Us
      decodedData = jwt.verify(token, secret);
      // IMPORTANT: THIS req.userId goes to controllers' req
      req.userId = decodedData?.id;
    } else {
      // Auth with Google
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }    
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
