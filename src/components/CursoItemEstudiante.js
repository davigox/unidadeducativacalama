import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';

import { MyContext } from '../MyProvider';

import './styles/CursoItemEstudiante.css';
import editar from '../images/editar.svg';

const CursoItemEstudiante = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const inscribirse = async () => {
        const curso = await db.collection('cursos').doc(props.idCurso).collection('inscripciones').doc(props.idUsuario).get().then(async doc => {
            if (doc.exists) {
                console.log('el curso existe')
                window.alert(`Ya estas inscrito a: ${props.curso} y ${props.materia}`)
            }else if(window.confirm(`Quieres inscribirte en el curso: ${props.curso} y materia: ${props.materia}`)){
                await db.collection('cursos').doc(props.idCurso).collection('inscripciones').doc(props.idUsuario).set({
                    nombre: usuarioLogeado.usuario,
                    idUsuario: props.idUsuario,
                    idCurso: props.idCurso,
                    curso: props.curso,
                    materia: props.materia,
                    docente: props.docente,
                    preguntas: 0,
                    respuestas: 0,
                    notas: 0,
                    fecha: new Date(),
                })
                console.log('Inscripcion realizada correctamente')
            }
        })
    }
    useEffect(() => {
    }, [])
    return (
        <div className="cursoItemEstudiante">
            <div className="cursoItemEstudiante__body">
                <div className={`cursoItemEstudiante__ico ${props.curso}`}>

                </div>
                <div className="cursoItemEstudiante__datos">
                    <h3 className="cursoItemEstudiante__text">
                        <div className="cursoItemEstudiante__text1">Curso: </div>
                        <div className="cursoItemEstudiante__text2">{props.curso}</div>
                    </h3>
                    <h3 className="cursoItemEstudiante__text">
                        <div className="cursoItemEstudiante__text1">Materia: </div>
                        <div className="cursoItemEstudiante__text2">{props.materia}</div>
                    </h3>
                    <h3 className="cursoItemEstudiante__text">
                        <div className="cursoItemEstudiante__text1">Docente: </div>
                        <div className="cursoItemEstudiante__text2">{props.docente}</div>
                    </h3>
                </div>
            </div>
            <div className="cursoItemEstudiante__opciones">
                <button
                    className="cursoItemEstudiante__button"
                    onClick={inscribirse}
                >
                    Inscribirse
                </button>
            </div>

        </div>

    )
}
export default CursoItemEstudiante;