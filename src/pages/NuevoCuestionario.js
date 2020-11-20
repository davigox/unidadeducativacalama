import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../firebase'

import enviar from '../images/enviar.svg'
import mas from '../images/mas.svg'
import { MyContext } from '../MyProvider'

import './styles/NuevoCuestionario.css'


const Pregunta = (props) => {
    const [state, setState] = useState({
        pregunta: '',

    })
    const remove = () => {
        props.removeClick(props.indice)
    }
    return (
        <div className="Pregunta">
            <label className="Pregunta__titulo">Pregunta{props.indice + 1}</label>
            <input className="Pregunta__input" name={props.indice} type="text" value={props.pregunta}
                onChange={props.handleChangePregunta}
            />
            <label className="Pregunta__label">Respuesta Correcta</label>
            <input className="Pregunta__input" name={props.indice} type="text" value={props.respuestaCorrecta}
                onChange={props.handleChangeRespuesta}
            />
            <label className="Pregunta__label">Respuesta Incorrecta 1</label>
            <input className="Pregunta__input" name={props.indice} type="text" value={props.respuestaIncorrecta1}
                onChange={props.handleChangeRespuestaIncorrecta1}
            />
            <label className="Pregunta__label">Respuesta Incorrecta 2</label>
            <input className="Pregunta__input" name={props.indice} type="text" value={props.respuestaIncorrecta2}
                onChange={props.handleChangeRespuestaIncorrecta2}
            />
            <label className="Pregunta__label">Respuesta Incorrecta 3</label>
            <input className="Pregunta__input" name={props.indice} type="text" value={props.respuestaIncorrecta3}
                onChange={props.handleChangeRespuestaIncorrecta3}
            />
            {/* <input name={props.indice} type="text" value={props.titulo || ''} onChange={props.handleChange} /> */}
            <input className="Pregunta__button" type="button" value='Quitar Pregunta' onClick={remove} />
        </div>
    )
}

const NuevoCuestionario = (props) => {
    const {usuarioLogeado} = useContext(MyContext)
    const [state, setState] = useState({
        values: [],
    })
    const [cuestionario, setCuestionario] = useState({
        titulo: '',
        descripcion: '',
    })

    const createUI = () => {
        return state.values.map((el, i) => (
            <Pregunta
                key={i}
                indice={i}
                titulo={el}
                pregunta={state.values[i].pregunta}
                respuestaCorrecta={state.values[i].respuestaCorrecta}
                respuestaIncorrecta1={state.values[i].respuestaIncorrecta1}
                respuestaIncorrecta2={state.values[i].respuestaIncorrecta2}
                respuestaIncorrecta3={state.values[i].respuestaIncorrecta3}
                handleChange={handleChange}
                handleChangePregunta={handleChangePregunta}
                handleChangeRespuesta={handleChangeRespuesta}
                handleChangeRespuestaIncorrecta1={handleChangeRespuestaIncorrecta1}
                handleChangeRespuestaIncorrecta2={handleChangeRespuestaIncorrecta2}
                handleChangeRespuestaIncorrecta3={handleChangeRespuestaIncorrecta3}
                removeClick={removeClick}
            />
        ))
    }
    const handleChangePregunta = (event) => {
        let values = [...state.values]
        values[event.target.name].pregunta = event.target.value
        setState({
            values
        })
    }
    const handleChangeRespuesta = (event) => {
        let values = [...state.values]
        values[event.target.name].respuestaCorrecta = event.target.value
        setState({
            values
        })
    }
    const handleChangeRespuestaIncorrecta1 = (event) => {
        let values = [...state.values]
        values[event.target.name].respuestaIncorrecta1 = event.target.value
        setState({
            values
        })
    }
    const handleChangeRespuestaIncorrecta2 = (event) => {
        let values = [...state.values]
        values[event.target.name].respuestaIncorrecta2 = event.target.value
        setState({
            values
        })
    }
    const handleChangeRespuestaIncorrecta3 = (event) => {
        let values = [...state.values]
        values[event.target.name].respuestaIncorrecta3 = event.target.value
        setState({
            values
        })
    }
    const handleChange = (event) => {
        let values = [...state.values]
        values[event.target.name] = event.target.value
        setState({
            values
        })
    }
    const handleChangeCuestionario = (e) => {
        setCuestionario({
            ...cuestionario,
            [e.target.name]: e.target.value,
        })
    }
    const addClick = () => {
        setState(prevState => ({ values: [...prevState.values, { pregunta: '', respuestaCorrecta: '', respuestaIncorrecta1: '', respuestaIncorrecta2: '', respuestaIncorrecta3: '' }] }))
    }
    const removeClick = (i) => {
        let values = [...state.values]
        console.log(i)
        values.splice(i, 1)
        setState({
            ...state,
            values
        })
    }
    const handleSubmit = (event) => {
        alert('un Nombre fue enviado: ' + state.values.join(', '))
        event.preventDefault()
    }
    const crearCuestionario = async () => {
        if (cuestionario.titulo.trim() !== "" && cuestionario.descripcion.trim() !== "") {
            try {
                const ref = db.collection('contenidos').doc()
                await ref.set({
                    titulo: cuestionario.titulo,
                    descripcion: cuestionario.descripcion,
                    estado: true,
                    fecha: new Date(),
                    idCurso: props.match.params.idCurso,
                    idTrimestre: props.match.params.idTrimestre,
                    idUsuario: usuarioLogeado.uid,
                    tipo: "cuestionario",

                })
                if (ref.id) {
                    state.values.map(async doc => {
                        await db.collection('preguntas').doc().set({
                            idContenido: ref.id,
                            pregunta: doc.pregunta,
                            respuestaCorrecta: doc.respuestaCorrecta,
                            respuestaIncorrecta1: doc.respuestaIncorrecta1,
                            respuestaIncorrecta2: doc.respuestaIncorrecta2,
                            respuestaIncorrecta3: doc.respuestaIncorrecta3,
                        })
                    })
                    window.alert('Cuestionario Creado Correctamente')
                }
                console.log(ref.id)

            } catch (error) {
                window.alert('El Cuestionario no se pudo crear.Intenta Nuevamente')
            }
        } else {
            window.alert('Falta completar algunos campos')
        }
    }
    return (
        <div className="NuevoCuestionario">
            <div className="NuevoCuestionario__header">
                <div className="NuevoCuestionario__titulo">
                    Nuevo Cuestionario
                    </div>
            </div>
            <form className="NuevoCuestionario__form" onSubmit={handleSubmit}>
                <label className="NuevoCuestionario__label">
                    Título de Cuestionario:
                    </label>
                <input
                    className="NuevoCuestionario__input"
                    type="text"
                    name="titulo"
                    value={state.titulo}
                    onChange={handleChangeCuestionario}
                />
                <label className="NuevoCuestionario__label">
                    Descripción:
                    </label>
                <input
                    className="NuevoCuestionario__input"
                    type="text"
                    name="descripcion"
                    value={state.descripcion}
                    onChange={handleChangeCuestionario}
                />
                {createUI()}
                <div className="NuevoCuestionario__botones">
                    <input className="NuevoCuestionario__button" type="button" value='Agregar nueva pregunta' onClick={addClick} />
                    <input className="NuevoCuestionario__button2" type="button" value='Crear Cuestionario' onClick={crearCuestionario} />
                </div>
            </form>

        </div>
    )
}
export default NuevoCuestionario
