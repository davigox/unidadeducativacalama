import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';

import ContenidoItem from '../components/ContenidoItem';

import './styles/PreguntaDetalle.css';

// imagenes
import add from '../images/add.svg';

import { Link } from 'react-router-dom';
import { MyContext } from '../MyProvider';
import RespuestasList from '../components/RespuestasList';
import RespuestaForm from '../components/RespuestaForm';
import RespuestasListEstudiante from '../components/RespuestasListEstudiante';

const PreguntaDetalle = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [data, setData] = useState({
        data: []
    })
    const [state, setState] = useState({
        form: false,
        respuestas: true,
        idPregunta: '',
        idContenido: '',
        mensaje: '',
        idCurso: '',
        idTrimestre: '',
        idUsuario: '',
        nombre: '',
        materia: ''
    });
    const getCurso = () => {
        db.collection('preguntas').doc(props.match.params.idPregunta).get().then(doc => {
            if (doc.exists) {
                setState({
                    ...state,
                    idPregunta: doc.id,
                    idContenido: doc.data().idContenido,
                    mensaje: doc.data().mensaje,
                    idCurso: doc.data().idCurso,
                    idTrimestre: doc.data().idTrimestre,
                    idUsuario: doc.data().idUsuario,
                    nombre: doc.data().nombre,
                    materia: doc.data().materia
                })
            } else {
                console.log('La pregunta no fue encontrada en la BD')
            }
        })
    }
    const ocultarForm = () => {
        setState({
            ...state,
            form: false,
        })
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (window.confirm(`Quiere Cambiar la pregunta a: ${state.mensaje}`)) {
                db.collection('preguntas').doc(state.idPregunta).update({
                    mensaje: state.mensaje,
                }).then(() => {
                    window.alert('Pregunta Actualizada correctamente');
                })
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    const verFormTrimestre = () => {
        setState({
            ...state,
            form: !state.form,
        })
    }
    const agregarTrimestre = () => {
        setState({
            ...state,
            trimestres: false,
            form: !state.form
        })
    }
    useEffect(() => {
        console.log('Effect')
        getCurso();
    }, [])
    return (
        <div className="PreguntaDetalle">
            <div className="PreguntaDetalle__centrado">
                <div className="PreguntaDetalle__header">
                    <div className="PreguntaDetalle__head">
                        <div className="PreguntaDetalle__titulo">
                            Detalle de la Pregunta
                        </div>
                    </div>
                    <div className="PreguntaDetalle__form">
                        <div >
                            {state.mensaje}
                        </div>
                    </div>
                </div>
                <div className="PreguntaDetalle__body">
                    <div className="PreguntaDetalle__head">
                        <div className="PreguntaDetalle__body--text1">Repuestas de la Pregunta</div>
                    </div>
                        <RespuestaForm
                            ocultarForm={ocultarForm}
                            idPregunta={state.idPregunta}
                            idContenido={state.idContenido}
                            idCurso={state.idCurso}
                            idTrimestre={state.idTrimestre}
                            idUsuario={state.idUsuario}
                            nombre={state.nombre}
                            materia={state.materia}
                        />
                    {
                        state.respuestas &&
                        <RespuestasListEstudiante
                            idPregunta={props.match.params.idPregunta}
                        />
                    }
                </div>
            </div>
        </div >

    )
}
export default PreguntaDetalle;



