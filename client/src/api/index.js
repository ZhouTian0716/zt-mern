import axios from 'axios';

// request to backend routes
const url = 'http://localhost:5000/posts';

// In this way for Redux dispatch
// Here are collections of client requests
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);