import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import AporteItemEstudiante from './AporteItemEstudiante';


const AportesListEstudiante = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        const unsubscribe = db.collection('aportesCursos').doc(props.idCurso).collection('aportes').orderBy('fecha').where('idContenido', '==', props.idContenido).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idAporte: doc.id });
            })
            setState({ data: docs })
            console.log("Aportes cargados")
        })
        return unsubscribe
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <AporteItemEstudiante
                        calificado={doc.calificado}
                        nota={doc.nota}
                        index={index+1}
                        idAporte={doc.idAporte}
                        idContenido={doc.idContenido}
                        idTrimestre={doc.idTrimestre}
                        idCurso={doc.idCurso}
                        idUsuario={doc.idUsuario}
                        nombre={doc.nombre}
                        materia={doc.materia}
                        mensaje={doc.mensaje}
                        key={index}
                    />
                ))
                : <div>
                    No se encontraron Aportes
            </div>
            }
        </>
    )
}

export default AportesListEstudiante
