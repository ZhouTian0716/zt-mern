import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';

import FileBase from 'react-file-base64';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();


    const post = useSelector((state) => currentId ? state.posts.find( (p) => p._id === currentId ) : null);

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '' 
    });

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
        if (inputType === 'creator') {
            setPostData({ ...postData, creator: inputValue });
        } else if (inputType === 'title') {
            setPostData({ ...postData, title: inputValue });
        } else if (inputType === 'message') {
            setPostData({ ...postData, message: inputValue });
        } else if (inputType === 'tags') {
            setPostData({ ...postData, tags: inputValue.split(/[，,]+/) });
        } 
    };

    const handleSubmit =  (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    };

    const clear =  () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '' 
        })
    };
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={handleInputChange}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth  multiline rows={4}
                    value={postData.message}
                    onChange={handleInputChange}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (coma separated)"
                    fullWidth
                    value={postData.tags}
                    onChange={handleInputChange}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file" multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;