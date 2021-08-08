const express = require("express");
const {  spotifyRefresh, spotifyLogin  } = require('../controllers/spotify.js');
const router = express.Router();

// When someone visit localhost:5000/spotify
router.post('/refresh', spotifyRefresh );
router.post('/login', spotifyLogin );

module.exports = router;