
const mongoose = require('mongoose');

const PostMessage = require('../models/postMessage.js');


module.exports = {

    async getPosts (req, res) {
        try {
            const postMessages = await PostMessage.find();    
            res.status(200).json( postMessages );
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async createPost (req, res) {
        const post = req.body;

        // IMPORTANT LINE TO ONLY ALLOW LOGIN USER TO ACCESS CRUD ACTIONS
        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
        
        try {
            await newPost.save();
            res.status(201).json( newPost );
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    },

    async updatePost (req, res) {
        // Get id from route :id, and we need to rename it for mongoose _id format
        const { id: _id } = req.params;
        const post = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

        res.json(updatedPost);
    },

    async deletePost (req, res) {
        // Get id from route :id, and we need to rename it for mongoose _id format
        const { id } = req.params;


        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        await PostMessage.findByIdAndRemove(id);

        res.json({ message: 'Post deleted successfully' });
    },

    async likePost (req, res) {
        const { id } = req.params;
        // IMPORTANT: req.userId CAME FROM MIDDLEWARE
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const post = await PostMessage.findById(id);

        // NOTE: This is telling which user likes which post
        const index = post.likes.findIndex((id) => id ===String(req.userId));

        if (index === -1) {
            // Add like
            post.likes.push(req.userId);
        } else {
            // Cancel like
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    },
}
