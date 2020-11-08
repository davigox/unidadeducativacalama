import React from 'react';

import './styles/RespuestaItemEstudiante.css';

import respuestas from '../images/respuestas.svg';
import user_black from '../images/user_black.svg';
import borrar from '../images/borrar.svg';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const RespuestaItemEstudiante = (props) => {
    const borrarRespuesta = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR la respuesta: ${props.mensaje} de ${props.nombre}?`)) {
                await db.collection('respuestas').doc(props.idRespuesta).delete();
                window.alert(`Se elimino ${props.mensaje}`)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="RespuestaItemEstudiante">
            <div className="RespuestaItemEstudiante__header">
                <div className="RespuestaItemEstudiante__ico">
                    {/* <img src={user_black} alt="user"/> */}
                    R{props.index}
                </div>
                <div className="RespuestaItemEstudiante__usuario">
                    <div className="RespuestaItemEstudiante__nombre">
                        {props.nombre}
                    </div>
                    <div className="RespuestaItemEstudiante__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="RespuestaItemEstudiante__body">
                {props.mensaje}
            </div>
            <div className="RespuestaItemEstudiante__footer">
                {
                    props.calificado &&
                    <div className="RespuestaItem__footer__calificacion">
                        Calificado con :
                        {props.nota}
                    </div>
                }
            </div>
        </div>
    )
}

export default RespuestaItemEstudiante
