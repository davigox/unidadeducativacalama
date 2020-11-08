import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../firebase';

import user from '../images/user.svg';
import ver from '../images/ver.svg';
import play from '../images/play.svg';
import './styles/TareaItem.css';

const TareaItem = (props) => {
    const [state, setState] = useState({
        nota: props.nota,
    })
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="TareaItem">
            <div className="TareaItem__body">
                <div className="TareaItem__ico">
                    {/* <img src={user} alt="play" /> */}
                    T{props.index}
                </div>
                <div>
                    <div className="TareaItem__row">
                        <label className="TareaItem__label">
                            Nombre :
                        </label>
                        <div className="TareaItem__text">
                            {props.nombre}
                        </div>
                    </div>
                    <div className="TareaItem__row">
                        <label className="TareaItem__label">
                            Título :
                        </label>
                        <div className="TareaItem__text">
                            {props.titulo}
                        </div>
                    </div>
                </div>
            </div>
            <div className="TareaItem__opciones">
                {
                    props.calificado &&
                    <div className="RespuestaItem__footer__calificacion">
                        Calificado con :
                        {state.nota}
                    </div>
                }
                <div className="TareaItem__img">
                    <a href={props.enlace} target="_blank">
                        <img src={ver} alt="ver"
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TareaItem
