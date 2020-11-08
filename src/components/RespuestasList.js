import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import PreguntaItem from './PreguntaItem';
import RespuestaItem from './RespuestaItem';

const RespuestasList = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        const unsubscribe = db.collection('respuestasCursos').doc(props.idCurso).collection('respuestas').orderBy('fecha').where('idPregunta', '==', props.idPregunta).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idRespuesta: doc.id });
            })
            setState({ data: docs })
            console.log("Respuestas cargadas")
        })
        return unsubscribe
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <RespuestaItem
                        calificado={doc.calificado}
                        index={index+1}
                        nota={doc.nota}
                        idUsuario={doc.idUsuario}
                        idCurso={doc.idCurso}
                        idPregunta={doc.idPregunta}
                        idRespuesta={doc.idRespuesta}
                        idContenido={doc.idContenido}
                        idTrimestre={doc.idTrimestre}
                        mensaje={doc.mensaje}
                        nombre={doc.nombre}
                        key={index}
                    />
                ))
                : <div>
                    No se encontraron Items
            </div>
            }
        </>
    )
}

export default RespuestasList
