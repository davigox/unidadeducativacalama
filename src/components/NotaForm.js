import React, { useContext, useState } from 'react';
import * as firebase from 'firebase/app';

import { db } from '../firebase';

import enviar from '../images/enviar.svg';
import { MyContext } from '../MyProvider';

const NotaForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        nota: '',
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
                if (window.confirm('Quieres crear la Nota?')) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                        if (doc.exists) {
                            console.log('existe el documento')
                            await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).get().then(async doc => {
                                console.log('hay ' + doc.data().notas + ' preguntas')
                                if (doc.data().notas < 50) {
                                    // await db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid).update({
                                    //     notas: firebase.firestore.FieldValue.increment(1),
                                    // })
                                    await db.collection('notasCursos').doc(props.idCurso).collection('notas').doc().set({
                                        idContenido: props.idContenido,
                                        idTrimestre: props.idTrimestre,
                                        idCurso: props.idCurso,
                                        idUsuario: usuarioLogeado.uid,
                                        nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                        mensaje: state.nota,
                                        materia: props.materia,
                                        rol: usuarioLogeado.rol,
                                        nota: 0,
                                        calificado: false,
                                        fecha: new Date(),
                                    })
                                    setState({
                                        ...state,
                                        loading: false,
                                        nota: '',
                                    })
                                    window.alert('Nota creada correctamente')
                                } else {
                                    window.alert('LLegaste al limite de notas permitidas por trimestre')
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
                            await db.collection('notasCursos').doc(props.idCurso).collection('notas').doc().set({
                                idContenido: props.idContenido,
                                idTrimestre: props.idTrimestre,
                                idCurso: props.idCurso,
                                idUsuario: usuarioLogeado.uid,
                                nombre: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                                mensaje: state.nota,
                                materia: props.materia,
                                rol: usuarioLogeado.rol,
                                nota: 0,
                                calificado: false,
                                fecha: new Date(),
                            })
                            setState({
                                ...state,
                                loading: false,
                                nota: '',
                            })
                            window.alert('Nota creada correctamente')
                        }
                    })
                }
            }
            else {
                window.alert('No se puede hacer una nota. Primero selecciona un contenido');
            }

        } catch (error) {
            console.log(error)
            setState({
                ...state,
                nota: '',
                error: true,
                mensaje: 'Error al crear la nota intente nuevamente',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.nota.trim().length > 0) {
            crearContenido()
        } else {
            setState({
                ...state,
                nota: '',
                mensaje: 'Escribe tu nota',
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
                                    Escribe una Nota para el contenido. Las notas solo la verán tu el docente de la materia
                    </div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="PreguntaForm__form"
                            >
                                <input
                                    className="PreguntaForm__input"
                                    type="text"
                                    name="nota"
                                    value={state.nota}
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
                        Ya no se permite realizar Notas.
                    </div>
            }
        </>
    )
}

export default NotaForm
