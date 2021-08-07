import { combineReducers } from 'redux';


// Add similar if needed later 
import postsReducer from './posts';
import authReducer from './auth';

// key value pairs
export const reducers = combineReducers({ 
    posts: postsReducer,
    auth: authReducer
});