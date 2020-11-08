import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { db } from '../firebase'
import { MyContext } from '../MyProvider'

import './styles/NuevoYoutube.css'

import cerrar from '../images/cerrar.svg'

const NuevoYoutube = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        titulo: '',
        enlace: '',
        idCurso: '',
        idUsuario: '',
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
            const newLink= link.split('/')
            const enlace = `https://www.youtube.com/embed/${newLink[3]}`
            if (window.confirm(`Se creará con título: ${state.titulo} y enlace: ${enlace}`)) {
                await db.collection('contenidos').doc().set({
                    titulo: state.titulo,
                    enlace: enlace,
                    idCurso: props.match.params.idCurso,
                    idUsuario: usuarioLogeado.uid,
                    nombre: usuarioLogeado.usuario,
                    tipo: 'video',
                    fecha: new Date(),
                })
                console.log('Contenido creado correctamente')
                setState({
                    titulo: '',
                    enlace: '',
                    idCurso: '',
                    idUsuario: '',
                    nombre: '',
                    error: false,
                    mensaje: ''
                })
                props.history.push(`/${props.match.params.idUsuario}/${props.match.params.idCurso}/cursoedit`);
            } else {

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
        crearContenido();
    }
    return (
        <div className="nuevoYoutube">
            <div className="nuevoYoutube__centrado">
                <div className="nuevoYoutube__header">
                    <div className="nuevoYoutube__titulo">
                        Nuevo Video de Youtube
                    </div>
                    <div className="nuevoYoutube__subtitulo">
                        Completa los campos y publica
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="nuevoYoutube__form"
                >
                    <label className="nuevoYoutube__label">
                        Título :
                    </label>
                    <input
                        className="nuevoYoutube__input"
                        type="text"
                        name="titulo"
                        value={state.titulo}
                        onChange={handleChange}
                    />
                    <label className="nuevoYoutube__label">
                        Enlace Youtube :
                    </label>
                    <input
                        className="nuevoYoutube__input"
                        type="text"
                        name="enlace"
                        value={state.enlace}
                        onChange={handleChange}
                    />
                    <button
                        id="signupButton" className="nuevoYoutube__button"
                    >
                        Publicar
                    </button>
                </form>
                {state.error && (<h4 className="nuevoYoutube__error">{state.mensaje}</h4>)}
            </div>
        </div>
    )
}

export default NuevoYoutube
