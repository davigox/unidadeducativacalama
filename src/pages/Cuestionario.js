import React, { useState, useEffect } from 'react'
import Opcion from '../components/Opcion'
import { db } from '../firebase'
import { useContext } from 'react'
import { MyContext } from '../MyProvider';

import './styles/Cuestionario.css'

const Cuestionario = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const quiz = [
        {
            idPregunta: 'sedtrfg',
            pregunta: 'Cuál mes viene justo antes de junio ?',
            respuestaCorrecta: "mayo",
            respuestasIncorrectas: ['septiembre', 'julio', 'agosto'],
        },
        {
            idPregunta: '456fdbrty0',
            pregunta: 'De qué color es un platano ?',
            respuestaCorrecta: "amarillo",
            respuestasIncorrectas: ['rojo', 'blanco', 'azul'],
        },
        {
            idPregunta: '0sdf34534',
            pregunta: '3 + 4 = 7 ?',
            respuestaCorrecta: "verdadero",
            respuestasIncorrectas: ['falso'],
        },
        {
            idPregunta: '32fsdg5gfdghj',
            pregunta: 'A qué hora del día desayunamos ?',
            respuestaCorrecta: "por la mañana",
            respuestasIncorrectas: ['por la tarde', 'por la noche'],
        },
        {
            idPregunta: 'sa0fhk69897',
            pregunta: 'Cuanto es 22 + 6 ?',
            respuestaCorrecta: "28",
            respuestasIncorrectas: ['99', '56', '16'],
        },
    ]
    const [curso, setCurso] = useState({
        idCurso: '',
        materia: '',
    })
    const [state, setState] = useState({
        // cuestionario: [...quiz],
        loading: false,
        cuestionario: [],
        estado: false,
        contadorPregunta: 0,
        intentos: 0,
        score: 0,
        actualPregunta: '',
        respuestaCorrecta: '',
        respuestas: [],
        preguntasDisponibles: [],
        resultados: false,
        pregunta: false,
        inicio: true,
    })

    const obtenerNuevaPregunta = () => {
        const preguntaIndice = state.preguntasDisponibles[Math.floor(Math.random() * state.preguntasDisponibles.length)]
        setState({
            ...state,
            inicio: false,
            pregunta: true,
            estado: true,
            actualPregunta: preguntaIndice,
            respuestaCorrecta: preguntaIndice.respuestaCorrecta,
            respuestaIncorrecta1: preguntaIndice.respuestaIncorrecta1,
            respuestaIncorrecta2: preguntaIndice.respuestaIncorrecta2,
            respuestaIncorrecta3: preguntaIndice.respuestaIncorrecta3,
            respuestas: [preguntaIndice.respuestaCorrecta, preguntaIndice.respuestaIncorrecta1, preguntaIndice.respuestaIncorrecta2, preguntaIndice.respuestaIncorrecta3].sort(() => Math.random() - 0.5),
            contadorPregunta: state.contadorPregunta + 1,
        })

        const index1 = state.preguntasDisponibles.indexOf(preguntaIndice)
        state.preguntasDisponibles.splice(index1, 1)
    }
    const siguiente = () => {

        if (state.contadorPregunta === state.cuestionario.length) {
            window.alert("Cuestionario terminado")
            setState({
                ...state,
                intentos: state.intentos + 1,
            })
            mostrarResultados()
        } else if (!state.estado) {
            obtenerNuevaPregunta()
        }
    }
    const mostrarResultados = () => {
        setState({
            ...state,
            inicio: false,
            resultados: true,
            pregunta: false,
        })
    }
    const obtenerResultado = (respuesta) => {
        if (state.estado) {
            if (respuesta === state.respuestaCorrecta) {
                setState({
                    ...state,
                    estado: false,
                    score: state.score + 1,
                })
                window.alert('La respuesta es correcta')
                return true;
            } else {
                setState({
                    ...state,
                    estado: false,
                })
                window.alert('La respuesta es incorrecta')
                return false;
            }
        } else {
            return null
        }
    }
    async function obtenerDatos() {
        await db.collection('preguntas').where('idContenido', '==', props.match.params.idContenido).get().then((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idPregunta: doc.id });
            })
            setState({
                ...state,
                estado: false,
                cuestionario: [...docs],
                preguntasDisponibles: [...docs],
                contadorPregunta: 0,
                score: 0,
                actualPregunta: '',
                respuestaCorrecta: '',
                respuestas: [],
                resultados: false,
                pregunta: false,
                inicio: true,
                intentos: state.intentos + 1,
            })
            console.log("Preguntas cargadas")
        })
        
    }
    const enviarResultados = () => {
        if (window.confirm(`Seguro que quieres Enviar tus resultados?`)) {
            setState({
                ...state,
                loading: true,
            })
            const participacionesRef = db.collection('trimestres').doc(props.match.params.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid);
            const participacionRef = db.collection('trimestres').doc(props.match.params.idTrimestre).collection('participaciones').doc(usuarioLogeado.uid)
            return db.runTransaction(transaction => {
                return transaction.get(participacionesRef).then(res => {
                    if (!res.exists) {
                        console.log('Documento no existe')
                        transaction.set(participacionRef, {
                            nombre: usuarioLogeado.usuario,
                            apellidoPaterno: usuarioLogeado.apellidoPaterno,
                            apellidoMaterno: usuarioLogeado.apellidoMaterno,
                            idUsuario: usuarioLogeado.uid,
                            idCurso: curso.idCurso,
                            materia: curso.materia,
                            idTrimestre: props.match.params.idTrimestre,
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
                        let newPromedioEvaluaciones = parseInt(Math.round((state.score / state.cuestionario.length) * 100))
                        transaction.update(participacionesRef, {
                            evaluaciones: 1,
                            promedioEvaluaciones: newPromedioEvaluaciones
                        })
                        window.alert('Resultados enviados correctamente')
                        props.history.goBack()
                        
                    } else {
                        let newEvaluaciones = res.data().evaluaciones + 1;
                        let oldEvaluacionTotal = res.data().promedioEvaluaciones * res.data().evaluaciones
                        let newPromedioEvaluaciones = (oldEvaluacionTotal + parseInt(Math.round((state.score / state.cuestionario.length) * 100))) / newEvaluaciones

                        transaction.update(participacionesRef, {
                            evaluaciones: newEvaluaciones,
                            promedioEvaluaciones: newPromedioEvaluaciones
                        })
                        // transaction.update(notaRef, {
                        //     nota: parseInt(state.nota),
                        //     calificado: true,
                        // })
                        window.alert('Resultados enviados correctamente')
                        props.history.goBack()
                    }
                    setState({
                        ...state,
                        loading: false,
                    })
                })
            })
        }
    }
    useEffect(() => {
        obtenerDatos()
        // obtenerNuevaPregunta()
    }, [])
    useEffect(() => {
        async function obtenerCurso(){
            const ref = db.collection('trimestres').doc(props.match.params.idTrimestre)
            await ref.get().then(doc => {
                if (doc.exists) {
                    setCurso({
                        ...curso,
                        idCurso: doc.data().idCurso,
                        materia: doc.data().materia,
                    })
                } else {
                    window.alert('Al parecer no existe los datos requerido consulta al creador del sistema')
                }
            }).catch(error => {
                console.log('error : ', error.message)
            })
        }
        obtenerCurso()
    }, [])
    
    return (
        <>
            <div className="Cuestionario__container">
                <div className={state.inicio ? `home-box custom-box` : `home-box custom-box hide`}>
                    <h3>Intrucciones:</h3>
                    <p>Número total de preguntas: <span className="total-question">{state.cuestionario.length}</span></p>
                    <p>Número de intentos permitidos: <span className="total-question">2</span></p>
                    <button onClick={siguiente} className="btn">Iniciar Cuestionario</button>
                </div>
                <div className={state.pregunta ? `quiz-box custom-box` : `quiz-box custom-box hide`}>
                    <div className="question-number">
                        Pregunta {state.contadorPregunta} de {state.cuestionario.length}
                    </div>
                    <div className="question-text">
                        {state.actualPregunta.pregunta}
                    </div>
                    <div className="option-container">
                        {
                            state.respuestas.map((doc, index) => {
                                return (
                                    <Opcion
                                        respuestaCorrecta={state.respuestaCorrecta}
                                        key={index + doc}
                                        respuesta={doc}
                                        class='option'
                                        obtenerResultado={obtenerResultado}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="next-question-btn">
                        <button onClick={siguiente} className="btn">
                            Siguiente
                        </button>
                    </div>
                    <div className="answers-indicator">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={state.resultados ? `result-box custom-box` : `result-box custom-box hide`}>
                    <h1>Resultado de Cuestionario</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total de Preguntas</td>
                                <td><span className="total-question">{state.cuestionario.length}</span></td>
                            </tr>
                            <tr>
                                <td>Intentos</td>
                                <td><span className="total-attempt">{state.intentos}</span></td>
                            </tr>
                            <tr>
                                <td>Correctos</td>
                                <td><span className="total-correct">{state.score}</span></td>
                            </tr>
                            <tr>
                                <td>Inorrectos</td>
                                <td><span className="total-wrong">{state.cuestionario.length - state.score}</span></td>
                            </tr>
                            <tr>
                                <td>Porcentaje</td>
                                <td><span className="percentage">{Math.round((state.score / state.cuestionario.length) * 100)}%</span></td>
                            </tr>
                            <tr>
                                <td>Tu puntuación total</td>
                                <td><span className="total-score">{state.score} / {state.cuestionario.length}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    {
                        state.intentos !== 2 &&
                        <button onClick={obtenerDatos} className="btn">Inténtalo de nuevo</button>
                    }
                    {
                        usuarioLogeado.rol === "estudiante" &&
                        <button onClick={enviarResultados} className="btn">Enviar Resultados</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Cuestionario