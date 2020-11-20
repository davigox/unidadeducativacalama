import React from 'react'
import { db } from '../firebase';

import borrar from '../images/borrar.svg'

const CursoItemDocente = (props) => {
    const eliminarCurso = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR el CURSO: ${props.curso} con MATERIA: ${props.materia}`)) {
                await db.collection('cursos').doc(props.idCurso).delete();

                await db.collection('trimestres').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collectionGroup('participaciones').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('contenidos').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('respuestasCursos').doc(props.idCurso).delete()
                // window.alert('respuestas del Contenido elminado correctamente')
                await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('preguntasCursos').doc(props.idCurso).delete()
                // window.alert('preguntas del Contenido elminado correctamente')
                await db.collection('notasCursos').doc(props.idCurso).collection('notas').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('notasCursos').doc(props.idCurso).delete()
                // window.alert('notas del Contenido elminado correctamente')
                await db.collection('aportesCursos').doc(props.idCurso).collection('aportes').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('aportesCursos').doc(props.idCurso).delete()
                // window.alert('aportes del Contenido elminado correctamente')
                await db.collection('tareasCursos').doc(props.idCurso).collection('tareas').where('idCurso', '==', props.idCurso).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('tareasCursos').doc(props.idCurso).delete()
                console.log('curso eliminado')
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="CursoItemDocente">
            <div className="CursoItemDocente__datos">
                <div className="CursoItemDocente__codigo">
                    {props.codigo}
                </div>
                <div className="CursoItemDocente__curso">
                    {props.curso}
                </div>
                <div className="CursoItemDocente__materia">
                    {props.materia}
                </div>
            </div>
            <div className="DocenteItem__opciones">
                <div
                    onClick={eliminarCurso}
                    className="TrimestreItem__img"
                >
                    <img className="TrimestreItem__expandir" src={borrar} alt="expandir" />
                </div>
            </div>
        </div>
    )
}

export default CursoItemDocente
