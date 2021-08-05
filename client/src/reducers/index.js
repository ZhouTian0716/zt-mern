import { combineReducers } from 'redux';


// Add similar if needed later 
import posts from './posts';

// key value pairs
export const reducers = combineReducers({ 
    posts: posts,
});