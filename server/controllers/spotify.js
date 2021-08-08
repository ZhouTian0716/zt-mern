require('dotenv').config();
const SpotifyWebApi = require("spotify-web-api-node");








module.exports = {

    spotifyLogin (req, res) {
        const code = req.body.code
        const spotifyApi = new SpotifyWebApi({
        //   redirectUri: process.env.REDIRECT_URI,
        //   clientId: process.env.CLIENT_ID,
        //   clientSecret: process.env.CLIENT_SECRET,
          redirectUri: 'http://localhost:3000',
          clientId: 'a64546f1c27541cca025fc19bce260c3',
          clientSecret: '9ee61cb3be0744b2866014d64a420c7e',
        })
      
        spotifyApi
          .authorizationCodeGrant(code)
          .then(data => {
            res.json({
              accessToken: data.body.access_token,
              refreshToken: data.body.refresh_token,
              expiresIn: data.body.expires_in,
            })
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400)
          })
    },

    spotifyRefresh (req, res) {
        const refreshToken = req.body.refreshToken
        const spotifyApi = new SpotifyWebApi({
            redirectUri: 'http://localhost:3000',
            clientId: 'a64546f1c27541cca025fc19bce260c3',
            clientSecret: '9ee61cb3be0744b2866014d64a420c7e',
          refreshToken,
        })
      
        spotifyApi
          .refreshAccessToken()
          .then(data => {
            console.log(data.body);
            // res.json({
            //   accessToken: data.body.accessToken,
            //   expiresIn: data.body.expiresIn,
            // })
          })
          .catch(err => {
            console.log(err)
            res.sendStatus(400)
          })
    }












}