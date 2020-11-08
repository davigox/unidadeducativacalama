import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import AporteItem from './AporteItem';
import NotaItem from './NotaItem';
import TareaItemEstudiante from './TareaItemEstudiante';

const TareasListEstudiante = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        const unsubscribe = db.collection('tareasCursos').doc(props.idCurso).collection('tareas').orderBy('fecha').where('idContenido', '==', props.idContenido).where('idUsuario', '==', props.idUsuario).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idTarea: doc.id });
            })
            setState({ data: docs })
            console.log("Tareas cargadas")
        })
        return unsubscribe
    }, [])
    return (
        <>
        {(state.data.length >= 1) ?
            state.data.map((doc, index) => (
                <TareaItemEstudiante
                    calificado={doc.calificado}
                    nota={doc.nota}
                    index={index+1}
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
    </>
    )
}

export default TareasListEstudiante
