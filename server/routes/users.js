const express = require("express");
const { userSignIn, userSignUp } = require('../controllers/users.js');
const router = express.Router();

// When someone visit localhost:5000/users
router.post('/signin', userSignIn );
router.post('/signup', userSignUp );

module.exports = router;