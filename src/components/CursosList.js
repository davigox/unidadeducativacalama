import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import CursoItem from './CursoItem';
import CursoItemDocente from './CursoItemDocente';
import './styles/CursoList.css'
const CursosList = (props) => {
    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('cursos').orderBy('curso').where('idUsuario', '==', props.idUsuario).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idCurso: doc.id });
            })
            setState({ data: docs })
            console.log("Cursos cargados")
        })
        return unsubscribe;
    }, [])
    return (
        <div>
            {(state.data.length >= 1) ?
                state.data.map(doc => (
                    <CursoItemDocente
                        codigo={doc.codigo}
                        curso={doc.curso}
                        materia={doc.materia}
                        docente={doc.docente}
                        idCurso={doc.idCurso}
                        idUsuario={doc.idUsuario}
                        key={doc.idCurso}
                    />
                ))
                : <div>
                    El Docente aun no tiene cursos
                        </div>
            }
        </div>
    )
}

export default CursosList
