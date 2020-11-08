import React, { useContext, useState } from 'react';
import { db } from '../firebase';
import { MyContext } from '../MyProvider';
import * as firebase from 'firebase/app';

import './styles/PreguntaForm.css';

import enviar from '../images/enviar.svg'

const PreguntaForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        pregunta: '',
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
                if (window.confirm('Quieres crear la Pregunta?')) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                        if (doc.exists) {
                            console.log('existe el documento')
                            await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                                console.log('hay ' + doc.data().preguntas + ' preguntas')
                                if (doc.data().preguntas < 50 || usuarioLogeado.rol === 'docente') {
                                    await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').doc().set({
                                        idContenido: props.idContenido,
                                        idTrimestre: props.idTrimestre,
                                        idCurso: props.idCurso,
                                        idUsuario: usuarioLogeado.uid,
                                        nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                        mensaje: state.pregunta,
                                        materia: props.materia,
                                        rol: usuarioLogeado.rol,
                                        nota: 0,
                                        calificado: false,
                                        fecha: new Date(),
                                    })
                                    setState({
                                        ...state,
                                        loading: false,
                                        pregunta: '',
                                    })
                                    window.alert('Pregunta creada Correctamente')
                                } else {
                                    window.alert('LLegaste al limite de preguntas permitidas por trimestre')
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
                            await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').doc().set({
                                idContenido: props.idContenido,
                                idTrimestre: props.idTrimestre,
                                idCurso: props.idCurso,
                                idUsuario: usuarioLogeado.uid,
                                nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                mensaje: state.pregunta,
                                materia: props.materia,
                                rol: usuarioLogeado.rol,
                                nota: 0,
                                calificado: false,
                                fecha: new Date(),
                            })
                            setState({
                                ...state,
                                loading: false,
                                pregunta: '',
                            })
                            window.alert('Pregunta creada correctamente')
                        }
                    })
                }
            }
            else {
                window.alert('No se puede hacer una pregunta. Primero selecciona un contenido');
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
                pregunta: '',
                error: true,
                mensaje: 'Error al crear el contenido intente nuevamente',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.pregunta.trim().length > 0) {
            crearContenido()
        } else {
            setState({
                ...state,
                pregunta: '',
                mensaje: 'Escribe tu pregunta',
                error: true
            })
        }
    }
    return (
        <>
            {
                (props.estado || usuarioLogeado.rol === "docente") ?
                <div className="PreguntaForm">
                    <div className="PreguntaForm__centrado">
                        <div className="PreguntaForm__header">
                            <div className="PreguntaForm__titulo">
                                Escribe una pregunta para el contenido
                    </div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="PreguntaForm__form"
                        >
                            <input
                                className="PreguntaForm__input"
                                type="text"
                                name="pregunta"
                                value={state.pregunta}
                                onChange={handleChange}
                            />
                            <button
                                id="signupButton" className="PreguntaForm__button" disabled={state.loading}
                            >
                                {!state.loading && <img src={enviar} alt="enviar" />}
                                {state.loading && <div className="spinner"></div>}
                            </button>
                        </form>
                        {state.error && (<h4 className="PreguntaForm__error">{state.mensaje}</h4>)}
                    </div>
                </div>
                :
                <div>
                    El contenido a sido bloequeado.
                    Ya no se permite realizar preguntas.
                </div>
            }
        </>
    )
}

export default PreguntaForm
