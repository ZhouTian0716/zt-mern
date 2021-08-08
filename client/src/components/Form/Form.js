import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import FileBase from 'react-file-base64';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    // This is about auto complete form with selected post for update
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('zt-mern-user'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
        if (inputType === 'title') {
            setPostData({ ...postData, title: inputValue });
        } else if (inputType === 'message') {
            setPostData({ ...postData, message: inputValue });
        } else if (inputType === 'tags') {
            setPostData({ ...postData, tags: inputValue.split(/[，,]+/) });
        } 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name } ));
        } else {
            dispatch(createPost( {...postData, name: user?.result?.name} ));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };
    
    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own Music Note and like other's Notes.
            </Typography>
          </Paper>
        );
    }


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Edit' : 'New' } Note</Typography>
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