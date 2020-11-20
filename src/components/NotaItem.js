import React, { useState } from 'react';
import * as firebase from 'firebase/app';

import { db } from '../firebase';
import borrar from '../images/borrar.svg';
import user from '../images/user.svg'
import './styles/NotaItem.css'
import { useContext } from 'react';
import { MyContext } from '../MyProvider';

const NotaItem = (props) => {
    const {usuarioLogeado} = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        nota: props.nota,
    })
    const [contenido, setContenido] = useState({
        nota: props.nota,
    })
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
            if (state.nota > -1 && state.nota < 101) {
                if (window.confirm(`Seguro que quiere calificar con ${state.nota} la Nota de ${props.nombre}?`)) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    const participacionesRef = db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(props.idUsuario);
                    const notaRef = db.collection('notasCursos').doc(props.idCurso).collection('notas').doc(props.idNota)
                    return db.runTransaction(transaction => {
                        return transaction.get(participacionesRef).then(res => {
                            if (!res.exists) {
                                console.log('Documento no existe')
                            }
                            let newNotas = res.data().notas + 1;
                            let oldNotaTotal = res.data().promedioNotas * res.data().notas
                            let newPromedioNotas = (oldNotaTotal + parseInt(state.nota)) / newNotas

                            transaction.update(participacionesRef, {
                                notas: newNotas,
                                promedioNotas: newPromedioNotas
                            })
                            transaction.update(notaRef, {
                                nota: parseInt(state.nota),
                                calificado: true,
                            })
                            window.alert('Nota calificada correctamente')
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

                    // await db.collection('notasCursos').doc(props.idCurso).collection('notas').doc(props.idNota).update({
                    //     nota: parseInt(state.nota),
                    // })
                }
            } else {
                window.alert('La calificación no es validad, intente nuevamente')
            }
        }
    }
    const borrarNota = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR la Nota: ${props.mensaje} de ${props.nombre}?`)) {
                await db.collection('notasCursos').doc(props.idCurso).collection('notas').doc(props.idNota).delete();
                await db.collection('contenidos').doc(props.idContenido).collection('participaciones').doc(props.idUsuario).update({
                    notas: firebase.firestore.FieldValue.increment(-1)
                })
                window.alert(`Se elimino ${props.mensaje}`)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="NotaItem">
            <div className="NotaItem__header">
                <div className="NotaItem__ico">
                    {/* <img src={user} alt="user" /> */}
                    N{props.index}
                </div>
                <div className="NotaItem__usuario">
                    <div className="NotaItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="NotaItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="NotaItem__body">
                {props.mensaje}
            </div>
            <div className="NotaItem__footer">
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
                            <button onClick={actualizarNota} className="contenidoItem__button" disabled={state.loading}>
                                {!state.loading && <div>calificar</div>}
                                {state.loading && <div className="spinner"></div>}
                            </button>
                        }
                    </>
                }
                {/* <div
                    onClick={borrarNota}
                    className="NotaItem__borrar">
                    <img src={borrar} alt="borrar" />
                </div> */}
            </div>
        </div>
    )
}

export default NotaItem
