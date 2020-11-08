import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import enviar from '../images/enviar.svg'
import mas from '../images/mas.svg'

import './styles/NuevoCuestionario.css'


const Pregunta = (props) => {
    const remove = () => {
        props.removeClick(props.indice)
    }
    return (
        <div>
                <input name={props.indice} type="text" value={props.titulo || ''} onChange={props.handleChange} />
                <input type="button" value='remove' onClick={remove} />
        </div>
    )
}

const NuevoCuestionario = (props) => {
    const [state, setState] = useState({
        values: [],
    })
    const [cuestionario, setCuestionario] = useState({
        titulo: '',
        descripcion: '',
    })

    const createUI = () => {
        return state.values.map((el,i) => (
            <Pregunta 
                key={i}
                indice={i}
                titulo={el}
                handleChange={handleChange}
                removeClick={removeClick}
            />
        ))
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
        setState(prevState => ({ values : [...prevState.values, '']}))
    }
    const removeClick = (i) => {
        let values = [...state.values]
        console.log(i)
        values.splice(i,1)
        setState({
            ...state,
            values
        })
    }
    const handleSubmit = (event) => {
        alert('un Nombre fue enviado: ' + state.values.join(', '))
        event.preventDefault()
    }
    return (
        <div className="NuevoCuestionario">
            <form onSubmit={handleSubmit}>
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
                <input type="button" value='Agregar nueva pregunta' onClick={addClick} />
                <input type="button" value='Crear Cuestionario' />
            </form>

        </div>
    )
}
export default NuevoCuestionario
