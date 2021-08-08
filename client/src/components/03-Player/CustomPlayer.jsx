import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function CustomPlayer({ accessToken, trackUri }) {
  console.log(accessToken);
  
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}
