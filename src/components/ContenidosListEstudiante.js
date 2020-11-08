import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
import ContenidoItemEstudiante from './ContenidoItemEstudiante';
const ContenidosListEstudiante = (props) => {
    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('contenidos').orderBy('fecha').where('idTrimestre', '==', props.idTrimestre).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idContenido: doc.id });
            })
            setState({ data: docs })
            console.log("Contenidos cargados")
        })
        return unsubscribe
    }, [])
    
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <ContenidoItemEstudiante
                        estado={doc.estado}
                        descripcion={doc.descripcion}
                        ponerVideo={props.ponerVideo}
                        idContenido={doc.idContenido}
                        idTrimestre={doc.idTrimestre}
                        idCurso={doc.idCurso}
                        idUsuario={doc.idUsuario}
                        nombre={doc.nombre}
                        titulo={doc.titulo}
                        tipo={doc.tipo}
                        enlace={doc.enlace}
                        materia={doc.materia}
                        index={index}
                        key={doc.idContenido}
                    />
                ))
                : <div>
                    No se encontraron Items
            </div>
            }
        </>
    )
}

export default ContenidosListEstudiante
