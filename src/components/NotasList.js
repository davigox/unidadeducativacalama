import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import AporteItem from './AporteItem';
import NotaItem from './NotaItem';

const NotasList = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        if (props.idContenido != '') {
            const unsubscribe = db.collection('notasCursos').doc(props.idCurso).collection('notas').orderBy('fecha').where('idContenido', '==', props.idContenido).onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), idNota: doc.id });
                })
                setState({ data: docs })
                console.log("Notas cargados")
            })
            return unsubscribe
        }
    }, [])
    return (
        <>
            {(state.data.length >= 1) ?
                state.data.map((doc, index) => (
                    <NotaItem
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
                    No se encontraron Notas
        </div>
            }
            <div>
                  En esta sección se muestran todas las Notas entregadas por los estudiantes.
            </div>
        </>
    )
}

export default NotasList
