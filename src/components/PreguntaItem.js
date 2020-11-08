import React, { useState } from 'react';

import RespuestasList from './RespuestasList';
import RespuestaForm from './RespuestaForm';
import * as firebase from 'firebase/app';
import './styles/PreguntaItem.css';

import respuestas from '../images/respuestas.svg';
import user from '../images/user.svg';
import borrar from '../images/borrar.svg';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const PreguntaItem = (props) => {
    const [state, setState] = useState({
        loading: false,
        respuestas: false,
        nota: props.nota,
    })
    const [contenido, setContenido] = useState({
        nota: props.nota,
    })
    const handleClick = () => {
        setState({
            ...state,
            respuestas: !state.respuestas,
        })
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }
    const actualizarNota = async() => {
        if( contenido.nota === state.nota ){
            console.log('no cambio nada y no hacer nada')
        }
        else{
            if(state.nota > -1 && state.nota < 101){
                if(window.confirm(`Seguro que quiere calificar con ${state.nota} la pregunta de ${props.nombre}?`)){
                    setState({
                        ...state,
                        loading: true,
                    })
                    const participacionesRef = db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(props.idUsuario);
                    const preguntaRef = db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').doc(props.idPregunta)
                    return db.runTransaction(transaction => {
                        return transaction.get(participacionesRef).then(res => {
                            if(!res.exists){
                                console.log('Documento no existe')
                            }
                            let newPreguntas = res.data().preguntas + 1;
                            let oldNotaTotal = res.data().promedioPreguntas * res.data().preguntas
                            let newPromedioPreguntas = (oldNotaTotal + parseInt(state.nota)) / newPreguntas

                            transaction.update(participacionesRef, {
                                preguntas: newPreguntas,
                                promedioPreguntas: newPromedioPreguntas
                            })
                            transaction.update(preguntaRef, {
                                nota: parseInt(state.nota),
                                calificado: true,
                            })
                            window.alert('Pregunta calificada correctamente')
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
                    // await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').doc(props.idPregunta).update({
                    //     nota: parseInt(state.nota),
                    // })
                }
            }else{
                window.alert('La calificación no es validad, intente nuevamente')
            }
        }
    }
    const borrarPregunta = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR la pregunta: ${props.mensaje}?. Esto tambien borrará todas las respuestas a la pregunta`)) {

                db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').where('idPregunta', '==', props.idPregunta).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    })
                })
                window.alert(`Las respuestas de ${props.mensaje} fueron Eliminados`)
                await db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').doc(props.idPregunta).delete();
                window.alert(`Se elimino ${props.mensaje}`)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="PreguntaItem">
            <div className="PreguntaItem__header">
                <div className="PreguntaItem__ico">
                    {/* <img src={user} alt="user" /> */}
                    P{props.index}
                </div>
                <div className="PreguntaItem__usuario">
                    <div className="PreguntaItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="PreguntaItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="PreguntaItem__body">
                {props.mensaje}
            </div>
            <div className="PreguntaItem__footer">
                {
                    props.calificado &&
                    <div className="PreguntaItem__footer__calificacion">
                    Calificado con :
                        {state.nota}
                    </div>
                }
                {
                    !props.calificado && 
                    <>
                    calificación sobre 100:
                        <input
                            className="contenidoItem__input"
                            type="number"
                            min="10"
                            max="100"
                            name="nota"
                            value={state.nota}
                            onChange={handleChange}
                        />
                    <button onClick={actualizarNota} className="contenidoItem__button" disabled={state.loading}>
                        {!state.loading && <div>calificar</div>}
                        {state.loading && <div className="spinner"></div>}
                    </button>
                    </>

                }
                {/* <div
                    onClick={borrarPregunta}
                    className="PreguntaItem__borrar">
                    <img src={borrar} alt="borrar" />
                </div> */}
                <div onClick={handleClick} className="PreguntaItem__respuestas">
                    respuestas<img src={respuestas} alt="respuestas" />
                </div>
            </div>
            <RespuestaForm
                idPregunta={props.idPregunta}
                idContenido={props.idContenido}
                idCurso={props.idCurso}
                idTrimestre={props.idTrimestre}
                idUsuario={props.idUsuario}
                mensaje={props.mensaje}
                materia={props.materia}
            />
            {
                state.respuestas &&
                <RespuestasList
                    idPregunta={props.idPregunta}
                    idContenido={props.idContenido}
                    idCurso={props.idCurso}
                    idTrimestre={props.idTrimestre}

                />
            }
        </div>
    )
}

export default PreguntaItem
