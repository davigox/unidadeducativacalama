import React, { useState }from 'react';

import './styles/RespuestaItem.css';

import respuestas from '../images/respuestas.svg';
import user_black from '../images/user_black.svg';
import borrar from '../images/borrar.svg';
import * as firebase from 'firebase/app';

import { db } from '../firebase';
import { Link } from 'react-router-dom';

const RespuestaItem = (props) => {
    const [state, setState] = useState({
        loading: false,
        nota: props.nota,
    })
    const [contenido, setContenido] = useState({
        nota: props.nota,
    })
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
                if(window.confirm(`Seguro que quiere calificar con ${state.nota} la respuesta de ${props.nombre}?`)){
                    setState({
                        ...state,
                        loading: true,
                    })
                    const participacionesRef = db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(props.idUsuario);
                    const respuestaRef = db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').doc(props.idRespuesta)
                    return db.runTransaction(transaction => {
                        return transaction.get(participacionesRef).then(res => {
                            if(!res.exists){
                                console.log('Documento no existe')
                            }
                            let newRespuestas = res.data().respuestas + 1;
                            let oldNotaTotal = res.data().promedioRespuestas * res.data().respuestas
                            let newPromedioRespuestas = (oldNotaTotal + parseInt(state.nota)) / newRespuestas

                            transaction.update(participacionesRef, {
                                respuestas: newRespuestas,
                                promedioRespuestas: newPromedioRespuestas
                            })
                            transaction.update(respuestaRef, {
                                nota: parseInt(state.nota),
                                calificado: true,
                            })
                            window.alert('Respuesta calificada correctamente')
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

                    // await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').doc(props.idRespuesta).update({
                    //     nota: parseInt(state.nota),
                    // })
                    
                }
            }else{
                window.alert('La calificación no es validad, intente nuevamente')
            }
        }
    }
    const borrarRespuesta = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR la respuesta: ${props.mensaje} de ${props.nombre}?`)) {
                await db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').doc(props.idRespuesta).delete();
                window.alert(`Se elimino ${props.mensaje}`)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="RespuestaItem">
            <div className="RespuestaItem__header">
                <div className="RespuestaItem__ico">
                    {/* <img src={user_black} alt="user" /> */}
                    R{props.index}
                </div>
                <div className="RespuestaItem__usuario">
                    <div className="RespuestaItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="RespuestaItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="RespuestaItem__body">
                {props.mensaje}
            </div>
            <div className="RespuestaItem__footer">
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
                    onClick={borrarRespuesta}
                    className="RespuestaItem__borrar">
                    <img src={borrar} alt="borrar" />
                </div> */}
            </div>
        </div>
    )
}

export default RespuestaItem
