import React from 'react'
import { useState, useContext } from 'react'
import { db } from '../firebase';
import * as firebase from 'firebase/app';

import { MyContext } from '../MyProvider'

import './styles/YoutubeForm.css'

import enviar from '../images/enviar.svg'

const TareaForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        titulo: '',
        descripcion: '',
        enlace: '',
        idUsuario: '',
        idCurso: '',
        idTrimestre: '',
        idContenido: '',
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
            const enlace = `https://drive.google.com/file/d/${newLink[5]}/preview`
            if (props.idContenido != '') {
                if (window.confirm('Quieres crear la Tarea?')) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                        if (doc.exists) {
                            console.log('existe el documento')
                            await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                                console.log('hay ' + doc.data().tareas + ' preguntas')
                                if (doc.data().tareas < 50) {
                                    await db.collection('tareasCursos').doc(props.idCurso).collection('tareas').doc().set({
                                        idContenido: props.idContenido,
                                        idTrimestre: props.idTrimestre,
                                        idCurso: props.idCurso,
                                        idUsuario: usuarioLogeado.uid,
                                        nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                        titulo: state.titulo,
                                        descripcion: state.descripcion,
                                        rol: usuarioLogeado.rol,
                                        tipo: 'drive',
                                        enlace: enlace,
                                        calificado: false,
                                        nota: 0,
                                        fecha: new Date(),
                                    })
                                    setState({
                                        ...state,
                                        loading: false,
                                        titulo: '',
                                        enlace: '',
                                        descripcion: '',
                                        mensaje: '',
                                        error: false
                                    })
                                    window.alert('Tarea creada correctamente')
                                } else {
                                    window.alert('LLegaste al limite de Tareas permitidas por trimestre')
                                }
                            })
                        } else {
                            console.log('no existe el documento')
                            await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).set({
                                nombre: usuarioLogeado.usuario,
                                apellidoPaterno: usuarioLogeado.apellidoPaterno,
                                apellidoMaterno: usuarioLogeado.apellidoMaterno,
                                idUsuario: usuarioLogeado.uid,
                                idCurso: props.idCurso,
                                materia: props.materia,
                                idTrimestre: props.idTrimestre,
                                rol: usuarioLogeado.rol,
                                promedioTareas: 0,
                                tareas: 0,
                                promedioPreguntas: 0,
                                preguntas: 0,
                                promedioRespuestas: 0,
                                respuestas: 0,
                                promedioAportes: 0,
                                aportes: 0,
                                promedioNotas: 0,
                                notas: 0,
                                promedioEvaluaciones: 0,
                                evaluaciones: 0,
                            })
                            console.log('Participacion creada correctamente')
                            await db.collection('tareasCursos').doc(props.idCurso).collection('tareas').doc().set({
                                idContenido: props.idContenido,
                                idTrimestre: props.idTrimestre,
                                idCurso: props.idCurso,
                                idUsuario: usuarioLogeado.uid,
                                nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                titulo: state.titulo,
                                descripcion: state.descripcion,
                                rol: usuarioLogeado.rol,
                                tipo: 'drive',
                                enlace: enlace,
                                nota: 0,
                                calificado: false,
                                fecha: new Date(),
                            })
                            setState({
                                ...state,
                                loading: false,
                                titulo: '',
                                enlace: '',
                                descripcion: '',
                                mensaje: '',
                                error: false
                            })
                            window.alert('Tarea creada correctamente')
                        }
                    })
                }
            } else {
                window.alert('No se puede enviar la tarea. Primero selecciona un contenido');
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
        if (state.titulo.trim().length > 0 && state.enlace.trim().length > 0) {
            crearContenido()
        } else {
            setState({
                ...state,
                titulo: '',
                enlace: '',
                mensaje: 'Escribe en todos los campos',
                error: true
            })
        }
    }
    return (
        <>
            {
                (props.estado || usuarioLogeado.rol === "docente") ?
                    <div className="nuevoYoutube">
                        <div className="nuevoYoutube__centrado">
                            <div className="nuevoYoutube__header">
                                <div className="nuevoYoutube__titulo">
                                    Envia tu tarea con un archivo de Google Drive
                    </div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="nuevoYoutube__form"
                            >
                                <label className="nuevoYoutube__label">
                                    Título del archivo:
                    </label>
                                <input
                                    className="nuevoYoutube__input"
                                    type="text"
                                    name="titulo"
                                    value={state.titulo}
                                    onChange={handleChange}
                                />
                                <label className="nuevoYoutube__label">
                                    Descripción del archivo:
                    </label>
                                <input
                                    className="nuevoYoutube__input"
                                    type="text"
                                    name="descripcion"
                                    value={state.descripcion}
                                    onChange={handleChange}
                                />
                                <label className="nuevoYoutube__label">
                                    Enlace de Drive :
                    </label>
                                <input
                                    className="nuevoYoutube__input"
                                    type="text"
                                    name="enlace"
                                    value={state.enlace}
                                    onChange={handleChange}
                                />
                                <button
                                    id="signupButton" className="nuevoYoutube__button" disabled={state.loading}
                                >
                                    {!state.loading && <img src={enviar} alt="enviar" />}
                                    {state.loading && <div className="spinner"></div>}
                                </button>
                            </form>
                            {state.error && (<h4 className="nuevoYoutube__error">{state.mensaje}</h4>)}
                        </div>
                    </div>
                    :
                    <div>
                        El contenido a sido bloequeado.
                        Ya no se permite enviar Tareas.
                </div>
            }
        </>
    )
}

export default TareaForm
