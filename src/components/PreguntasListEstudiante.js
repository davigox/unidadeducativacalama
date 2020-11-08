import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import PreguntaItem from './PreguntaItem';
import PreguntaItemEstudiante from './PreguntaItemEstudiante';

const PreguntasListEstudiante = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        const unsubscribe = db.collection('preguntasCursos').doc(props.idCurso).collection('preguntas').orderBy('fecha').where('idContenido', '==', props.idContenido).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idPregunta: doc.id });
            })
            setState({ data: docs })
            console.log("Preguntas cargadas")
        })
        return unsubscribe
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <PreguntaItemEstudiante
                        estado={props.estado}
                        calificado={doc.calificado}
                        nota={doc.nota}
                        index={index+1}
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
                    No se encontraron Items
            </div>
            }
        </>
    )
}

export default PreguntasListEstudiante
