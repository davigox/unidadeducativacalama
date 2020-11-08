import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { useState } from 'react';

import editar from '../images/editar.svg';
import arrow from '../images/arrow.svg';
import play from '../images/play.svg';
import ver from '../images/ver.svg';
import drive from '../images/drive.svg';
import whatsapp from '../images/grupo_whatsapp.svg';
import youtube from '../images/youtube.svg';
import classroom from '../images/classroom.svg';
import reunion_zoom from '../images/reunion_zoom.svg';




// CSS
import './styles/ContenidoItemEstudiante.css';

const ContenidoItemEstudiante = (props) => {
    const [state, setState] = useState({
        marcado: false,
    })
    const handleClick = () => {
            props.ponerVideo(props.enlace, props.titulo, props.descripcion, props.idTrimestre, props.idContenido, props.estado)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="contenidoItem">
            <div className="contenidoItem__body">
                <div className="contenidoItem__ico">
                {
                        props.tipo === 'video' &&
                        <img src={youtube} alt="play" />
                    }
                    {
                        props.tipo === 'whatsapp' &&
                        <img src={whatsapp} alt="whats" />
                    }
                    {
                        props.tipo === 'drive' &&
                        <img src={drive} alt="whats" />
                    }
                    {
                        props.tipo === 'zoom' &&
                        <img src={reunion_zoom} alt="whats" />
                    }
                    {
                        props.tipo === 'classroom' &&
                        <img src={classroom} alt="whats" />
                    }
                </div>
                <div className="contenidoItem__column">
                    <div className="contenidoItem__row">
                        <label className="contenidoItem__label">
                            Contenido : {props.index + 1}
                        </label>
                        <div className="contenidoItem__text">
                            {props.titulo}
                        </div>
                    </div>
                    <div className="contenidoItem__row">
                        <label className="contenidoItem__label">
                            Enlace :
                        </label>
                        <div className="contenidoItem__text">
                            {props.enlace}
                        </div>
                    </div>
                </div>
            </div>
            <div className="contenidoItem__opciones">
                {
                    (props.tipo == 'whatsapp' || props.tipo == 'zoom' || props.tipo == 'classroom') &&
                    <div className="contenidoItem__img">
                        <a
                            href={props.enlace} target="_blank"
                        >
                            <img src={ver} alt="editar" />
                        </a>
                    </div>
                }
                {
                    (props.tipo !== 'whatsapp' && props.tipo !== 'zoom' && props.tipo !== 'classroom') &&
                    <div className="contenidoItem__img">
                        <img src={ver} alt="borrar"
                            onClick={handleClick}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default ContenidoItemEstudiante
