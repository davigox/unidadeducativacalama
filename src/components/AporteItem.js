import React, { useState } from 'react';
import * as firebase from 'firebase/app';

import { db } from '../firebase';
import borrar from '../images/borrar.svg';
import user from '../images/user.svg';

import './styles/AporteItem.css';
import { useContext } from 'react';
import { MyContext } from '../MyProvider';

const AporteItem = (props) => {
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
            if (state.nota > 0 && state.nota < 101) {
                if (window.confirm(`Seguro que quiere calificar con ${state.nota} la Nota de ${props.nombre}?`)) {
                    setState({
                        ...state,
                        loading: true,
                    })
                    const participacionesRef = db.collection('trimestres').doc(props.idTrimestre).collection('participaciones').doc(props.idUsuario);
                    const aporteRef = db.collection('aportesCursos').doc(props.idCurso).collection('aportes').doc(props.idAporte)
                    return db.runTransaction(transaction => {
                        return transaction.get(participacionesRef).then(res => {
                            if(!res.exists){
                                console.log('Documento no existe')
                            }
                            let newAportes = res.data().aportes + 1;
                            let oldNotaTotal = res.data().promedioAportes * res.data().aportes
                            let newPromedioAportes = (oldNotaTotal + parseInt(state.nota)) / newAportes

                            transaction.update(participacionesRef, {
                                aportes: newAportes,
                                promedioAportes: newPromedioAportes
                            })
                            transaction.update(aporteRef, {
                                nota: parseInt(state.nota),
                                calificado: true,
                            })
                            window.alert('Aporte calificado correctamente')
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


                    // await db.collection('aportesCursos').doc(props.idCurso).collection('aportes').doc(props.idAporte).update({
                    //     nota: parseInt(state.nota),
                    // })
                }
            } else {
                window.alert('La calificación no es validad, intente nuevamente')
            }
        }
    }
    const borrarAporte = async () => {
        try {
            if (window.confirm(`Estas seguro de ELIMINAR el Aporte: ${props.mensaje} de ${props.nombre}?`)) {
                await db.collection('aportesCursos').doc(props.idCurso).collection('aportes').doc(props.idAporte).delete();
                window.alert(`Se elimino ${props.mensaje}`)
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="AporteItem">
            <div className="AporteItem__header">
                <div className="AporteItem__ico">
                    {/* <img src={user} alt="user" /> */}
                    A{props.index}
                </div>
                <div className="AporteItem__usuario">
                    <div className="AporteItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="AporteItem__fecha">
                        fecha
                    </div>
                </div>
            </div>
            <div className="AporteItem__body">
                {props.mensaje}
            </div>
            <div className="AporteItem__footer">
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
                            <button onClick={actualizarNota} className="contenidoItem__button">
                                {!state.loading && <div>calificar</div>}
                                {state.loading && <div className="spinner"></div>}
                            </button>
                        }
                    </>
                }
                {/* <div
                    onClick={borrarAporte}
                    className="AporteItem__borrar">
                    <img src={borrar} alt="borrar" />
                </div> */}
            </div>
        </div>
    )
}

export default AporteItem
