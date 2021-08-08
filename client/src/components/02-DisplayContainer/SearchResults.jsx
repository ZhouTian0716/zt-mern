import React from 'react'
import TrackSearchResult from './TrackSearchResult';
import "./DisplayContainer.scss"

export default function SearchResults( {searchResults, chooseTrack} ) {
    return (
        <table class="content-table">
            <thead>
                <tr>
                    <th>Like</th>
                    <th>Album</th>
                    <th>Song</th>
                    <th>Artist</th>
                </tr>
            </thead>
            <tbody className="scrollbar">
                {searchResults.map(track => <TrackSearchResult key={track.uri} track={track} chooseTrack={chooseTrack}/>)}
            </tbody>
        </table>
    )
}
