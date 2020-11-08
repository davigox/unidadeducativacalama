import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import ComunicadoItem from './ComunicadoItem';

import './styles/ComunicadosList.css';

const ComunicadosList = () => {
    const [state, setState] = useState({
        data: [],
        error: false,
        loading: true,
        mensaje: '',
    })
    useEffect(() => {
        const unsubscribe = db.collection('comunicados').orderBy('fecha', 'desc').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idComunicado: doc.id });
            })
            setState({ data: docs })
            console.log("Comunicados cargados")
        })
        return unsubscribe
    }, [])
    return (
        <div className="ComunicadosList">
            {   state.data.length >= 1 ?

                state.data.map(doc => (
                    <ComunicadoItem
                        idComunicado={doc.idComunicado}
                        key={doc.idComunicado}
                        titulo={doc.titulo}
                        descripcion={doc.descripcion}
                        enlace={doc.enlace}
                    />
                ))
                :
                <div>
                    No se encontraron Comunicados
                </div>
            }
        </div>
    )
}

export default ComunicadosList
