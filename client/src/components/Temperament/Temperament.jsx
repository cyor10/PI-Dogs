import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByTemperament } from '../../redux/actions';


export default function Temperament() {
    const temperaments = useSelector((state) => state.allTemperaments);
    const isLoading = useSelector((state) => state.isLoading)
    const clean = useSelector((state) => state.isClean);

    const dispatch = useDispatch();
    const [selectedTemperament, setSelectedTemperament] = useState("all");

        useEffect(() => {
        if (clean) {
            setSelectedTemperament("all");
        }
    }, [clean]);
    console.log(clean)
    console.log(selectedTemperament)

    const handleOptionSelect = (e) => {
        const option = e.target.value;
        setSelectedTemperament(option); // Actualizar el estado con la opción seleccionada
        dispatch(filterByTemperament(option)); // Enviar la opción seleccionada a la acción
    };

    return (
        <div> Temperaments: {isLoading ? 'Loading...' :
            <select value={selectedTemperament}
                onChange={handleOptionSelect}>
                <option value="all">All</option>
                {temperaments.map((temperament) => (
                    <option key={temperament.name} value={temperament.name}>
                        {temperament.name}
                    </option>
                ))}
            </select>}
        </div>
    )
}
