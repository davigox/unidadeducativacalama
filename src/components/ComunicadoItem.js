import React, { useState } from 'react';
import { useContext } from 'react';
import { db } from '../firebase';
import { MyContext } from '../MyProvider';

import guardar from '../images/guardar.svg';
import eliminar from '../images/borrar.svg';

const ComunicadoItem = (props) => {
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
            await db.collection('comunicados').doc(props.idComunicado).update({
                titulo: state.titulo,
                descripcion: state.descripcion,
                enlace: state.enlace,
            })
            setState({
                ...state,
                loading: false,
                error: false,
            })
            window.alert('Comunicado Actualizado correctamente')
        } else {
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
            if (window.confirm('Seguro que quiere eliminar el comunicado?')) {
                await db.collection('comunicados').doc(props.idComunicado).delete();
                window.alert('Comunicado Eliminado Correctamente')
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
        <div className="ComunicadoItem">
            {
                usuarioLogeado.rol === "administrador" &&
                <div className="ComunicadoItem__div">
                    <label className="ComunicadoItem__label">
                        Título:
                    </label>
                    <input
                        className="ComunicadoItem__input"
                        type="text"
                        name="titulo"
                        value={state.titulo}
                        onChange={handleChange}
                    />
                    <label className="ComunicadoItem__label">
                        Descripción:
                    </label>
                    <input
                        className="ComunicadoItem__input"
                        type="text"
                        name="descripcion"
                        value={state.descripcion}
                        onChange={handleChange}
                    />
                    <label className="ComunicadoItem__label">
                        Enlace:
                    </label>
                    <input
                        className="ComunicadoItem__input"
                        type="text"
                        name="enlace"
                        value={state.enlace}
                        onChange={handleChange}
                    />
                    <div className="ComunicadoItem__buttons">
                        <button onClick={handleSave} className="ComunicadoItem__button" disabled={state.loading}>
                            {!state.loading && <img src={guardar} alt="img" />}
                            {state.loading && <div className="spinner"></div>}
                        </button>
                        <button onClick={handleDelete} className="ComunicadoItem__button" disabled={state.loading}>
                            {!state.loading && <img src={eliminar} alt="img" />}
                            {state.loading && <div className="spinner"></div>}
                        </button>
                    </div>
                </div>
            }
            {
                usuarioLogeado.rol !== 'administrador' &&
                <>
                    <div className="ComunicadoItem__titulo">
                        {props.titulo}
                    </div>

                    <div className="ComunicadoItem__descripción">
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

export default ComunicadoItem
