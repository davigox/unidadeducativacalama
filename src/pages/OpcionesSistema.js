import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

import guardar from '../images/guardar.svg'
import './styles/OpcionesSistema.css'

const OpcionesSistema = () => {
    const [state, setState] = useState({
        sesion: '',
        cuenta: '',
        trimestres: '',
    })
    const [contenido, setContenido] = useState({
        sesion: '',
        cuenta: '',
        trimestres: '',
    })
    const handleChangeForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const guardarCambiosContenido = async () => {
        if (contenido.sesion === state.sesion && contenido.cuenta === state.cuenta && contenido.trimestres === state.trimestres) {
            console.log('no cambio nada y no hacer nada')
        }
        else {
            if (window.confirm('Seguro que quiere guardar los cambios que hiciste?')) {
                await db.collection('sistema').doc('calama').update({
                    crearCuentas: state.cuenta,
                    iniciarSesion: state.sesion,
                    trimestres: state.trimestres,
                })
                setContenido({
                    ...contenido,
                    sesion: state.sesion,
                    cuenta: state.cuenta,
                    trimestres: state.trimestres,
                })
                window.alert('Cambios guardados correctamente')
            }
        }
    }
    useEffect(() => {
        const unsubscribe = db.collection('sistema').doc('calama').onSnapshot((querySnapshot) => {
            setState({
                ...state,
                sesion: querySnapshot.data().iniciarSesion,
                cuenta: querySnapshot.data().crearCuentas,
                trimestres: querySnapshot.data().trimestres,
            })
            setContenido({
                ...contenido,
                sesion: querySnapshot.data().iniciarSesion,
                cuenta: querySnapshot.data().crearCuentas,
                trimestres: querySnapshot.data().trimestres,
            })
            console.log("Trimestres cargados")
        })
        return unsubscribe
    }, [])
    return (
        <div className="OpcionesSistema">
            <div className="OpcionesSistema__titulo">
                Opciones de Sistema
            </div>
            <div className="OpcionesSistema__body">
                <div className="OpcionesSistema__row">
                    <div className="OpcionesSistema__texto">
                        Permitir inicio de sesión
                    </div>
                    <select
                        name="sesion"
                        className={`OpcionesSistema__input ${state.sesion}`}
                        onChange={handleChangeForm}
                        value={state.sesion}
                    >
                        <option value="habilitado">habilitado</option>
                        <option value="deshabilitado">deshabilitado</option>
                    </select>
                </div>
                <div className="OpcionesSistema__row">
                    <div className="OpcionesSistema__texto">
                        Permitir creación de cuentas
                    </div>
                    <select
                        name="cuenta"
                        className={`OpcionesSistema__input ${state.cuenta}`}
                        onChange={handleChangeForm}
                        value={state.cuenta}
                    >
                        <option value="habilitado">habilitado</option>
                        <option value="deshabilitado">deshabilitado</option>
                    </select>
                </div>
                <div className="OpcionesSistema__row">
                    <div className="OpcionesSistema__texto">
                        Permitir modificación de Notas trimestrales
                    </div>
                    <select
                        name="trimestres"
                        className={`OpcionesSistema__input ${state.trimestres}`}
                        onChange={handleChangeForm}
                        value={state.trimestres}
                    >
                        <option value="habilitado">habilitado</option>
                        <option value="deshabilitado">deshabilitado</option>
                    </select>
                </div>
                <div className="OpcionesSistema__row">
                        Guardar Cambios
                    <div className="OpcionesSistema__img" onClick={guardarCambiosContenido}>
                        <img src={guardar} alt="editar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpcionesSistema
