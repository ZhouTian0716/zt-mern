const express = require("express");
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts.js');
const auth = require("../middleware/auth.js");
const router = express.Router();

// When someone visit localhost:5000
router.get('/', getPosts );
router.post('/', auth, createPost );
router.patch('/:id', auth, updatePost );
router.patch('/:id/likePost', auth, likePost );
router.delete('/:id', auth, deletePost );



module.exports = router;