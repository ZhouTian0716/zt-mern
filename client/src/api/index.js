import axios from 'axios';

// request to backend routes
const url = 'http://localhost:5000/posts';

// In this way for Redux dispatch
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);