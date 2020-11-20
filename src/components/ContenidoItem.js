import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

import editar from '../images/editar.svg';
import cuestionario from '../images/cuestionario.svg';
import borrar from '../images/borrar.svg';
import guardar from '../images/guardar.svg';
import whatsapp from '../images/grupo_whatsapp.svg';
import drive from '../images/drive.svg';
import youtube from '../images/youtube.svg';
import classroom from '../images/classroom.svg';
import reunion_zoom from '../images/reunion_zoom.svg';
import ver from '../images/ver.svg';

// CSS
import './styles/ContenidoItem.css';
import { useState } from 'react';

const ContenidoItem = (props) => {
    const [state, setState] = useState({
        titulo: props.titulo,
        descripcion: props.descripcion,
        enlace: props.enlace,
        estado: props.estado,
    })
    const [contenido, setContenido] = useState({
        titulo: props.titulo,
        descripcion: props.descripcion,
        enlace: props.enlace,
    })
    const handleClick = () => {
        props.ponerVideo(props.enlace, props.titulo, props.descripcion, props.idTrimestre, props.idContenido)
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const guardarCambiosContenido = async () => {
        if (props.tipo == 'whatsapp') {
            if (contenido.titulo === state.titulo && contenido.descripcion === state.descripcion && contenido.enlace === state.enlace) {
                console.log('no cambio nada y no hacer nada')
            }

            else {
                if (window.confirm('Seguro que quiere guardar los cambios que hiciste?')) {
                    await db.collection('contenidos').doc(props.idContenido).update({
                        titulo: state.titulo,
                        enlace: state.enlace,
                    })
                    setContenido({
                        ...contenido,
                        titulo: state.titulo,
                        enlace: state.enlace,
                    })
                    window.alert('Contenido guardado correctamente')
                }
            }
        } else {
            if (contenido.titulo === state.titulo && contenido.descripcion === state.descripcion && contenido.enlace === state.enlace) {
                console.log('no cambio nada y no hacer nada')
            }
            else {
                if (window.confirm('Seguro que quiere guardar los cambios que hiciste?')) {
                    await db.collection('contenidos').doc(props.idContenido).update({
                        titulo: state.titulo,
                        descripcion: state.descripcion,
                        enlace: state.enlace,
                    })
                    setContenido({
                        ...contenido,
                        titulo: state.titulo,
                        descripcion: state.descripcion,
                        enlace: state.enlace,
                    })
                    window.alert('Contenido guardado correctamente')
                }
            }
        }
    }
    const handleChecked = async (e) => {
        try {
            if (window.confirm('Quieres cambiar el estado de este formulario')) {
                await db.collection('contenidos').doc(props.idContenido).update({
                    estado: !state.estado,
                })
                setState({
                    ...state,
                    estado: !state.estado
                })
                if (!state.estado) {
                    window.alert('El contenido se cambio correctamente. Ahora los estudiante pueden entregar tareas al contenido')
                } else {
                    window.alert('El contenido se cambio correctamente. Ahora los estudiante NO pueden entregar tareas al contenido')
                }
            }
        } catch (error) {
            console.log(error.message)

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const eliminarContenido = async (e) => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR el Contenido: ${props.titulo} con enlace: ${props.enlace}`)) {
                await db.collection('contenidos').doc(props.idContenido).delete();

                await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').where('idContenido', '==', props.idContenido).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('respuestas del Contenido elminado correctamente')
                await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').where('idContenido', '==', props.idContenido).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('preguntas del Contenido elminado correctamente')
                await db.collection('notasCursos').doc(props.idCurso).collection('notas').where('idContenido', '==', props.idContenido).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('notas del Contenido elminado correctamente')
                await db.collection('aportesCursos').doc(props.idCurso).collection('aportes').where('idContenido', '==', props.idContenido).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('aportes del Contenido elminado correctamente')
                await db.collection('tareasCursos').doc(props.idCurso).collection('tareas').where('idContenido', '==', props.idContenido).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('tareas del Contenido elminado correctamente')
                await db.collection('contenidos').doc(props.idContenido).collection('participaciones').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                // window.alert('partcipaciones del Contenido elminado correctamente')

                window.alert('Contenido elminado correctamente')
            } else {

            }
        } catch (error) {
            console.log(error)
        }
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
                        <label className="contenidoItem__label">
                            Contenido : {props.index + 1}
                        </label>
                        <input
                            className="contenidoItem__text"
                            type="text"
                            name="titulo"
                            value={state.titulo}
                            onChange={handleChange}
                        />
                    </div>
                    {
                        (props.tipo !== 'whatsapp' && props.tipo !== 'zoom' && props.tipo !== 'classroom') &&
                        <div className="contenidoItem__row">
                            <label className="contenidoItem__label">
                                Descripción :
                                </label>
                            <input
                                className="contenidoItem__text"
                                type="text"
                                name="descripcion"
                                value={state.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                    }
                    {
                        props.tipo !== 'cuestionario' &&
                        <div className="contenidoItem__row">
                            <label className="contenidoItem__label">
                                Enlace :
                        </label>
                            <input
                                className="contenidoItem__text"
                                type="text"
                                name="enlace"
                                value={state.enlace}
                                onChange={handleChange}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="contenidoItem__opciones">
                {
                    (props.tipo !== 'whatsapp' && props.tipo !== 'zoom' && props.tipo !== 'classroom') &&
                    <div className="contenidoItem__img">
                        <input
                            type="checkbox"
                            name="estado"
                            checked={state.estado}
                            onChange={handleChecked}
                        />
                    </div>
                }
                <div className="contenidoItem__img">
                    <div
                        onClick={guardarCambiosContenido}
                    >
                        <img src={guardar} alt="guardar" />
                    </div>
                </div>
                <div className="contenidoItem__img">
                    <img src={borrar} alt="borrar"
                        onClick={eliminarContenido}
                    />
                </div>
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
                    (props.tipo == 'cuestionario') &&
                    <div className="contenidoItem__img">
                        <Link
                            to={`/cuestionario/${props.idContenido}/${props.idTrimestre}`}
                        >
                            <img src={ver} alt="editar" />
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default ContenidoItem
