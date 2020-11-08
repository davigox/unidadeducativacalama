import React, { useState } from 'react';

import user from '../images/user.svg';
import arrow from '../images/arrow.svg';

import './styles/EstudianteItem.css';
import { db } from '../firebase';
import { useEffect } from 'react';
import Preguntas from './Preguntas';
import Respuestas from './Respuestas';
import Tareas from './Tareas';
import Notas from './Notas';
import Aportes from './Aportes';



const EstudianteItem = (props) => {
    const [state, setState] = useState({
        preguntas: false,
        respuestas: false,
        aportes: false,
        notas: false,
        tareas: false,
    })
    const mostrarRespuestas = () => {
        setState({
            ...state,
            respuestas: !state.respuestas,
        })
    }
    const mostrarPreguntas = () => {
        setState({
            ...state,
            preguntas: !state.preguntas,
        })
    }
    const mostrarAportes = () => {
        setState({
            ...state,
            aportes: !state.aportes,
        })
    }
    const mostrarNotas = () => {
        setState({
            ...state,
            notas: !state.notas,
        })
    }
    const mostrarTareas = () => {
        setState({
            ...state,
            tareas: !state.tareas,
        })
    }
    return (
        <div className="EstudianteItem">
            <div className="EstudianteItem__header">
                <div
                    className="EstudianteItem__ico">
                    <img src={user} alt="user" />
                </div>
                <div className="EstudianteItem__column">
                    <p className="EstudianteItem__nombre">
                        {`${props.apellidoPaterno} ${props.apellidoMaterno} ${props.nombre}`}
                    </p>
                </div>

                <div className="EstudianteItem__column amarillo">
                    <div className="EstudianteItem__titulo">
                        (SABER/45pts)
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.respuestas} Respuestas
                    </div>
                    <div
                        onClick={mostrarRespuestas}
                        className="EstudianteItem__titulo">
                        Calificación
                    </div>
                    <div className="EstudianteItem__numero">
                        {Math.round(props.promedioRespuestas*.45)} pts
                    </div>
                </div>
                <div className="EstudianteItem__column amarillo">
                    <div className="EstudianteItem__titulo">
                        (SABER/45pts)
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.aportes} Aportes
                    </div>
                    <div
                        onClick={mostrarAportes}
                        className="EstudianteItem__titulo">
                        Calificación
                    </div>
                    <div className="EstudianteItem__numero">
                        {Math.round(props.promedioAportes*.45)} pts
                    </div>
                </div>
                <div className="EstudianteItem__column rojo">
                    <div className="EstudianteItem__titulo">
                        (HACER/45pts)
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.preguntas} preguntas
                    </div>
                    <div
                        onClick={mostrarPreguntas}
                        className="EstudianteItem__titulo">
                        Calificación
                    </div>
                    <div className="EstudianteItem__numero">
                        {Math.round(props.promedioPreguntas*.45)} pts
                    </div>
                </div>
                <div className="EstudianteItem__column rojo">
                    <div className="EstudianteItem__titulo">
                        (HACER/45pts)
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.tareas} Tareas
                    </div>
                    <div
                        onClick={mostrarTareas}
                        className="EstudianteItem__titulo">
                        Calificación
                    </div>
                    <div className="EstudianteItem__numero">
                        {Math.round(props.promedioTareas*.45)} pts
                    </div>
                </div>
                <div className="EstudianteItem__column celeste">
                    <div className="EstudianteItem__titulo">
                        (SER/DECIDIR/10pts)
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.notas} Notas
                    </div>
                    <div
                        onClick={mostrarNotas}
                        className="EstudianteItem__titulo">
                        Calificación
                    </div>
                    <div className="EstudianteItem__numero">
                        {Math.round(props.promedioNotas*.10)} pts
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EstudianteItem
