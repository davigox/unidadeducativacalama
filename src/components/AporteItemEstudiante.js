import React,{ useState } from 'react'
import user from '../images/user.svg';
import respuestas from '../images/respuestas.svg';
import './styles/AporteItem.css';

const AporteItemEstudiante = (props) => {
    const [state, setState] = useState({
        nota: props.nota,
    })
    return (
        <div className="AporteItem">
            <div className="AporteItem__header">
                <div className="AporteItem__ico">
                    {/* <img src={user} alt="user"/> */}
                    A{props.index}
                </div>
                <div className="AporteItem__usuario">
                    <div className="AporteItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="AporteItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="AporteItem__body">
                {props.mensaje}
            </div>
            <div className="AporteItem__footer">
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

export default AporteItemEstudiante
