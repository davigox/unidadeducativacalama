import React, { useState } from 'react';
import RespuestaForm from './RespuestaForm';

import './styles/PreguntaItemEstudiante.css';

import respuestas from '../images/respuestas.svg';
import user from '../images/user.svg';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import RespuestasListEstudiante from './RespuestasListEstudiante';

const PreguntaItemEstudiante = (props) => {
    const [state, setState] = useState({
        respuestas: false,
    })
    const handleClick = () => {
        setState({
            respuestas: !state.respuestas,
        })
    }
    return (
        <div className="PreguntaItem">
            <div className="PreguntaItem__header">
                <div className="PreguntaItem__ico">
                    {/* <img src={user} alt="user" /> */}
                    P{props.index}
                </div>
                <div className="PreguntaItem__usuario">
                    <div className="PreguntaItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="PreguntaItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="PreguntaItem__body">
                {props.mensaje}
            </div>
            <div className="PreguntaItem__footer">
                {
                    props.calificado &&
                    <div className="RespuestaItem__footer__calificacion">
                        Calificado con :
                        {props.nota}
                    </div>
                }
                <div onClick={handleClick} className="PreguntaItem__respuestas">
                    respuestas<img src={respuestas} alt="respuestas" />
                </div>
            </div>
            <RespuestaForm
                idPregunta={props.idPregunta}
                idContenido={props.idContenido}
                idCurso={props.idCurso}
                idTrimestre={props.idTrimestre}
                idUsuario={props.idUsuario}
                mensaje={props.mensaje}
                materia={props.materia}
                estado={props.estado}
            />
            {
                state.respuestas &&
                <RespuestasListEstudiante
                    idPregunta={props.idPregunta}
                    idContenido={props.idContenido}
                    idCurso={props.idCurso}
                    idTrimestre={props.idTrimestre}

                />
            }
        </div>
    )
}

export default PreguntaItemEstudiante
