import React, { useState } from 'react'

import respuestas from '../images/respuestas.svg';
import user from '../images/user.svg';
const NotaItemEstudiante = (props) => {
    const [state, setState] = useState({
        nota: props.nota,
    })
    return (
        <div className="NotaItem">
            <div className="NotaItem__header">
                <div className="NotaItem__ico">
                    {/* <img src={user} alt="user"/> */}
                    N{props.index}
                </div>
                <div className="NotaItem__usuario">
                    <div className="NotaItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="NotaItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="NotaItem__body">
                {props.mensaje}
            </div>
            <div className="NotaItem__footer">
                {
                    props.calificado &&
                    <div className="RespuestaItem__footer__calificacion">
                        Calificado con :
                        {state.nota}
                    </div>
                }
            </div>
        </div>
    )
}

export default NotaItemEstudiante
