import React from 'react'
import { useState, useEffect } from 'react'

const Opcion = (props) => {
    const [state, setState] = useState({
        class: '',
        respuesta: '',
    })
    const cargarDatos = () => {
        setState({
            class: props.class,
            respuesta: false
        })
    }
    const mandarRespuesta = () => {
        const result = props.obtenerResultado(props.respuesta)
        if(result === null){
            return
        }
        if (result === true) {
            setState({
                class: 'correct',
                respuesta: true,
            })
        } else {
            setState({
                class: 'incorrect',
                respuesta: true,
            })
        }
    }
    useEffect(() => {
        cargarDatos()
    }, [])
    return (
        <div onClick={mandarRespuesta} className={state.respuesta ? state.class : 'option'} >{props.respuesta}</div>
    )
}

export default Opcion
