import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { db } from '../firebase';

import enviar from '../images/enviar.svg'
import { MyContext } from '../MyProvider';
import ComunicadosList from './ComunicadosList';

const Comunicado = () => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        data: [],
        titulo: '',
        loading: false,
        enlace: '',
        descripcion: '',
        error: false,
        mensaje: '',
    });
    useEffect(() => {
        console.log('Cargar datos')
    }, [])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const crearContenido = async () => {
        try {
            const link = state.enlace
            const newLink = link.split('/')
            const enlace = `https://drive.google.com/file/d/${newLink[5]}/preview`
            if (window.confirm(`Se creará con título: ${state.titulo} y enlace: ${enlace}`)) {
                await db.collection('comunicados').doc().set({
                    titulo: state.titulo,
                    descripcion: state.descripcion,
                    tipo: 'comunicado',
                    enlace: enlace,
                    fecha: new Date(),
                })
                console.log('Contenido creado correctamente')
                setState({
                    ...state,
                    titulo: '',
                    enlace: '',
                    descripcion: '',
                    loading: false,
                    error: false,
                    mensaje: ''
                })
                window.alert('Contenido compartido correctamente');
            } else {
                setState({
                    ...state,
                    error: false,
                    loading: false,
                })
            }

        } catch (error) {
            console.log(error)
            setState({
                ...state,
                loading: false,
                error: true,
                mensaje: 'Error al crear el contenido intente nuevamente',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.titulo.trim().length > 0 &&
            state.enlace.trim().length > 0) {
            setState({
                ...state,
                loading: true,
            })
            crearContenido()

        } else {
            setState({
                ...state,
                loading: false,
                mensaje: 'Llena los campos',
                error: true
            })
        }
    }
    return (
        <>
            {
                usuarioLogeado.rol === "administrador" &&
                <div className="PdfForm">
                    <div className="PdfForm__header">
                        <div className="PdfForm__titulo">
                            Comparte un archivo pdf de Drive
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="PdfForm__form"
                    >
                        <label className="PdfForm__label">
                            Título del Comunicado:
                    </label>
                        <input
                            className="PdfForm__input"
                            type="text"
                            name="titulo"
                            value={state.titulo}
                            onChange={handleChange}
                        />
                        <label className="PdfForm__label">
                            Descripción del archivo:
                    </label>
                        <input
                            className="PdfForm__input"
                            type="text"
                            name="descripcion"
                            value={state.descripcion}
                            onChange={handleChange}
                        />
                        <label className="PdfForm__label">
                            Enlace de Drive :
                    </label>
                        <input
                            className="PdfForm__input"
                            type="text"
                            name="enlace"
                            value={state.enlace}
                            onChange={handleChange}
                        />
                        <button
                            id="signupButton" className="PdfForm__button" disabled={state.loading}
                        >
                            {!state.loading && <img src={enviar} alt="enviar" />}
                            {state.loading && <div className="spinner"></div>}
                        </button>
                    </form>
                    {state.error && (<h4 className="PdfForm__error">{state.mensaje}</h4>)}
                </div>
            }
            <ComunicadosList

            />
        </>
    )
}

export default Comunicado
