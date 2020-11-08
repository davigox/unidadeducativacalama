import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import PreguntaItem from './PreguntaItem';

const PreguntasList = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        if(props.idContenido != '' ){
            const unsubscribe = db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').orderBy('fecha').where('idContenido', '==', props.idContenido).onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), idPregunta: doc.id });
                })
                setState({ data: docs })
                console.log("Preguntas cargadas")
            })
            return unsubscribe
        }else{

        }
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <PreguntaItem
                        calificado={doc.calificado}
                        index={index+1}
                        nota={doc.nota}
                        idPregunta={doc.idPregunta}
                        idContenido={doc.idContenido}
                        idTrimestre={doc.idTrimestre}
                        idCurso={doc.idCurso}
                        idUsuario={doc.idUsuario}
                        nombre={doc.nombre}
                        materia={doc.materia}
                        mensaje={doc.mensaje}
                        key={doc.idPregunta}
                    />
                ))
                : <div>
                    No se encontraron Preguntas
            </div>
            }
            <div>
                  En esta sección se muestran todas las Preguntas y Respuestas realizadas por los estudiantes.
            </div>
        </>
    )
}

export default PreguntasList
