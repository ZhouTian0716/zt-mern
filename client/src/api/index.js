import axios from 'axios';

// In Production State
const url = 'https://zt-mern.herokuapp.com';
// In Development State
// const url = 'http://localhost:5000';

const API = axios.create({ baseURL: url });


// IMPORTANT BLOCK TO ONLY ALLOW LOGIN USER TO ACCESS CRUD ACTIONS
API.interceptors.request.use((req) => {
    if (localStorage.getItem('zt-mern-user')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('zt-mern-user')).token}`;
    }
    return req;
});



// The way for Redux dispatch
// Here are collections of client requests
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formAuth) => API.post('/users/signin', formAuth);
export const signUp = (formAuth) => API.post('/users/signup', formAuth);