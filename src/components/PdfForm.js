import React from 'react'
import { useState, useContext } from 'react'
import { db } from '../firebase'
import { MyContext } from '../MyProvider'

import './styles/PdfForm.css'

import enviar from '../images/enviar.svg'

const PdfForm = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        loading: false,
        titulo: '',
        descripcion: '',
        enlace: '',
        idUsuario: '',
        idCurso: '',
        idTrimestre: '',
        nombre: '',
        error: false,
        mensaje: ''
    });
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
                setState({
                    ...state,
                    loading: true,
                })
                await db.collection('contenidos').doc().set({
                    idTrimestre: props.idTrimestre,
                    idCurso: props.idCurso,
                    idUsuario: usuarioLogeado.uid,
                    nombre: props.nombre,
                    titulo: state.titulo,
                    descripcion: state.descripcion,
                    tipo: 'drive',
                    estado: true,
                    enlace: enlace,
                    materia: props.materia,
                    fecha: new Date(),
                })
                console.log('Contenido creado correctamente')
                setState({
                    ...state,
                    loading: false,
                    titulo: '',
                    enlace: '',
                    descripcion: '',
                    idCurso: '',
                    idUsuario: '',
                    idTrimestre: '',
                    nombre: '',
                    error: false,
                    mensaje: ''
                })
                window.alert('Contenido creado correctamente');
                props.ocultarForm()
            } else {
                setState({
                    ...state,
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
            crearContenido()
        } else {
            setState({
                ...state,
                mensaje: 'Llena los campos',
                error: true
            })
        }
    }
    return (
        <div className="PdfForm">
            <div className="PdfForm__header">
                <div className="PdfForm__titulo">
                    Envía un archivo de Google Drive
                    </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="PdfForm__form"
            >
                <label className="PdfForm__label">
                    Título del archivo:
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
                    id="signupButton" className="PdfForm__button"
                    disabled={state.loading}
                >
                    {!state.loading && <img src={enviar} alt="enviar" />}
                    {state.loading && <div className="spinner"></div>}
                </button>
            </form>
            {state.error && (<h4 className="PdfForm__error">{state.mensaje}</h4>)}
        </div>
    )
}

export default PdfForm
