import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../MyProvider';
import { db } from '../firebase';
import CursoItemEstudiante from '../components/CursoItemEstudiante';

import './styles/VerCursosEstudiante.css';

const VerCursosEstudiante = (props) => {

    const { usuarioLogeado } = useContext(MyContext)

    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('cursos').orderBy('curso').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idCurso: doc.id });
            })
            setState({ data: docs })
            console.log("Cursos cargados")
        })
        return unsubscribe;
    }, [])
    if (usuarioLogeado.rol !== 'estudiante') {
        return <h1 className="error">Ups! No tienes acceso a estos datos.</h1>
    } else {
        return (
            <div className="verCursosEstudiante">
                <div className="verCursosEstudiante__centrado">
                    <div className="verCursosEstudiante__header">
                        <div className="verCursosEstudiante__titulo">
                            Cursos
                        </div>
                    </div>
                    {(state.data.length >= 1) ?
                    state.data.map(doc => (
                        <CursoItemEstudiante
                            curso={doc.curso}
                            materia={doc.materia}
                            docente={doc.docente}
                            idCurso={doc.idCurso}
                            idUsuario= {usuarioLogeado.uid}
                            key={doc.idCurso}
                        />
                    ))
                    : <div>
                        No Hay Cursos encontrados
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default VerCursosEstudiante
