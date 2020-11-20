import React from 'react';
import { useState } from 'react';

import videoYoutube from '../images/videoYoutube.svg';
import drive from '../images/drive.svg';
import expandir from '../images/expandir.svg';
import classroom from '../images/classroom.svg';
import lista from '../images/lista.svg';
import reunion_zoom from '../images/reunion_zoom.svg';
import cuestionario from '../images/cuestionario.svg';
import borrar from '../images/borrar.svg';
import grupo_whatsapp from '../images/grupo_whatsapp.svg';
import ContenidosList from './ContenidosList';

import './styles/TrimestreItem.css';
import YoutubeForm from './YoutubeForm';
import { db } from '../firebase';
import PdfForm from './PdfForm';
import WhatsappForm from './WhatsappForm';
import { Link } from 'react-router-dom';
import ZoomForm from './ZoomForm';
import ClassroomForm from './ClassroomForm';

const TrimestreItem = (props) => {
    const [state, setState] = useState({
        contenidos: false,
        pdfForm: false,
        youtubeForm: false,
        whatsappForm: false,
        zoomForm: false,
        classroomForm: false,
    })
    const youtubeForm = () => {
        setState({
            ...state,
            contenidos: false,
            pdfForm: false,
            youtubeForm: !state.youtubeForm,
            whatsappForm: false,
            zoomForm: false,
            classroomForm: false,
        })
    }
    const pdfForm = () => {
        setState({
            ...state,
            pdfForm: !state.pdfForm,
            contenidos: false,
            youtubeForm: false,
            whatsappForm: false,
            zoomForm: false,
            classroomForm: false,
        })
    }
    const ocultarForm = () => {
        setState({
            ...state,
            pdfForm: false,
            contenidos: true,
            youtubeForm: false,
            whatsappForm: false,
            zoomForm: false,
            classroomForm: false,
        })
    }
    const whatsappForm = () => {
        setState({
            ...state,
            pdfForm: false,
            contenidos: false,
            youtubeForm: false,
            whatsappForm:  !state.whatsappForm,
            zoomForm: false,
            classroomForm: false,
        })
    }
    const zoomForm = () => {
        setState({
            ...state,
            pdfForm: false,
            contenidos: false,
            youtubeForm: false,
            whatsappForm: false,
            zoomForm: !state.zoomForm,
            classroomForm: false,
        })
    }
    const classroomForm = () => {
        setState({
            ...state,
            pdfForm: false,
            contenidos: false,
            youtubeForm: false,
            whatsappForm: false,
            zoomForm: false,
            classroomForm: !state.classroomForm,
        })
    }
    const verContenidos = () => {
        setState({
            ...state,
            pdfForm: false,
            youtubeForm: false,
            whatsappForm: false,
            contenidos: !state.contenidos,
            zoomForm: false,
            classroomForm: false,
        })
    }
    const eliminarTrimestre = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR: ${props.titulo} y todos sus contenidos?`)) {
                await db.collection('trimestres').doc(props.idTrimestre).delete();

                await db.collectionGroup('participaciones').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('contenidos').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('respuestas del Contenido elminado correctamente')
                await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('preguntas del Contenido elminado correctamente')
                await db.collection('notasCursos').doc(props.idCurso).collection('notas').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('notas del Contenido elminado correctamente')
                await db.collection('aportesCursos').doc(props.idCurso).collection('aportes').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('aportes del Contenido elminado correctamente')
                await db.collection('tareasCursos').doc(props.idCurso).collection('tareas').where('idTrimestre', '==', props.idTrimestre).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                window.alert(`Los Contenidos de ${props.titulo} fueron Eliminados`);
                window.alert(`Se elimino ${props.titulo}`)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="TrimestreItem">
            <div className="TrimestreItem__head">
                <div className="TrimestreItem__titulo">
                    {props.titulo}
                </div>
                <div className="TrimestreItem__opciones">
                    <Link className="TrimestreItem__img" to={`/estudianteslist/${props.idCurso}/${props.idTrimestre}`}>
                        <img src={lista} alt="lista" />
                    </Link>
                    <Link className="TrimestreItem__img" to={`/nuevocuestionario/${props.idCurso}/${props.idTrimestre}`}>
                        <img src={cuestionario} alt="lista" />
                    </Link>
                    <div
                        onClick={classroomForm}
                        className=""
                    >
                        <img className="TrimestreItem__expandir" src={classroom} alt="expandir" />
                    </div>
                    <div
                        onClick={zoomForm}
                        className=""
                    >
                        <img className="TrimestreItem__expandir" src={reunion_zoom} alt="expandir" />
                    </div>
                    <div
                        onClick={whatsappForm}
                        className=""
                    >
                        <img className="TrimestreItem__expandir" src={grupo_whatsapp} alt="expandir" />
                    </div>
                    <div
                        onClick={pdfForm}
                        className=""
                    >
                        <img className="TrimestreItem__expandir" src={drive} alt="expandir" />
                    </div>
                    <div
                        onClick={youtubeForm}
                        className=""
                    >
                        <img className="TrimestreItem__expandir" src={videoYoutube} alt="expandir" />
                    </div>
                    <div
                        onClick={verContenidos}
                        className="TrimestreItem__img"
                    >
                        <img className="TrimestreItem__expandir" src={expandir} alt="expandir" />
                    </div>
                    <div
                        onClick={eliminarTrimestre}
                        className="TrimestreItem__img"
                    >
                        <img className="TrimestreItem__expandir" src={borrar} alt="borrar" />
                    </div>
                </div>
            </div>
            <div className="TrimestreItem__contenido">
                {
                    state.contenidos &&
                    <ContenidosList
                        ponerVideo={props.ponerVideo}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        curso={props.curso}
                    />
                }
                {
                    state.youtubeForm &&
                    <YoutubeForm
                        ocultarForm={ocultarForm}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        materia={props.materia}
                        curso={props.curso}
                    />
                }
                {
                    state.pdfForm &&
                    <PdfForm
                        ocultarForm={ocultarForm}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        materia={props.materia}
                        curso={props.curso}
                    />
                }
                {
                    state.whatsappForm &&
                    <WhatsappForm
                        ocultarForm={ocultarForm}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        materia={props.materia}
                        curso={props.curso}
                    />
                }
                {
                    state.zoomForm &&
                    <ZoomForm
                        ocultarForm={ocultarForm}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        materia={props.materia}
                        curso={props.curso}
                    />
                }
                {
                    state.classroomForm &&
                    <ClassroomForm
                        ocultarForm={ocultarForm}
                        idTrimestre={props.idTrimestre}
                        idCurso={props.idCurso}
                        idUsuario={props.idUsuario}
                        nombre={props.nombre}
                        materia={props.materia}
                        curso={props.curso}
                    />
                }
            </div>
        </div>
    )
}

export default TrimestreItem
