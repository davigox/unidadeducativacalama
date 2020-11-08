import React, { useState } from 'react'
import { useContext } from 'react'
import { db } from '../firebase'
import { MyContext } from '../MyProvider'

import guardar from '../images/guardar.svg';
import eliminar from '../images/borrar.svg';

const HorarioItem = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        titulo: props.titulo,
        descripcion: props.descripcion,
        enlace: props.enlace,
        loading: false,
        mensaje: '',
        error: false,
    })
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const guardarCambios = async () => {
        if (window.confirm('Seguro que quiere guardar los cambios que hiciste?')) {
            await db.collection('horarios').doc(props.idHorario).update({
                titulo: state.titulo,
                descripcion: state.descripcion,
                enlace: state.enlace,
            })
            setState({
                ...state,
                loading: false,
                error: false,
            })
            window.alert('Horario Actualizado correctamente')
        }else{
            setState({
                ...state,
                loading: false,
                error: false,
            })
        }
    }
    const handleSave = (e) => {
        // e.preventDefault();
        if (state.titulo.trim().length > 0 &&
            state.enlace.trim().length > 0) {
            setState({
                ...state,
                loading: true,
                error: false,
            })
            guardarCambios()

        } else {
            setState({
                ...state,
                loading: false,
                mensaje: 'Llena los campos',
                error: true
            })
        }
    }
    const handleDelete = async () => {
        try {
            setState({
                ...state,
                loading: true,
                error: false,
            })
            if (window.confirm('Seguro que quiere eliminar el horario?')) {
                await db.collection('horarios').doc(props.idHorario).delete();
                window.alert('Horario Eliminado Correctamente')
                setState({
                    ...state,
                    loading: false,
                    error: false,
                })  
            }else{
                setState({
                    ...state,
                    loading: false,
                    error: false,
                })
            }
        } catch (error) {
            console.log(error.message)
            setState({
                ...state,
                mensaje: error.message,
                loading: false,
                error: true,
            })
        }
    }
    return (
        <div className="HorarioItem">
            {
                usuarioLogeado.rol === "administrador" &&
                <div className="HorarioItem__div">
                    <label className="HorarioItem__label">
                        Título:
                    </label>
                    <input
                        className="HorarioItem__input"
                        type="text"
                        name="titulo"
                        value={state.titulo}
                        onChange={handleChange}
                    />
                    <label className="HorarioItem__label">
                        Descripción:
                    </label>
                    <input
                        className="HorarioItem__input"
                        type="text"
                        name="descripcion"
                        value={state.descripcion}
                        onChange={handleChange}
                    />
                    <label className="HorarioItem__label">
                        Enlace:
                    </label>
                    <input
                        className="HorarioItem__input"
                        type="text"
                        name="enlace"
                        value={state.enlace}
                        onChange={handleChange}
                    />
                    <div className="HorarioItem__buttons">
                        <button onClick={handleSave} className="HorarioItem__button" disabled={state.loading}>

                            {!state.loading && <img src={guardar} alt="img" />}
                            {state.loading && <div className="spinner"></div>}
                        </button>
                        <button onClick={handleDelete} className="HorarioItem__button" disabled={state.loading}>
                            {!state.loading && <img src={eliminar} alt="img" />}
                            {state.loading && <div className="spinner"></div>}
                        </button>
                    </div>
                </div>
            }
            {
                usuarioLogeado.rol !== 'administrador' &&
                <>
                    <div className="HorarioItem__titulo">
                        {props.titulo}
                    </div>

                    <div className="HorarioItem__descripción">
                        {props.descripcion}
                    </div>
                </>
            }
            <iframe src={`${props.enlace}`}
                allowFullScreen={true}
            ></iframe>
        </div>
    )
}

export default HorarioItem
