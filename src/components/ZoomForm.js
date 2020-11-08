import React from 'react'
import { useState, useContext } from 'react'
import { db } from '../firebase'
import { MyContext } from '../MyProvider'

import './styles/ZoomForm.css'

import enviar from '../images/enviar.svg'

const ZoomForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        titulo: '',
        enlace: '',
        idUsuario: '',
        idCurso: '',
        idTrimestre: '',
        nombre: '',
        error: false,
        mensaje: ''
    });
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const crearContenido = async () => {
        try {
            if (window.confirm(`Se creará con título: ${state.titulo} y enlace: ${state.enlace}`)) {
                setState({
                    ...state,
                    loading: true,
                })
                await db.collection('contenidos').doc().set({
                    idTrimestre: props.idTrimestre,
                    idCurso: props.idCurso,
                    idUsuario: usuarioLogeado.uid,
                    nombre: props.nombre,
                    titulo: state.titulo,
                    tipo: 'zoom',
                    estado: true,
                    enlace: state.enlace,
                    materia: props.materia,
                    fecha: new Date(),
                })
                console.log('Contenido creado correctamente')
                setState({
                    ...state,
                    loading: false,
                    titulo: '',
                    enlace: '',
                    idCurso: '',
                    idUsuario: '',
                    idTrimestre: '',
                    nombre: '',
                    error: false,
                    mensaje: ''
                })
                window.alert('Contenido creado correctamente');
                props.ocultarForm()
            } else {
                setState({
                    ...state,
                    loading: false,
                })
            }

        } catch (error) {
            console.log(error)
            setState({
                ...state,
                error: true,
                mensaje: 'Error al crear el contenido intente nuevamente',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.titulo.trim().length > 0 &&
            state.enlace.trim().length > 0) {
            crearContenido()
        } else {
            setState({
                ...state,
                mensaje: 'Llena los campos',
                error: true
            })
        }
    }
    return (
        <div className="ZoomForm">
            <div className="ZoomForm__header">
                <div className="ZoomForm__titulo">
                    Comparte el enlace a una reunion de Zoom
                    </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="ZoomForm__form"
            >
                <label className="ZoomForm__label">
                    Nombre de la reunion:
                    </label>
                <input
                    className="ZoomForm__input"
                    type="text"
                    name="titulo"
                    value={state.titulo}
                    onChange={handleChange}
                />
                <label className="ZoomForm__label">
                    Enlace de Zoom :
                    </label>
                <input
                    className="ZoomForm__input"
                    type="text"
                    name="enlace"
                    value={state.enlace}
                    onChange={handleChange}
                />
                <button
                    id="signupButton" className="ZoomForm__button"
                    disabled={state.loading}
                >
                    {!state.loading && <img src={enviar} alt="enviar" />}
                    {state.loading && <div className="spinner"></div>}
                </button>
            </form>
            {state.error && (<h4 className="ZoomForm__error">{state.mensaje}</h4>)}
        </div>
    )
}

export default ZoomForm