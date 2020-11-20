import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../firebase';

import user from '../images/user.svg';
import ver from '../images/ver.svg';
import play from '../images/play.svg';
import './styles/TareaItem.css';
import { useContext } from 'react';
import { MyContext } from '../MyProvider';

const TareaItem = (props) => {
    const {usuarioLogeado} = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        nota: props.nota,
    })
    const [contenido, setContenido] = useState({
        nota: props.nota,
    })
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        })
    }
    const actualizarNota = async () => {
        if (contenido.nota === state.nota) {
            console.log('no cambio nada y no hacer nada')
        }
        else {
            if (state.nota > 0 && state.nota < 101) {
                if (window.confirm(`Seguro que quiere calificar con ${state.nota} la tarea de ${props.nombre}?`)) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    const participacionesRef = db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(props.idUsuario);
                    const tareasRef = db.collection('tareasCursos').doc(props.idCurso).collection('tareas').doc(props.idTarea)
                    return db.runTransaction(transaction => {
                        return transaction.get(participacionesRef).then(res => {
                            if (!res.exists) {
                                console.log('Documento no existe')
                            }
                            let newTareas = res.data().tareas + 1;
                            let oldNotaTotal = res.data().promedioTareas * res.data().tareas
                            let newPromedioTareas = (oldNotaTotal + parseInt(state.nota)) / newTareas

                            transaction.update(participacionesRef, {
                                tareas: newTareas,
                                promedioTareas: newPromedioTareas
                            })
                            transaction.update(tareasRef, {
                                nota: parseInt(state.nota),
                                calificado: true,
                            })
                            window.alert('Tarea calificada correctamente')
                            setContenido({
                                ...contenido,
                                nota: state.nota,
                            })
                            setState({
                                ...state,
                                loading: false,
                            })
                        })
                    })
                    // await db.collection('tareasCursos').doc(props.idCurso).collection('tareas').doc(props.idTarea).update({
                    //     nota: parseInt(state.nota),
                    // })
                }
            } else {
                window.alert('La calificación no es validad, intente nuevamente')
            }
        }
    }
    const eliminarContenido = async (e) => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR el Contenido: ${props.titulo} con enlace: ${props.enlace}`)) {
                await db.collection('contenidos').doc(props.idContenido).delete();
                console.log('Contenido eliminado')
                window.alert('Contenido elminado correctamente')
            } else {

            }
        } catch (error) {
            console.log(error)
        }
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
                {
                    !props.calificado &&
                    <>
                        calificación sobre 100:
                        <input
                            className="input__item"
                            type="number"
                            min="10"
                            max="100"
                            name="nota"
                            value={state.nota}
                            onChange={handleChange}
                        />
                        {
                            usuarioLogeado.trimestres !== 'deshabilitado' &&
                            <button onClick={actualizarNota} className="TareaItem__button" disabled={state.loading}>
                                {!state.loading && <div>calificar</div>}
                                {state.loading && <div className="spinner"></div>}
                            </button>
                        }
                    </>
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
