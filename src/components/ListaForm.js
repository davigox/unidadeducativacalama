import React, { useState } from 'react';

import './styles/PreguntaForm.css';

import enviar from '../images/enviar.svg'

const ListaForm = (props) => {
    const [state, setState] = useState({
        curso: '',
        error: false,
        mensaje: ''
    });
    const handleChange = (e) => {
        props.ponerCurso(e.target.value)
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.curso.trim().length > 0) {
            props.buscarEstudiantes(state.curso)
        } else {
            setState({
                ...state,
                curso: '',
                mensaje: 'Selecciona un Curso',
                error: true
            })
        }
    }
    return (
        <div className="ListaForm">
            <div className="ListaForm__centrado">
                <div className="ListaForm__header">
                    <div className="ListaForm__titulo">
                        Selecciona un Curso
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="ListaForm__form"
                >
                    <select
                        name="curso"
                        className="ListaForm__input"
                        onChange={handleChange}
                        value={state.curso}
                    >
                        <option value="">Selecciona un Curso</option>
                        <option value="1 Primero A">1 Primero A</option>
                        <option value="1 Primero B">1 Primero B</option>
                        <option value="1 Primero C">1 Primero C</option>
                        <option value="1 Primero D">1 Primero D</option>
                        <option value="1 Primero E">1 Primero E</option>
                        <option value="2 Segundo A">2 Segundo A</option>
                        <option value="2 Segundo B">2 Segundo B</option>
                        <option value="2 Segundo C">2 Segundo C</option>
                        <option value="2 Segundo D">2 Segundo D</option>
                        <option value="2 Segundo E">2 Segundo E</option>
                        <option value="3 Tercero A">3 Tercero A</option>
                        <option value="3 Tercero B">3 Tercero B</option>
                        <option value="3 Tercero C">3 Tercero C</option>
                        <option value="3 Tercero D">3 Tercero D</option>
                        <option value="3 Tercero E">3 Tercero E</option>
                        <option value="4 Cuarto A">4 Cuarto A</option>
                        <option value="4 Cuarto B">4 Cuarto B</option>
                        <option value="4 Cuarto C">4 Cuarto C</option>
                        <option value="4 Cuarto D">4 Cuarto D</option>
                        <option value="4 Cuarto E">4 Cuarto E</option>
                        <option value="5 Quinto A">5 Quinto A</option>
                        <option value="5 Quinto B">5 Quinto B</option>
                        <option value="5 Quinto C">5 Quinto C</option>
                        <option value="5 Quinto D">5 Quinto D</option>
                        <option value="5 Quinto E">5 Quinto E</option>
                        <option value="6 Sexto A">6 Sexto A</option>
                        <option value="6 Sexto B">6 Sexto B</option>
                        <option value="6 Sexto C">6 Sexto C</option>
                        <option value="6 Sexto D">6 Sexto D</option>
                    </select>
                    <button
                        id="signupButton" className="ListaForm__button"
                    >
                        <img src={enviar} alt="enviar" />
                    </button>
                </form>
                {state.error && (<h4 className="ListaForm__error">{state.mensaje}</h4>)}
            </div>
        </div>
    )
}

export default ListaForm
