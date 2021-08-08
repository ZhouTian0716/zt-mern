import React from 'react'
import { useState, useEffect } from "react";

import "./SearchBar.scss";


export default function SearchBar(props) {
    
    return (
        <div id="searchBox">
                <input
                    type="text"
                    placeholder="Songs/Artists"
                    value={props.search}
                    onChange={e=> props.setSearch(e.target.value)}
                />
        </div>
    )
}

