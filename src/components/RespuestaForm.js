import React, { useContext, useState } from 'react';
import * as firebase from 'firebase/app';

import { db } from '../firebase';
import { MyContext } from '../MyProvider';

import './styles/RespuestaForm.css';

import enviar from '../images/enviar.svg';

const RespuestaForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        respuesta: '',
        idUsuario: '',
        idCurso: '',
        idTrimestre: '',
        materia: '',
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
            if (props.idContenido != '') {
                if (window.confirm('Quieres crear la Resspuesta?')) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                        if (doc.exists) {
                            console.log('existe el documento')
                            await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                                console.log('hay ' + doc.data().respuestas + ' respuestas')
                                if (doc.data().respuestas < 50 || usuarioLogeado.rol === 'docente') {
                                    // await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).update({
                                    //     respuestas: firebase.firestore.FieldValue.increment(1),
                                    // })
                                    await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').doc().set({
                                        idContenido: props.idContenido,
                                        idPregunta: props.idPregunta,
                                        idTrimestre: props.idTrimestre,
                                        idCurso: props.idCurso,
                                        idUsuario: usuarioLogeado.uid,
                                        nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                        mensaje: state.respuesta,
                                        materia: props.materia,
                                        rol: usuarioLogeado.rol,
                                        calificado: false,
                                        nota: 0,
                                        fecha: new Date(),
                                    })
                                    setState({
                                        ...state,
                                        loading: false,
                                        respuesta: '',
                                    })
                                    window.alert('Respuesta agregada Correctamente')
                                } else {
                                    window.alert('LLegaste al limite de respuestas permitidas por trimestre')
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
                            })
                            console.log('Participacion creada correctamente')
                            await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').doc().set({
                                idContenido: props.idContenido,
                                idPregunta: props.idPregunta,
                                idTrimestre: props.idTrimestre,
                                idCurso: props.idCurso,
                                idUsuario: usuarioLogeado.uid,
                                nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                mensaje: state.respuesta,
                                materia: props.materia,
                                rol: usuarioLogeado.rol,
                                nota: 0,
                                calificado: false,
                                fecha: new Date(),
                            })
                            setState({
                                ...state,
                                loading: false,
                                respuesta: '',
                            })
                            window.alert('Respuesta agregada Correctamente')
                        }
                    })
                }
            } else {
                window.alert('No se puede hacer una pregunta. Primero selecciona un contenido');
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
        if (state.respuesta.trim().length > 0) {
            crearContenido()
        } else {
            setState({
                ...state,
                respuesta: '',
                mensaje: 'Escribe tu respuesta',
                error: true
            })
        }
    }
    return (
        <>
            {
                (props.estado || usuarioLogeado.rol === "docente") ?
                    <div className="RespuestaForm">
                        <div className="RespuestaForm__centrado">
                            <div className="RespuestaForm__header">
                                <div className="RespuestaForm__titulo">
                                    Escribe una respuesta para la pregunta
                    </div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="RespuestaForm__form"
                            >
                                <input
                                    className="RespuestaForm__input"
                                    type="text"
                                    name="respuesta"
                                    value={state.respuesta}
                                    onChange={handleChange}
                                />
                                <button
                                    className="RespuestaForm__button" disabled={state.loading}
                                >
                                    {!state.loading && <img src={enviar} alt="enviar" />}
                                    {state.loading && <div className="spinner"></div>}
                                </button>
                            </form>
                            {state.error && (<h4 className="RespuestaForm__error">{state.mensaje}</h4>)}
                        </div>
                    </div>
                    :
                    <div>
                        El contenido a sido bloequeado.
                        Ya no se permite realizar respuestas.
                </div>
            }

        </>
    )
}

export default RespuestaForm
