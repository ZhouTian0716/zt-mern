import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import Input from './Input';
import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    // login or sign up form data state
    const [formAuth, setFormAuth] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const [isSignup, setIsSignup] = useState(false);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };


    // A CLEAN WAY TO COLLECT INPUT VALUES
    const handleChange = (e) => setFormAuth({ ...formAuth, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( isSignup ) {
            // history here is for navigation later
            dispatch(signup(formAuth, history));
        } else {
            dispatch(signin(formAuth, history));
        }
    };


    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            // This brings back to home page after a successful login
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    
    const googleError = (err) => {
        console.log(err);
        console.log('Google Sign In was unsuccessful. Try again later'); 
    }



    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>


                    {/* GoogleLogin Feature */}
                    <GoogleLogin
                        clientId="409077651076-qvfcrch5u98648ktn6k43m24266a5j4n.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton} color="primary" fullWidth
                                onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}
                                variant="contained"
                            >
                                Sign with Gmail
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    {/* GoogleLogin Feature */}


                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>  
                </form>
            </Paper>
        </Container>   
    )
}

export default Auth
