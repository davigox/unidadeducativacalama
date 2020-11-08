import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

import './styles/CursoItem.css';
import editar from '../images/editar.svg';
import lista from '../images/lista.svg';
import borrar from '../images/borrar.svg';
import curso from '../images/curso.svg';


const CursoItem = (props) => {
    const handleClick = e => {
        // this.props.deleteCourse(this.props.id)
        // console.log(this.props.id)
    }
    const eliminarCurso = async (e) => {
        try{
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
            }else{
    
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className={`cursoItem`}>
            <div className="cursoItem__body">
                <div className={`cursoItem__ico ${props.curso}`}>
                    <img src={curso} alt="img"/>
                </div>
                <div className="cursoItem__datos">
                    <h3 className="cursoItem__text">
                        <div className="cursoItem__text1">Curso: </div>
                        <div className="cursoItem__text2">{props.curso}</div>
                    </h3>
                    <h3 className="cursoItem__text">
                        <div className="cursoItem__text1">Materia: </div>
                        <div className="cursoItem__text2">{props.materia}</div>
                    </h3>
                    <h3 className="cursoItem__text">
                        <div className="cursoItem__text1">Docente: </div>
                        <div className="cursoItem__text2">{props.docente}</div>
                    </h3>
                </div>
            </div>
            <div className="cursoItem__opciones">
                
                
                <div className="cursoItem__img">
                <Link to={`/estudiantescursolist/${props.idCurso}/${props.codigo}`}>
                    <img  src={lista} alt="lista" />
                </Link>
                </div>
                <div className="cursoItem__img">
                <Link to={`/${props.idUsuario}/${props.idCurso}/cursoedit`}>
                    <img  src={editar} alt="editar" />
                </Link>
                </div>
                <div className="cursoItem__img">
                    <img src={borrar} alt="borrar"
                        onClick={eliminarCurso}
                    />
                </div>
            </div>
        </div>

    )
}
export default CursoItem;