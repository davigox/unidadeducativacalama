import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { useState } from 'react';

import editar from '../images/editar.svg';
import cuestionario from '../images/cuestionario.svg';
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
                        props.tipo === 'cuestionario' &&
                        <img src={cuestionario} alt="play" />
                    }
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
                        <label className="contenidoItemEstudiante__label">
                            Contenido : {props.index + 1}
                        </label>
                        <div className="contenidoItemEstudiante__text">
                            {props.titulo}
                        </div>
                    </div>
                    {
                        (props.tipo !== 'whatsapp' && props.tipo !== 'zoom' && props.tipo !== 'classroom') &&
                        <div className="contenidoItem__row">
                            <label className="contenidoItemEstudiante__label">
                                Descripción :
                                </label>
                            <div
                                className="contenidoItemEstudiante__text"/>
                                {props.descripcion}
                            <div/>
                        </div>
                    }
                    {
                        props.tipo !== 'cuestionario' &&
                        <div className="contenidoItem__row">
                            <label className="contenidoItemEstudiante__label">
                                Enlace :
                            </label>
                            <p className="contenidoItemEstudiante__text">
                                {props.enlace}
                            </p>
                        </div>
                    }
                </div>
            </div>
            <div className="contenidoItem__opciones">
                {
                    (props.tipo !== 'cuestionario' && props.tipo !== 'whatsapp' && props.tipo !== 'zoom' && props.tipo !== 'classroom') &&
                    <div className="contenidoItem__img">
                        <img src={ver} alt="borrar"
                            onClick={handleClick}
                        />
                    </div>
                }
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
                    (props.tipo == 'cuestionario' && props.estado === true) &&
                    <div className="contenidoItem__img">
                        <Link
                            to={`/cuestionario/${props.idContenido}/${props.idTrimestre}`}
                        >
                            <img src={ver} alt="editar" />
                        </Link>
                    </div>
                }
                {
                    (props.tipo == 'cuestionario' && props.estado === false) &&
                    <div className="texto__rojo">
                        Ya no se permite acceder a esta Evaluación
                    </div>
                }
            </div>
        </div>
    )
}

export default ContenidoItemEstudiante
