import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay(){
    chooseTrack(track)
  }


  return (
      <tr onClick={handlePlay}>
        <td><i class="far fa-heart"></i></td>
        <td><img src={track.albumUrl}/></td>
        <td>{track.title}</td>
        <td>{track.artist}</td>
      </tr>
  )
}
