import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import AportesList from '../components/AportesList';
import AportesListEstudiante from '../components/AportesListEstudiante';
import NotasList from '../components/NotasList';
import PreguntaForm from '../components/PreguntaForm';
import PreguntasList from '../components/PreguntasList';
import TareaForm from '../components/TareaForm';
import TareasList from '../components/TareasList';
import { db } from '../firebase'
import { MyContext } from '../MyProvider';

import './styles/YoutubeEdit.css';

const YoutubeEdit = (props) => {
    const {usuarioLogeado} = useContext(MyContext)
    
    const [opcion, setOpcion] = useState({
        preguntas: false,
        aportes: false,
        notas: false,
        tareas: false,
    })
    const [state, setState] = useState({
        idContenido: '',
        materia: '',
        idCurso: '',
        idUsuario: '',
        enlace: '',
        nombre: '',
        descripcion: '',
        tipo: '',
        titulo: '',
        fecha: '',
    });
    const getContenido = () => {
        db.collection('contenidos').doc(props.match.params.idContenido).get().then(doc => {
            if (doc.exists) {
                console.log('Se encontro el contenido')
                setState({
                    ...state,
                    idContenido: doc.id,
                    idTrimestre: doc.data().idTrimestre,
                    idCurso: doc.data().idCurso,
                    idUsuario: doc.data().idUsuario,
                    materia: doc.data().materia,
                    enlace: doc.data().enlace,
                    nombre: doc.data().nombre,
                    titulo: doc.data().titulo,
                    tipo: doc.data().tipo,
                    descripcion: doc.data().descripcion,
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
    const handleChecked = (e) => {
        if (e.target.value === 'preguntas') {
            setOpcion({
                preguntas: true,
                aportes: false,
                notas: false,
                tareas: false,
            })
        }
        if (e.target.value === 'aportes') {
            setOpcion({
                preguntas: false,
                aportes: true,
                notas: false,
                tareas: false,
            })
        }
        if (e.target.value === 'notas') {
            setOpcion({
                preguntas: false,
                aportes: false,
                notas: true,
                tareas: false,
            })
        }
        if (e.target.value === 'tareas') {
            setOpcion({
                preguntas: false,
                aportes: false,
                notas: false,
                tareas: true,
            })
        }
    }

    return (
        <div className="youtubeEdit">
            <div className="youtubeEdit__centrado">
                <div className="youtubeEdit__video">
                    {
                        state.tipo === 'video' &&
                        <iframe title={state.titulo} className="youtubeEdit__video--iframe" type="text/html"
                            src={state.enlace} frameBorder="0" allowFullScreen={true}>
                        </iframe>
                    }
                    {
                        state.tipo === 'drive' &&
                        <div className="youtubeEdit__video--iframe">
                            <iframe src={`${state.enlace}`}
                                width="100%" height="200"
                                 ></iframe>
                        </div>
                    }
                    <div className="youtubeEdit__video--titulo">
                        {state.titulo}
                    </div>
                    <div className="youtubeEdit__video--subtitulo">
                        {state.descripcion}
                    </div>
                </div>
                <div className="youtubeEdit__comunidad">
                    <div className="youtubeEdit__comunidad--opciones">
                        <input
                            type="checkbox"
                            name="opciones"
                            value="preguntas"
                            id="preguntas"
                            checked={opcion.preguntas}
                            onChange={handleChecked}
                        />
                        <label
                            htmlFor="preguntas"
                        >
                            Preguntas
                        </label>
                        <input
                            type="checkbox"
                            name="opciones"
                            value="aportes"
                            id="aportes"
                            checked={opcion.aportes}
                            onChange={handleChecked}
                        />
                        <label
                            htmlFor="aportes"
                        >
                            Aportes
                        </label>
                        <input
                            type="checkbox"
                            name="opciones"
                            value="notas"
                            id="notas"
                            checked={opcion.notas}
                            onChange={handleChecked}
                        />
                        <label
                            htmlFor="notas"
                        >
                            Notas
                        </label>
                        <input
                            type="checkbox"
                            name="opciones"
                            value="tareas"
                            id="tareas"
                            checked={opcion.tareas}
                            onChange={handleChecked}
                        />
                        <label
                            htmlFor="tareas"
                        >
                            Tareas
                        </label>
                    </div>
                    <div className="youtubeEdit__comentarios">
                        {
                            opcion.preguntas &&
                            <>
                                <PreguntaForm
                                    idContenido={state.idContenido}
                                    idTrimestre={state.idTrimestre}
                                    idCurso={state.idCurso}
                                    idUsuario={state.idUsuario}
                                    materia={state.materia}
                                />
                                <PreguntasList
                                    idContenido={state.idContenido}
                                    idCurso={state.idCurso}
                                    idUsuario={state.idUsuario}
                                    idTrimestre={state.idTrimestre}
                                />
                            </>
                        }
                        {
                            opcion.aportes &&
                            <>
                                <AportesList
                                    idContenido={state.idContenido}
                                    idCurso={state.idCurso}
                                    idUsuario={state.idUsuario}
                                    idTrimestre={state.idTrimestre}
                                />
                            </>
                        }
                        {
                            opcion.notas &&
                            <NotasList
                                idContenido={state.idContenido}
                                idCurso={state.idCurso}
                                idUsuario={usuarioLogeado.uid}
                                idTrimestre={state.idTrimestre}
                            />
                        }
                        {
                            opcion.tareas &&
                            <>
                                <TareaForm
                                    idContenido={state.idContenido}
                                    idCurso={state.idCurso}
                                    idUsuario={usuarioLogeado.uid}
                                    nombre={`${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`}
                                    idTrimestre={state.idTrimestre}
                                />
                                <TareasList
                                    idContenido={state.idContenido}
                                    idUsuario={usuarioLogeado.uid}
                                />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YoutubeEdit
