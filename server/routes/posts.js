import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts.js'
const router = express.Router();

// When someone visit localhost:5000
router.get('/', getPosts );
router.post('/', createPost );
router.patch('/:id', updatePost );


export default router;