import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import NotaItemEstudiante from './NotaItemEstudiante'

const NotasListEstudiante = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        const unsubscribe = db.collection('notasCursos').doc(props.idCurso).collection('notas').orderBy('fecha').where('idContenido', '==', props.idContenido).where('idUsuario', '==',props.idUsuario).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idNota: doc.id });
            })
            setState({ data: docs })
            console.log("Notas cargados")
        })
        return unsubscribe
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <NotaItemEstudiante
                        calificado={doc.calificado}
                        nota={doc.nota}
                        index={index+1}
                        idNota={doc.idNota}
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
                    No se encontraron Items
            </div>
            }
        </>
    )
}

export default NotasListEstudiante
