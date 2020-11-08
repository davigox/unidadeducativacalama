import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import AporteItem from './AporteItem';
import NotaItem from './NotaItem';
import TareaItem from './TareaItem';

const TareasList = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        if (props.idContenido != '') {
            const unsubscribe = db.collection('tareasCursos').doc(props.idCurso).collection('tareas').orderBy('fecha').where('idContenido', '==', props.idContenido).onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), idTarea: doc.id });
                })
                setState({ data: docs })
                console.log("Tareas cargadas")
            })
            return unsubscribe
        }
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <TareaItem
                        calificado={doc.calificado}
                        nota={doc.nota}
                        idTrimestre={doc.idTrimestre}
                        index={index+1}
                        idCurso={doc.idCurso}
                        idTarea={doc.idTarea}
                        idContenido={doc.idContenido}
                        idUsuario={doc.idUsuario}
                        nombre={doc.nombre}
                        titulo={doc.titulo}
                        enlace={doc.enlace}
                        key={index}
                    />
                ))
                : <div>
                    No se encontraron Tareas
                    </div>
            }
            <div>
                  En esta sección se muestran todas las tareas entregadas por los estudiantes.
            </div>
        </>
    )
}

export default TareasList
