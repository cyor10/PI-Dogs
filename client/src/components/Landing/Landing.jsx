import React from 'react'
import dogImage from '../../img/australian.png'
import style from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className={style.landing}>
            <img src={dogImage} alt='Dog'></img>
            <div className={style.container}>
                <h1>¡This is a website<br />made with love!</h1>
                <p>Next you will see a list of dogs,<br />Try not to lose your cool with such tenderness.</p>
                <Link to={`/home`} className={style.link}>
                    <button>Explore</button>
                </Link>        
            </div>
        </div>
    )
}
