import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

import './styles/ContenidoEstudianteDetalle.css';

const ContenidoEstudianteDetalle = (props) => {
    const [opcion, setOpcion] = useState({
        preguntas: false,
        aportes: false,
        notas: false
    })
    const [state, setState] = useState({
        idContenido: '',
        idCurso: '',
        idUsuario: '',
        enlace: '',
        nombre: '',
        titulo: '',
        fecha: '',
    });
    const handleChecked = (e) => {
        if(e.target.value === 'preguntas'){
            setOpcion({
                preguntas: true,
                aportes: false,
                notas: false
            })
        }
        if(e.target.value === 'aportes'){
            setOpcion({
                preguntas: false,
                aportes: true,
                notas: false
            })
        }
        if(e.target.value === 'notas'){
            setOpcion({
                preguntas: false,
                aportes: false,
                notas: true
            })
        }
    }
    const getContenido = () => {
        db.collection('contenidos').doc(props.match.params.idContenido).get().then(doc => {
            if (doc.exists) {
                console.log('Se encontro el contenido')
                setState({
                    ...state,
                    idContenido: doc.id,
                    idCurso: doc.data().idCurso,
                    idUsuario: doc.data().idUsuario,
                    enlace: doc.data().enlace,
                    nombre: doc.data().nombre,
                    titulo: doc.data().titulo,
                    // fecha: doc.data().fecha,
                })
            } else {
                console.log('El contenido no fue encontrado en la BD')
            }
        })
    }
    useEffect(() => {
        console.log('Effect')
        getContenido();
    }, [])
    return (
        <div className="contenidoEstudianteDetalle">
            <div className="contenidoEstudianteDetalle__centrado">
                <div className="contenidoEstudianteDetalle__video">
                    <iframe title={state.titulo} className="contenidoEstudianteDetalle__video--iframe" type="text/html"
                        src={state.enlace} frameBorder="0" allowFullScreen={true}>
                    </iframe>
                    <div className="contenidoEstudianteDetalle__video--titulo">
                        {state.titulo}
                    </div>
                </div>
                <div className="contenidoEstudianteDetalle__comunidad">
                    <div className="contenidoEstudianteDetalle__comunidad--opciones">
                        <input 
                            type="radio" 
                            name="opciones" 
                            value="preguntas"
                            id="preguntas"
                            checked={opcion.preguntas}
                            onChange={handleChecked}
                        />
                        <label htmlFor="preguntas">Preguntas</label>
                        <input 
                            type="radio" 
                            name="opciones"
                            value="aportes" 
                            id="aportes"
                            checked={opcion.aportes}
                            onChange={handleChecked}
                        />
                        <label htmlFor="aportes">Aportes</label>
                        <input 
                            type="radio" 
                            name="opciones"
                            value="notas" 
                            id="notas"
                            checked={opcion.notas}
                            onChange={handleChecked}
                        />
                        <label htmlFor="notas">Notas</label>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContenidoEstudianteDetalle
