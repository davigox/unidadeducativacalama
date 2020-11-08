import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../MyProvider';
import AporteForm from '../components/AporteForm';
import AportesListEstudiante from '../components/AportesListEstudiante';
import ContenidoItemEstudiante from '../components/ContenidoItemEstudiante';
import TrimestresListEstudiante from '../components/TrimestresListEstudiante';
import TareasListEstudiante from '../components/TareasListEstudiante';
import TareaForm from '../components/TareaForm';
import NotasListEstudiante from '../components/NotasListEstudiante';
import NotaForm from '../components/NotaForm';
import PreguntasListEstudiante from '../components/PreguntasListEstudiante'
import PreguntaForm from '../components/PreguntaForm'

import { db } from '../firebase';

import './styles/CursoDetalle.css';
import add from '../images/add.svg';


const CursoDetalle = (props) => {
    const { usuarioLogeado } = useContext(MyContext)

    const [data, setData] = useState({
        data: []
    })
    const [state, setState] = useState({
        video: false,
        form: false,
        url: '',
        titulo: '',
        codigo: '',
        descripcion: '',
        contenido: '',
        materia: '',
        docente: '',
        idUsuario: '',
        idContenido: '',
        idCurso: '',
        curso: '',
        estado: false,
        idTrimestre: '',
        fecha: '',
    });
    const getCurso = () => {
        db.collection('cursos').doc(props.match.params.idCurso).get().then(doc => {
            if (doc.exists) {
                setState({
                    ...state,
                    codigo: doc.data().codigo,
                    idCurso: doc.id,
                    curso: doc.data().curso,
                    materia: doc.data().materia,
                    docente: doc.data().docente,
                    idUsuario: doc.data().idUsuario,
                    fecha: doc.data().fecha,
                })
            } else {
                console.log('El curso no fue encontrado en la BD')
            }
        })
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(() => {
        console.log('Effect')
        getCurso();
    }, [])
    const [opcion, setOpcion] = useState({
        preguntas: false,
        aportes: false,
        notas: false,
        tareas: false,
        contenidos: false,
    })
    const handleChecked = (e) => {
        if (e.target.value === 'preguntas') {
            setOpcion({
                preguntas: true,
                aportes: false,
                notas: false,
                tareas: false,
                contenidos: false,
            })
        }
        if (e.target.value === 'aportes') {
            setOpcion({
                preguntas: false,
                aportes: true,
                notas: false,
                tareas: false,
                contenidos: false,
            })
        }
        if (e.target.value === 'notas') {
            setOpcion({
                preguntas: false,
                aportes: false,
                notas: true,
                tareas: false,
                contenidos: false,
            })
        }
        if (e.target.value === 'tareas') {
            setOpcion({
                preguntas: false,
                aportes: false,
                notas: false,
                tareas: true,
                contenidos: false,
            })
        }
        if (e.target.value === 'contenidos') {
            setOpcion({
                preguntas: false,
                aportes: false,
                notas: false,
                tareas: false,
                contenidos: true,
            })
        }
    }
    const ponerVideo = (url, titulo, descripcion, idTrimestre, idContenido, estado) => {
        setState({
            ...state,
            video: true,
            url: url,
            titulo: titulo,
            descripcion: descripcion,
            idContenido: idContenido,
            idTrimestre: idTrimestre,
            estado: estado,
        })
    }
    return (
        <div className="cursoDetalle">
            <div className="cursoDetalle__centrado">
                <div className="cursoEdit__header">
                    {
                        state.video &&
                        <div className="cursoEdit__header__video">
                            <iframe src={`${state.url}`}
                                allowFullScreen={true}
                            ></iframe>
                            <div>
                                Contenido: {state.titulo}
                            </div>
                            <div>
                                Descripcion: {state.descripcion}
                            </div>
                        </div>
                    }
                    <div className="cursoEdit__header__curso">
                        <div className="cursoEdit__ico">
                            <div className={`color1 ${state.curso}`}>
                                <div className="color2">
                                    {state.codigo}
                                </div>
                            </div>
                        </div>
                        <div className="cursoEdit__header__datos">
                            <div className="cursoEdit__header__dato">
                                Curso {state.curso}
                            </div>
                            <div className="cursoEdit__header__dato">
                                De la Materia de {state.materia}
                            </div>
                            <div className="cursoEdit__header__dato">
                                Con el Docente: {state.docente}
                            </div>
                            <div className="cursoEdit__header__dato">
                                Contenido actual: {state.contenido}
                            </div>
                        </div>
                    </div>
                    <div className="cursoEdit__header__opciones">
                        <input
                            type="checkbox"
                            name="opciones"
                            value="contenidos"
                            id="contenidos"
                            checked={opcion.contenidos}
                            onChange={handleChecked}
                        />
                        <label
                            htmlFor="contenidos"
                        >
                            Contenidos
                        </label>
                        {
                            state.idContenido !== '' &&
                            <>
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
                            </>
                        }
                        {
                            state.idContenido !== '' &&
                            <>
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
                            </>
                        }
                        {
                            state.idContenido !== '' &&
                            <>
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
                            </>
                        }
                        {
                            state.idContenido !== '' &&
                            <>
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
                            </>
                        }

                    </div>
                </div>
                <div className="cursoDetalle__body">
                    {
                        opcion.preguntas &&
                        <>
                            <PreguntaForm
                                idContenido={state.idContenido}
                                idTrimestre={state.idTrimestre}
                                idCurso={state.idCurso}
                                idUsuario={state.idUsuario}
                                materia={state.materia}
                                estado={state.estado}
                            />
                            <PreguntasListEstudiante
                                idContenido={state.idContenido}
                                idCurso={state.idCurso}
                                idUsuario={state.idUsuario}
                                idTrimestre={state.idTrimestre}
                                estado={state.estado}
                            />
                        </>
                    }
                    {
                        opcion.aportes &&
                        <>
                            <AporteForm
                                nombre={state.nombre}
                                idContenido={state.idContenido}
                                idTrimestre={state.idTrimestre}
                                idCurso={state.idCurso}
                                idUsuario={state.idUsuario}
                                materia={state.materia}
                                estado={state.estado}
                            />
                            <AportesListEstudiante
                                idContenido={state.idContenido}
                                idCurso={state.idCurso}
                                idUsuario={state.idUsuario}
                                idTrimestre={state.idTrimestre}
                            />
                        </>
                    }
                    {
                        opcion.notas &&
                        <>
                            <NotaForm
                                estado={state.estado}
                                nombre={state.nombre}
                                idContenido={state.idContenido}
                                idTrimestre={state.idTrimestre}
                                idCurso={state.idCurso}
                                idUsuario={state.idUsuario}
                                materia={state.materia}
                            />
                            <NotasListEstudiante
                                idContenido={state.idContenido}
                                idCurso={state.idCurso}
                                idUsuario={usuarioLogeado.uid}
                                idTrimestre={state.idTrimestre}
                            />
                        </>
                    }
                    {
                        opcion.tareas &&
                        <>
                            <TareaForm
                                estado={state.estado}
                                idContenido={state.idContenido}
                                idCurso={state.idCurso}
                                idUsuario={usuarioLogeado.uid}
                                nombre={`${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`}
                                idTrimestre={state.idTrimestre}
                            />
                            <TareasListEstudiante
                                idCurso={state.idCurso}
                                idContenido={state.idContenido}
                                idUsuario={usuarioLogeado.uid}
                            />
                        </>
                    }
                    {
                        opcion.contenidos &&
                        <>
                            {console.log('contenidos')}
                            <TrimestresListEstudiante
                                ponerVideo={ponerVideo}
                                nombre={state.docente}
                                idCurso={props.match.params.idCurso}
                            />
                        </>
                    }
                </div>
            </div>
        </div >
    )
}

export default CursoDetalle
