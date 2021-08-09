import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './images/app.jpg';

import useStyles from './styles';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import SearchBar from './components/01-SearchBar/SearchBar.jsx';
import SearchResults from './components/02-DisplayContainer/SearchResults.jsx';
import Player from './components/03-Player/CustomPlayer.jsx';
import useAuth from './utils/useAuth.js';
import SpotifyWebApi from "spotify-web-api-node"
const code = new URLSearchParams(window.location.search).get("code");

const spotifyApi = new SpotifyWebApi({
    clientId: "a64546f1c27541cca025fc19bce260c3",
})


// SPOTIFY CONSTANTS
const redirectUri = 'https://zt-mern.herokuapp.com';
const clientId = 'a64546f1c27541cca025fc19bce260c3';
const AUTH_URL =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`




const App = () => {
    const classes = useStyles();

    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    // console.log(accessToken);

    function chooseTrack(track) {
        setPlayingTrack(track)
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])


    useEffect(() => {
        if (!accessToken) return
        spotifyApi.getMe().then(function(data) {
          console.log('Some information about the authenticated user', data.body);
        }, function(err) {
        console.log('Something went wrong!', err);
        });
      }, [accessToken])

    //Search Functionality
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
    
        return () => (cancel = true)
    }, [search, accessToken])

    return (
        <div className={classes.appContainer}>
          <div className={classes.headingBar}>
            <span className="homeName">Music Board</span>
            <img className={classes.logo} src={logo} alt="logo" />
            <a className="MuiButton-root MuiButton-containedPrimary" href={AUTH_URL}>Spotify</a>
          </div>

          <div className={classes.musicBox}>
            <SearchBar accessToken={accessToken} search={search} setSearch={setSearch}/>
            <SearchResults accessToken={accessToken} searchResults={searchResults} setSearchResults={setSearchResults} chooseTrack={chooseTrack}/>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
          </div>
          
          <BrowserRouter>
              <Container maxWidth="lg">
                  <Navbar />
                  <Switch >
                      <Route path="/" exact component={Home} />
                      <Route path="/auth" exact component={Auth} />
                  </Switch>
              </Container>
          </BrowserRouter>
        </div>  
    )
}

export default App;


