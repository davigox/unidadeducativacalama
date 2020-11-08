import React, { useState } from 'react';
import { db } from '../firebase';

import './styles/CrearContenido.css';
import youtubeico from '../images/youtube-ico.svg'
import videoico from '../images/video-ico.svg'
import pdfico from '../images/pdf-ico.svg'
const CrearContenido = (props) => {
    const [contenido, setContenido] = useState({
        titulo: "",
        idCurso: "",
        idDocente: "",
        docente: "",
        enlace: "",
        visible: true,
        tipo: "",
    })
    const [state, setState] = useState({
        isCliked: false,
        youtube: false,
        video: false,
        pdf: false,
    })
    const handleClick = (e) => {
        const newState = {
            isCliked: false,
            youtube: false,
            video: false,
            pdf: false,
        }
        setState({
            ...newState,
            [e.target.name]: true,
            isCliked: !state.isCliked
        })
        setContenido({
            titulo: "",
            idCurso: props.idCurso,
            enlace: "",
            visible: true,
            docente: props.getUsuario().displayName,
            idDocente: props.getUsuario().uid,
            tipo: e.target.name,
        })

    }
    const handleChange = e => {
        setContenido({
            ...contenido,
            [e.target.name]: e.target.value
        })

    }
    const reformarEnlace = (enlace) => {
        const link = enlace.split("/");
        const prefijo = "https://www.youtube.com/embed/"
        return prefijo + link[3]
    }
    const addContenido = async (contenido) => {
        try {

            await db.collection('contenidos').doc().set({
                ...contenido,
                enlace: reformarEnlace(contenido.enlace)
            })
            setContenido({
                titulo: "",
                idCurso: "",
                idDocente: "",
                docente: "",
                enlace: "",
                visible: true,
                tipo: "",
            })
            console.log('contenido agregado')
        }
        catch (error) {
            console.log('error', error.message)
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
        addContenido(contenido)
    }
    const handleLogin = () => {

    }
    return (
        <div className="CrearContenido">
            <div className="crearCurso__header ">
                <h3 className="crearCurso__text">
                    Mis Contenidos
                    </h3>
                <img name="youtube" onClick={handleClick} className="crearCurso__img" src={youtubeico} alt="mas" />
                <img name="video" onClick={handleClick} className="crearCurso__img" src={videoico} alt="mas" />
                <img name="pdf" onClick={handleClick} className="crearCurso__img" src={pdfico} alt="mas" />

            </div>
            <div className={state.youtube && state.isCliked ? "CrearContenido__centrado" : "CrearContenido__centrado hide"}>
                <form onSubmit={onSubmit} className="CrearContenido__form"  >

                    <label className="CrearContenido__form--label"> Titulo del Video de Youtube</label>
                    <input
                        id="nombre"
                        className="CrearContenido__form--input"
                        type="text"
                        name="titulo"
                        value={contenido.titulo}
                        onChange={handleChange}
                    />
                    <label className="CrearContenido__form--label"> Enlace del Video</label>
                    <input
                        id="nombre"
                        className="CrearContenido__form--input"
                        type="text"
                        name="enlace"
                        value={contenido.enlace}
                        onChange={handleChange}
                    />
                    <button onClick={handleLogin} id="signupButton" className="CrearContenido__form--button" >Publicar Video de youtube</button>
                </form>
            </div>

            <div className={state.video && state.isCliked ? "CrearContenido__centrado" : "CrearContenido__centrado hide"}>
                <form className="CrearContenido__form"  >
                    {/* onSubmit={onSubmit} */}
                    <label className="CrearContenido__form--label"> Titulo del Video</label>
                    <input
                        id="nombre"
                        className="CrearContenido__form--input"
                        type="text"
                        name="nombre"
                    // value={curso.nombre}
                    // onChange={handleChange}
                    />
                    <label className="CrearContenido__form--label"> Archivo</label>
                    <input
                        id="nombre"
                        className="CrearContenido__form--input"
                        type="text"
                        name="materia"
                    // value={curso.materia}
                    // onChange={handleChange}
                    />
                    <button onClick={handleLogin} id="signupButton" className="CrearContenido__form--button" >Publicar video</button>
                </form>
            </div>

            <div className={state.pdf && state.isCliked ? "CrearContenido__centrado" : "CrearContenido__centrado hide"}>
                <form className="CrearContenido__form"  >
                    {/* onSubmit={onSubmit} */}
                    <label className="CrearContenido__form--label"> Titulo del Documento</label>
                    <input
                        id="nombre"
                        className="CrearContenido__form--input"
                        type="text"
                        name="nombre"
                    // value={curso.nombre}
                    // onChange={handleChange}
                    />
                    <label className="CrearContenido__form--label"> Archivo</label>
                    <input
                        id="nombre"
                        className="CrearContenido__form--input"
                        type="text"
                        name="materia"
                    // value={curso.materia}
                    // onChange={handleChange}
                    />
                    <button onClick={handleLogin} id="signupButton" className="CrearContenido__form--button" >Publicar Documento Pdf</button>
                </form>
            </div>
        </div>
    )
}
export default CrearContenido
