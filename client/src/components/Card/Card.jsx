import React from 'react'
import style from '../Card/Card.module.css'

export default function Card({ dog }) {
    const { image, name, temperament, weight } = dog
    return (
        <div className={style.card}>
            <img src={image} alt='A dog' />
            <h1>{name}</h1>
            <p>{temperament}</p>
            <p>{weight} kg</p>
        </div>
    )
}
