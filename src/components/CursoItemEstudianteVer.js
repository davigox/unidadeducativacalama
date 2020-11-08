import React from 'react';

import { Link } from 'react-router-dom';

import arrow from '../images/arrow.svg';

import './styles/CursoItemEstudianteVer.css'

const CursoItemEstudianteVer = (props) => {

    return (
        <div className="cursoItemEstudianteVer">
            <div className="cursoItemEstudianteVer__body">
                <div className={`cursoItemEstudianteVer__ico ${props.curso}`}>

                </div>
                <div className="cursoItemEstudianteVer__datos">
                    <h3 className="cursoItemEstudianteVer__text">
                        <div className="cursoItemEstudianteVer__text1">Curso: </div>
                        <div className="cursoItemEstudianteVer__text2">{props.curso}</div>
                    </h3>
                    <h3 className="cursoItemEstudianteVer__text">
                        <div className="cursoItemEstudianteVer__text1">Materia: </div>
                        <div className="cursoItemEstudianteVer__text2">{props.materia}</div>
                    </h3>
                    <h3 className="cursoItemEstudianteVer__text">
                        <div className="cursoItemEstudianteVer__text1">Docente: </div>
                        <div className="cursoItemEstudianteVer__text2">{props.docente}</div>
                    </h3>
                </div>
            </div>
            <div className="cursoItemEstudianteVer__opciones">
                <Link className="cursoItemEstudianteVer__img" to={`/${props.idUsuario}/${props.idCurso}/cursodetalle`}>
                    <img src={arrow} alt="ver"/>
                </Link>
            </div>

        </div>
    )
}

export default CursoItemEstudianteVer
