import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../firebase'

const Preguntas = (props) => {
    const [state, setState] = useState({
        data: [],
        promedio: 0,
    })
    const obtenerCalificaciones = () => {
        db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').where('idTrimestre', '==', props.idTrimestre).where('idUsuario', '==', props.idUsuario).get().then(querySnapshot => {
            const notas = []
            let sumatoria = 0
            querySnapshot.forEach(doc => {
                if(doc.data().nota !== 0){
                    notas.push(doc.data().nota)
                    sumatoria= sumatoria + doc.data().nota
                }
            })
            setState({
                data: notas,
                promedio: sumatoria/notas.length 
            })
        })
    }
    useEffect(()=>{
        obtenerCalificaciones()
    },[])
    return (
        <div>
            {state.promedio}% {Math.round(state.promedio*.45)}pts
        </div>
    )
}

export default Preguntas
