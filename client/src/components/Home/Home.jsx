import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allDogs } from '../../redux/actions';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';
import Paginator from '../Paginator/Paginator';
import dogfaceImage from '../../img/dogface.jpg'


export default function Home() {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.allDogs);

    useEffect(() => {
        dispatch(allDogs());
    }, [])

    return (
        <div style={{ backgroundImage: `url(${dogfaceImage})`, backgroundSize: '200px'}}>
            <Nav />
            <Cards dogs={dogs} />
            <Paginator />
        </div>
    )
}