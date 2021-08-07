const express = require("express");
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts.js');
const router = express.Router();

// When someone visit localhost:5000
router.get('/', getPosts );
router.post('/', createPost );
router.patch('/:id', updatePost );
router.patch('/:id/likePost', likePost );
router.delete('/:id', deletePost );



module.exports = router;