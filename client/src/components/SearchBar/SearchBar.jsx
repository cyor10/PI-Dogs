import React from 'react'
import { useState } from "react";
import { connect } from 'react-redux';
import { allDogs, onSearch, setPage } from '../../redux/actions';

function SearchBar({ restart, searchByName, isLoading, currentPage, restarPage }) {
    const [name, setName] = useState('');

    const handleChange = (evento) => {
        setName(evento.target.value);
    }

    const handleClick = (pageNumber, name) => {
        searchByName(name);
        restarPage(pageNumber);
    }

    const handleRestartClick = () => {
        restart();
        setName('')
    }

    return (
        <div>
            <input
                type='search'
                placeholder="Buscar raza"
                onChange={handleChange}
                value={name} />
            <button onClick={() => handleClick(currentPage = 1, name)} disabled={isLoading || name.trim() === ''}>{isLoading ? 'Cargando...' : 'Buscar'}</button>
            <button onClick={() => handleRestartClick()}>Limpiar</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch) => {
    return {
        searchByName: function (name) {
            dispatch(onSearch(name))
        },
        restarPage: function (pageNumber) {
            dispatch(setPage(pageNumber))
        },
        restart: function () {
            dispatch(allDogs())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
