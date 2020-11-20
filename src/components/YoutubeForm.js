import React from 'react'
import { useState, useContext } from 'react'
import { db } from '../firebase'
import { MyContext } from '../MyProvider'

import './styles/YoutubeForm.css'

import enviar from '../images/enviar.svg'

const YoutubeForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading:false,
        titulo: '',
        descripcion: '',
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
            const link = state.enlace
            const newLink = link.split('/')
            const enlace = `https://www.youtube.com/embed/${newLink[3]}`
            if (window.confirm(`Se creará con título: ${state.titulo} y enlace: ${enlace}`)) {
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
                    descripcion: state.descripcion,
                    tipo: 'video',
                    enlace: enlace,
                    materia: props.materia,
                    estado: true,
                    fecha: new Date(),
                })
                console.log('Contenido creado correctamente')
                setState({
                    ...state,
                    loading: false,
                    titulo: '',
                    enlace: '',
                    descripcion: '',
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
                loading: false,
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
        <div className="YoutubeForm">
            <div className="YoutubeForm__header">
                <div className="YoutubeForm__titulo">
                    Envía un Video de Youtube
                    </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="YoutubeForm__form"
            >
                <label className="YoutubeForm__label">
                    Título:
                    </label>
                <input
                    className="YoutubeForm__input"
                    type="text"
                    name="titulo"
                    value={state.titulo}
                    onChange={handleChange}
                />
                <label className="YoutubeForm__label">
                    Descripción:
                    </label>
                <input
                    className="YoutubeForm__input"
                    type="text"
                    name="descripcion"
                    value={state.descripcion}
                    onChange={handleChange}
                />
                <label className="YoutubeForm__label">
                    Enlace Youtube :
                    </label>
                <input
                    className="YoutubeForm__input"
                    type="text"
                    name="enlace"
                    value={state.enlace}
                    onChange={handleChange}
                />
                <button
                    id="signupButton" className="YoutubeForm__button"
                    disabled={state.loading}
                >
                    {!state.loading && <img src={enviar} alt="enviar" />}
                    {state.loading && <div className="spinner"></div>}
                </button>
            </form>
            {state.error && (<h4 className="YoutubeForm__error">{state.mensaje}</h4>)}
        </div>
    )
}

export default YoutubeForm
