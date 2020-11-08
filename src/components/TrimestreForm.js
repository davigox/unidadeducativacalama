import React, { useState } from 'react'
import { db } from '../firebase';

import './styles/TrimestreForm.css';

import enviar from '../images/enviar.svg';

const TrimestreForm = (props) => {
    const [state, setState] = useState({
        titulo: '',
        idCurso: '',
        idUsuario: '',
        nombre: '',
        curso: '',
        error: false,
        mensaje: ''
    });
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const creartrimestre = async () => {
        try {
            if (window.confirm(`Se creará: ${state.titulo}`)) {
                await db.collection('trimestres').doc().set({
                    titulo: state.titulo,
                    idCurso: props.idCurso,
                    idUsuario: props.idUsuario,
                    nombre: props.nombre,
                    curso: props.curso,
                    materia: props.materia,
                    fecha: new Date(),
                })
                window.alert('Trimestre creado correctamente')
                setState({
                    titulo: '',
                    idCurso: '',
                    idUsuario: '',
                    nombre: '',
                    curso: '',
                    materia: '',
                    error: false,
                    mensaje: ''
                })
                props.ocultarForm()
            } else {

            }

        } catch (error) {
            console.log(error)
            setState({
                ...state,
                error: true,
                mensaje: 'Error al crear el trimestre intente nuevamente',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.titulo.trim().length > 0) {
            creartrimestre();
        } else {
            setState({
                ...state,
                mensaje: 'Llena los campos',
                error: true
            })
        }
    }
    return (
        <div className="TrimestreForm">
            <div className="TrimestreForm__header">
                <div className="TrimestreForm__titulo">
                    Agrega un Trimestre
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="TrimestreForm__form"
            >
                <input
                    className="TrimestreForm__input"
                    type="text"
                    name="titulo"
                    value={state.titulo}
                    onChange={handleChange}
                />
                <button
                    className="TrimestreForm__button"
                >
                    <img src={enviar} alt="enviar" />
                </button>
            </form>
            {state.error && (<h4 className="YoutubeForm__error">{state.mensaje}</h4>)}
        </div>
    )
}

export default TrimestreForm
