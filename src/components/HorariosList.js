import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import HorarioItem from './HorarioItem';

import './styles/HorarioList.css';

const HorariosList = () => {
    const [state, setState] = useState({
        data: [],
        error: false,
        loading: true,
        mensaje: '',
    })
    useEffect(() => {
        const unsubscribe = db.collection('horarios').orderBy('fecha', 'desc').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idHorario: doc.id });
            })
            setState({ data: docs })
            console.log("Horarios cargados")
        })
        return unsubscribe
    }, [])
    return (

        <div className="HorarioList">
            {(state.data.length >= 1) ?
                state.data.map(doc => (
                    <HorarioItem
                        idHorario={doc.idHorario}
                        key={doc.idHorario}
                        titulo={doc.titulo}
                        descripcion={doc.descripcion}
                        enlace={doc.enlace}
                    />
                ))
                :
                <div>
                    No se encontraron Horarios
                </div>
            }
        </div>
    )
}

export default HorariosList