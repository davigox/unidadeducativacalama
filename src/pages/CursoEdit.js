import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';

import ContenidoItem from '../components/ContenidoItem';

import './styles/CursoEdit.css';

// imagenes
import add from '../images/add.svg';

import { Link } from 'react-router-dom';
import { MyContext } from '../MyProvider';
import TrimestreForm from '../components/TrimestreForm';
import TrimestresList from '../components/TrimestresList';
import TareasList from '../components/TareasList';
import TareaForm from '../components/TareaForm';
import NotasList from '../components/NotasList';
import AportesList from '../components/AportesList';
import PreguntasList from '../components/PreguntasList';
import PreguntaForm from '../components/PreguntaForm';

const CursoEdit = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [data, setData] = useState({
        data: []
    })
    const [state, setState] = useState({
        video: false,
        form: true,
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
    const ocultarForm = () => {
        setState({
            ...state,
            form: true,
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
            if (window.confirm(`Quiere actualizar a curso: ${state.curso} y materia: ${state.materia}`)) {
                let code = state.curso.split(' ')
                const codigo = code[0] + code[2]
                db.collection('cursos').doc(state.idCurso).update({
                    curso: state.curso,
                    codigo: codigo,
                    materia: state.materia,
                }).then(() => {
                    window.alert('Cuso Actualizado correctamente');
                })
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    const verTrimestres = () => {
        setState({
            ...state,
            form: false,
            trimestres: !state.trimestres
        })
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
    const [opcion, setOpcion] = useState({
        preguntas: false,
        aportes: false,
        notas: false,
        tareas: false,
        contenidos: true,
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
    const ponerVideo = (url, titulo, descripcion, idTrimestre, idContenido) => {
        setState({
            ...state,
            video: true,
            url: url,
            titulo: titulo,
            descripcion: descripcion,
            idContenido: idContenido,
            idTrimestre: idTrimestre,
        })
    }
    return (
        <div className="cursoEdit">
            <div className="cursoEdit__centrado">
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
                                    Apuntes
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
                <div className="cursoEdit__body">
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
                            {/* <TareaForm
                                idContenido={state.idContenido}
                                idCurso={state.idCurso}
                                idUsuario={usuarioLogeado.uid}
                                nombre={`${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`}
                                idTrimestre={state.idTrimestre}
                            /> */}
                            <TareasList
                                idCurso={state.idCurso}
                                idContenido={state.idContenido}
                                idUsuario={usuarioLogeado.uid}
                            />
                        </>
                    }
                    {
                        opcion.contenidos &&
                        <>
                            {
                                state.form &&
                                <TrimestreForm
                                    ocultarForm={ocultarForm}
                                    idCurso={state.idCurso}
                                    idUsuario={state.idUsuario}
                                    nombre={state.docente}
                                    curso={state.curso}
                                    materia={state.materia}
                                />
                            }
                            <TrimestresList
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
export default CursoEdit;



