import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import style from '../Nav/Nav.module.css'

export default function Nav() {
    return (
        <div className={style.nav}>
            <SearchBar />
        </div>
    )
}
