const express = require("express");
const { getUsers, userSignIn, userSignUp } = require('../controllers/users.js');
const router = express.Router();

// When someone visit localhost:5000/users
router.get('/', getUsers );
router.post('/signin', userSignIn );
router.post('/signup', userSignUp );

module.exports = router;