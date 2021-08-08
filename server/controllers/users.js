const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require('../models/user.js');

const secret = process.env.USER_AUTH_SECRET;
const expiration = '1h';

module.exports = {

    async userSignIn (req, res) {
        // front end info in req.body, save those info by destructuring them
        const { email, password } = req.body;
        try {
            // Step 1: Compare Credentials
            const existingUser = await User.findOne({ email });
            if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
            const isMatch = await bcrypt.compare( password, existingUser.password );
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
            // Step 2: Pass token
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: expiration });
            res.status(200).json({ result: existingUser, token });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    async userSignUp (req, res) {
        const { email, password, confirmPassword, firstName, lastName } = req.body;
        try {
            // Step 1: Compare Credentials
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: "User already exists" });
            if (password !== confirmPassword) return res.status(400).json({ message: "Check your re-enter password" });
            // Step 2: Generating new User in database
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
            // Step 3: Pass token
            const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: expiration } );
            res.status(200).json({ result, token });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong" });
            console.log(error);
        }
    },
}