import React from 'react';
import { useState } from 'react';
import './styles/CrearCurso.css';
import mas from '../images/mas.svg'

function CrearCurso(props) {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }
    const [curso, setCurso] = useState({
        nombre: "",
        materia: "",
        idDocente: "",
        docente: "",
    })
    const [state, setState] = useState({
        isCliked: false,
    })
    const handleClick = () => {
        setState({
            ...state,
            isCliked: !state.isCliked
        })

    }
    const handleChange = e => {
        setCurso({
            ...curso,
            docente: props.getUsuario().displayName,
            idDocente: props.getUsuario().uid,
            [e.target.name]: e.target.value
        })
        console.log("escribe")
    }
    const onSubmit = (e) => {
        e.preventDefault();
        props.addOrEditCourse(curso)
    }
    const handleLogin = (e) => {
        handleClick()
        
    }
    return (
        <div className="crearCurso">
            <div className="crearCurso__header ">
                <h3 className="crearCurso__text">
                    Mis Cursos
                </h3>
                <img onClick={handleClick} className="crearCurso__img" src={mas} alt="mas" />
            </div>
            <div className={state.isCliked ? "crearCurso__centrado" : "crearCurso__centrado hide"}>
                <form className="crearCurso__form" onSubmit={onSubmit} >

                    <label className="crearCurso__form--label"> Nombre del Curso</label>
                    <input
                        id="nombre"
                        className="crearCurso__form--input"
                        type="text"
                        name="nombre"
                        value={curso.nombre}
                        onChange={handleChange}
                    />
                    <label className="crearCurso__form--label"> Materia del Curso</label>
                    <input
                        id="nombre"
                        className="crearCurso__form--input"
                        type="text"
                        name="materia"
                        value={curso.materia}
                        onChange={handleChange}
                    />
                    <button onClick={handleLogin} id="signupButton" className="crearCurso__form--button" >Crear Curso</button>
                    {/* {this.state.error && (
                        <p className="error">{this.state.error.message}</p>
                    )} */}
                </form>
            </div>
        </div>
    )
}
export default CrearCurso
