import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import AporteItem from './AporteItem';
import AporteItemEstudiante from './AporteItemEstudiante';

const AportesList = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        if (props.idContenido != '') {
            const unsubscribe = db.collection('aportesCursos').doc(props.idCurso).collection('aportes').orderBy('fecha').where('idContenido', '==', props.idContenido).onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), idAporte: doc.id });
                })
                setState({ data: docs })
                console.log("Aportes cargados")
            })
            return unsubscribe
        }
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <AporteItem
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
            <div>
                  En esta sección se muestran todos los Aportes entregados por los estudiantes.
            </div>
        </>
    )
}

export default AportesList
