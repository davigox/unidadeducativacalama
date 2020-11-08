import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../MyProvider';
import { db } from '../firebase';
import CursoItemEstudiante from '../components/CursoItemEstudiante';
import CursoItemEstudianteVer from '../components/CursoItemEstudianteVer';

import './styles/MisCursosEstudiante.css';


const MisCursosEstudiante = (props) => {

    const { usuarioLogeado } = useContext(MyContext)

    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('cursos').where('codigo', '==', props.match.params.codigo).onSnapshot((querySnapshot) => {
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
            <div className="misCursosEstudiante">
                <div className="misCursosEstudiante__centrado">
                    <div className="misCursosEstudiante__header">
                        <div className="misCursosEstudiante__titulo">
                            Cursos
                        </div>
                    </div>
                    {(state.data.length >= 1) ?
                    state.data.map((doc, index) => (
                        <CursoItemEstudianteVer
                            curso={doc.curso}
                            materia={doc.materia}
                            docente={doc.docente}
                            idCurso={doc.idCurso}
                            idUsuario= {usuarioLogeado.uid}
                            key={index}
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

export default MisCursosEstudiante
