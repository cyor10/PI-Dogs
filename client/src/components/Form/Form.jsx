import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Form.module.css'
import validate from "./validator";
import { createNewDog } from '../../redux/actions'

export default function Form() {

    // Estado para almacenar los temperamentos obtenidos desde el estado global (Redux).
    const temperaments = useSelector((state) => state.allTemperaments);

    // Función para despachar acciones al estado global.
    const dispatch = useDispatch();

    // Estado para almacenar los datos del formulario.
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperaments: []
    });
    console.log(formData)

    // Estado para almacenar los errores de validación del formulario.
    const [errors, setErrors] = useState({});
    console.log(errors)

    // Efecto para actualizar los errores de validación cuando cambian los datos del formulario.
    useEffect(() => {
        setErrors(validate(formData));
    }, [formData]);

    // Manejador para los cambios en los campos del formulario.
    const handleChange = (event) => {
        const { name, value } = event.target;
        const validationErrors = validate({ ...formData, [name]: value });
        setErrors(validationErrors);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // Manejador para agregar o quitar temperamentos seleccionados en el dropdown.
    const handleTemperamentChange = (event) => {
        const selectedId = event.target.value;
        if (!formData.temperaments.includes(selectedId)) {
            setFormData((prevFormData) => ({ ...prevFormData, temperaments: [...prevFormData.temperaments, selectedId] }));
        }
    }

    // Manejador para identificar temperamentos selecionados
    const handleDropdownToggle = () => {
        const dropdown = document.getElementById('temperamentsDropdown');
        dropdown.classList.toggle(styles.open);
    };

    // Manejador para remover temperamentos de la lista del seleccionado
    const handleTemperamentRemove = (id) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            temperaments: prevFormData.temperaments.filter((temperamentId) => temperamentId !== id)
        }));
    };

    // Manejador para enviar los datos del formulario al servidor.
    const handleSubmit = (event) => {
        event.preventDefault();

        let aux = Object.keys(errors);
        if (aux.length === 0) {
            // Si no hay errores de validación, se reinicia el formulario y se envían los datos al servidor.
            setFormData({
                image: '',
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                lifeSpan: '',
                temperaments: []
            });
            const validationErrors = validate(formData);
            setErrors(validationErrors);

            // Construcción del body para la petición de creación de nuevo perro
            const payload = {
                image: formData.image,
                name: formData.name,
                height: `${formData.heightMin} - ${formData.heightMax}`,
                weight: `${formData.weightMin} - ${formData.weightMax}`,
                life_span: `${formData.lifeSpan} years`,
                temperaments: formData.temperaments,
            }
            console.log(payload)
            dispatch(createNewDog(payload))
        } else {
            return alert(errors)
        }
    };

    return (
        <div>
            <div className={styles.bar}>
                <h1 className={styles.title}>Create a new breed dog</h1>
                <Link to={`/home`}>
                    <button className={styles.back}>X</button>
                </Link>
            </div>
            <div className={styles.new}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Image (url): <input
                        type="text" key="image" name="image" value={formData.image}
                        onChange={handleChange} onBlur={handleChange} /> </label>
                    <span>{errors?.image && errors.image}</span>
                    <br />
                    <label>Name: <input
                        type="text" key="name" name="name" value={formData.name}
                        onChange={handleChange} /> </label>
                    <span>{errors?.name && errors.name}</span>
                    <br />
                    <label>Minimun height (cm): <input
                        type="number" key="heightMin" name="heightMin" onChange={handleChange}
                        value={formData.heightMin} /> </label>
                    <span>{errors?.heightMin && errors.heightMin}</span>
                    <br />
                    <label>Maximun height (cm): <input
                        type="number" key="heightMax" name="heightMax" onChange={handleChange}
                        value={formData.heightMax} /> </label>
                    <span>{errors?.heightMax && errors.heightMax}</span>
                    <br />
                    <label>Mininum weight (kg): <input
                        type="number" key="weightMin" name="weightMin" onChange={handleChange}
                        value={formData.weightMin}  /></label>
                    <span>{errors?.weightMin && errors.weightMin}</span>
                    <br />
                    <label>Maximun weight (kg): <input
                        type="number" key="weightMax" name="weightMax" onChange={handleChange}
                        value={formData.weightMax} /></label>
                    <span>{errors?.weightMax && errors.weightMax}</span>
                    <br />
                    <label>Life span (years): <input
                        type="number" key="lifeSpan" name="lifeSpan" onChange={handleChange}
                        value={formData.lifeSpan} /></label>
                    <span>{errors?.lifeSpan && errors.lifeSpan}</span>
                    <br />
                    <label>
                        Temperaments:
                        <div onClick={handleDropdownToggle}>
                            <select id="temperamentsDropdown" multiple value={formData.temperaments} onChange={handleTemperamentChange}>
                                {temperaments.map((temperament) => (
                                    <option key={temperament.id} value={temperament.id}>
                                        {temperament.name}
                                    </option>
                                ))}
                            </select>
                            <div className={styles['selected-values']}>
                                {formData.temperaments.map((selectedId) => {
                                    const selectedTemperament = temperaments.find((temperament) => temperament.id === selectedId);
                                    return (
                                        <div key={selectedId} className={styles['selected-temperament']}>
                                            {selectedTemperament.name}{' '}
                                            <button type="button" onClick={() => handleTemperamentRemove(selectedId)}>
                                                X
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </label>
                    <span>{errors?.temperaments && errors.temperaments}</span>
                    <br />
                    {Object.keys(errors).length === 0 ? (
                        <button type='submit'>Send</button>
                    ) : (
                        <span>Form contains errors</span>
                    )}
                </form>
            </div>
        </div>
    )
}