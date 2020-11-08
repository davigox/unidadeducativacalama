import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
import TrimestreItem from './TrimestreItem';
const TrimestresList = (props) => {
    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('trimestres').orderBy('fecha').where('idCurso', '==', props.idCurso).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idTrimestre: doc.id });
            })
            setState({ data: docs })
            console.log("Trimestres cargados")
        })
        return unsubscribe
    }, [])
    
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <TrimestreItem
                        ponerVideo={props.ponerVideo}
                        idTrimestre={doc.idTrimestre}
                        idCurso={doc.idCurso}
                        idUsuario={doc.idUsuario}
                        titulo={doc.titulo}
                        nombre={props.nombre}
                        materia={doc.materia}
                        curso={doc.curso}
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

export default TrimestresList
