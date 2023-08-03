import React from 'react'
import dogImage from '../../img/australian.png'
import style from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className={style.landing}>
            <img src={dogImage} alt='Dog'></img>
            <div className={style.container}>
                <h1>¡Esta es una web<br />hecha con amor!</h1>
                <p>A continuación visualizaras un listado de perros,<br />procura no perder la calma con tanta ternura.</p>
                <Link to={`/home`} className={style.link}>
                    <button>Explorar</button>
                </Link>        
            </div>
        </div>
    )
}
