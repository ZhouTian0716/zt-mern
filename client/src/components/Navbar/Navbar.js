import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../constants/actionTypes';

import useStyles from './styles';
import logo from '../../images/app.jpg';

// SPOTIFY CONSTANTS
const redirectUri = 'http://localhost:3000';
const clientId = 'a64546f1c27541cca025fc19bce260c3';
const AUTH_URL =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`





const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('zt-mern-user')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type:LOGOUT });
        history.push('/');
        setUser(null);
    };


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        // this gives the refresh that we need
        setUser(JSON.parse(localStorage.getItem('zt-mern-user')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <a className="MuiButton-root MuiButton-containedPrimary" href={AUTH_URL}>Spotify</a>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">M-NOTEs</Typography>
                <img className={classes.image} src={logo} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar> 
        </AppBar>
    )
}

export default Navbar

