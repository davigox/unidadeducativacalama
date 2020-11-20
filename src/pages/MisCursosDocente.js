import React from 'react'
import { useState, useEffect, useContext } from 'react';
import CursoItem from '../components/CursoItem';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

import { MyContext } from '../MyProvider';
// CSS
import './styles/MisCursosDocente.css';
// Imagenes
import mas from '../images/mas.svg';

const MisCursosDocente = (props) => {
    const { usuarioLogeado } = useContext(MyContext)

    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('cursos').orderBy('curso').where('idUsuario', '==', props.match.params.idDocente).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idCurso: doc.id });
            })
            setState({ data: docs })
            console.log("Cursos cargados")
        })
        return unsubscribe;
    }, [])
    if (usuarioLogeado.rol !== 'docente') {
        return <h1 className="noacceso">Ups! No tienes acceso a estos datos.</h1>
    } else {
        return (
            <div className="misCursosDocente">
                <div className="misCursosDocente__centrado">
                    <div className="misCursosDocente__header">

                        <div className="misCursosDocente__titulo">
                            Mis Cursos
                        </div>
                    </div>
                    <div className="misCursosDocente__body">
                        {(state.data.length >= 1) ?
                            state.data.map(doc => (
                                <CursoItem
                                    codigo={doc.codigo}
                                    curso={doc.curso}
                                    materia={doc.materia}
                                    docente={doc.docente}
                                    idCurso={doc.idCurso}
                                    idUsuario={usuarioLogeado.uid}
                                    key={doc.idCurso}
                                />
                            ))
                            : <div>
                                No Hay Cursos encontrados
                        </div>
                        }
                    </div>
                </div>
                <Link to="/nuevocursodocente" className="misCursosDocente__mas">
                    <img src={mas} alt="mas" />
                </Link>
            </div>
        )
    }
}
export default MisCursosDocente
