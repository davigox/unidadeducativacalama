import React, { useState, useEffect } from 'react'
import Opcion from '../components/Opcion'

import './styles/Cuestionario.css'

const Cuestionario = (props) => {
    const quiz = [
        {
            idPregunta: 'sedtrfg',
            pregunta:'Cuál mes viene justo antes de junio ?',
            respuestaCorrecta: "mayo",
            respuestasIncorrectas:['septiembre','julio','agosto'],
        },
        {
            idPregunta: '456fdbrty0',
            pregunta:'De qué color es un platano ?',
            respuestaCorrecta: "amarillo",
            respuestasIncorrectas:['rojo','blanco','azul'],
        },
        {
            idPregunta: '0sdf34534',
            pregunta:'3 + 4 = 7 ?',
            respuestaCorrecta: "verdadero",
            respuestasIncorrectas:['falso'],
        },
        {
            idPregunta: '32fsdg5gfdghj',
            pregunta:'A qué hora del día desayunamos ?',
            respuestaCorrecta: "por la mañana",
            respuestasIncorrectas:['por la tarde','por la noche'],
        },
        {
            idPregunta: 'sa0fhk69897',
            pregunta:'Cuanto es 22 + 6 ?',
            respuestaCorrecta: "28",
            respuestasIncorrectas:['99','56', '16'],
        },
    ]
    const [state, setState] = useState({
        cuestionario: [...quiz],
        estado: false,
        contadorPregunta: 0,
        score: 0,
        actualPregunta: '',
        respuestaCorrecta: '',
        respuestas: [],
        preguntasDisponibles: [...quiz],
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
            estado:true,
            actualPregunta: preguntaIndice,
            respuestaCorrecta: preguntaIndice.respuestaCorrecta,
            respuestas: [preguntaIndice.respuestaCorrecta, ...preguntaIndice.respuestasIncorrectas].sort(() => Math.random() - 0.5),
            contadorPregunta: state.contadorPregunta + 1,
        })

        const index1 = state.preguntasDisponibles.indexOf(preguntaIndice)
        state.preguntasDisponibles.splice(index1,1)
    }
    const siguiente = () => {
        
        if(state.contadorPregunta === state.cuestionario.length){
            window.alert("Cuestionario terminado")
            mostrarResultados()
        }else if(!state.estado){
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
        if(state.estado){
            if(respuesta === state.respuestaCorrecta){
                setState({
                    ...state,
                    estado: false,
                    score: state.score+1,
                })
                window.alert('La respuesta es correcta')
                return true;
            }else{
                setState({
                    ...state,
                    estado: false,
                })
                window.alert('La respuesta es incorrecta')
                return false;
            }
        }else{
            return null
        }
    }
    // useEffect(() => {
    //     obtenerNuevaPregunta()
    // }, [])
    return (
        <>
            <div className="Cuestionario__container">
                <div className={state.inicio ? `home-box custom-box` : `home-box custom-box hide`}>
                    <h3>Intrucciones:</h3>
                    <p>Número total de preguntas: <span className="total-question">{state.cuestionario.length}</span></p>
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
                                return(
                                    <Opcion
                                        respuestaCorrecta={state.respuestaCorrecta}
                                        key={index+doc}
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
                <div className={state.resultados? `result-box custom-box` : `result-box custom-box hide`}>
                    <h1>Resultado de Cuestionario</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total de Preguntas</td>
                                <td><span className="total-question">{state.cuestionario.length}</span></td>
                            </tr>
                            <tr>
                                <td>Intentos</td>
                                <td><span className="total-attempt">4</span></td>
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
                                <td><span className="total-score">3 / 5</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn">Inténtalo de nuevo</button>
                    <button className="btn">Terminar</button>
                </div>
            </div>
        </>
    )
}

export default Cuestionario