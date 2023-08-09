const dogsApi = require("./dogsApi");
const { Temperament } = require('../db');

// Función para setear temperamentos en la base de datos
const getTemperaments = async (req, res) => {
    try {
        const service = await dogsApi(); // Invoco la función que consulta la api externa
        const dogsFromApi = service
            .map((t) => t.temperament).toString().split(",") // Creo una lista de temperamentos
            .map((t) => t.trim()) // Elimina los espacios
            .filter((t) => t.length > 1) // Filter remueve los temperamentos con longitud menor a uno

        const unique = dogsFromApi.filter((t) => t) // Remueve temperamentos repetidos de la lista
        let tempUnique = [...new Set(unique)]

        tempUnique.forEach((t) => { // Recorre y separa cada elemento de la lista 
            Temperament.findOrCreate({ // Almacena cada valor en la tabla de temperamentos
                where: { name: t }
            })
        })
        const totalTemp = await Temperament.findAll() // Recupera los elementos almacenados en la tabla

        const sortTemp = totalTemp.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente

        res.status(200).json(sortTemp) 
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getTemperaments