import React from 'react';
import { useState } from 'react';

import expandir from '../images/expandir.svg';

import './styles/TrimestreItemEstudiante.css';
import ContenidosListEstudiante from './ContenidosListEstudiante';

const TrimestreItemEstudiante = (props) => {
    const [state, setState] = useState({
        contenidos: false,
        youtubeForm: false
    })
    const verContenidos = () => {
        setState({
            ...state,
            youtubeForm: false,
            contenidos: !state.contenidos
        })
    }
    return (
        <div className="TrimestreItemEstudiante">
            <div className="TrimestreItemEstudiante__head">
                <div className="TrimestreItemEstudiante__titulo">
                    {props.titulo}
                </div>
                <div className="TrimestreItemEstudiante__opciones">
                    <div
                        onClick={verContenidos}
                        className="TrimestreItemEstudiante__img"
                    >
                        <img className="TrimestreItemEstudiante__expandir" src={expandir} alt="expandir" />
                    </div>
                </div>
            </div>
            <div className="TrimestreItem__contenido">
                {
                    state.contenidos &&
                    <ContenidosListEstudiante
                        ponerVideo={props.ponerVideo}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        curso={props.curso}
                    />
                }
            </div>
        </div>
    )
}

export default TrimestreItemEstudiante
