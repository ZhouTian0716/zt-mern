import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js'
const router = express.Router();

// When someone visit localhost:5000
router.get('/', getPosts );
router.post('/', createPost );


export default router;