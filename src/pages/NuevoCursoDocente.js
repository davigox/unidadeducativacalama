import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, firestore, fb } from '../firebase';

// imagenes
import cerrar from '../images/cerrar.svg';
import { MyContext } from '../MyProvider';

// CSS
import './styles/NuevoCursoDocente.css';

const NuevoCursoDocente = (props) => {
    const { usuarioLogeado, setUsuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        curso: '',
        materia: '',
        error: false,
        mensaje: '',
        codigo: '',
    });
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const crearCursoNuevo = async () => {
        try {
            const codigo = state.curso.split(' ')
            console.log(codigo[0])
            if (window.confirm(`Quiere Crear el curso: ${state.curso} y materia: ${state.materia}`)) {
                await db.collection('cursos').doc().set({
                    curso: state.curso,
                    materia: state.materia,
                    idUsuario: usuarioLogeado.uid,
                    docente: `${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}`,
                    codigo: codigo[0]+codigo[2],
                    fecha: new Date(),
                })
               
                console.log('Curso creado correctamente')
                setState({
                    curso: '',
                    materia: '',
                    error: false,
                    mensaje:'Curso creado correctamente',
                })
                props.history.push(`/miscursosdocente/${usuarioLogeado.uid}`);
            }else{
                
            }

        } catch (error) {
            setState({
                ...state,
                error: true,
                mensaje:'Error al crear el curso intente nuevamente',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        crearCursoNuevo();
    }
    return (
        <div className="nuevoCursoDocente">
            <div className="nuevoCursoDocente__centrado">
                <div className="nuevoCursoDocente__header">
                    <div className="nuevoCursoDocente__titulo">
                        Crea un Nuevo Curso
                    </div>
                </div>
                <form
                    className="nuevoCursoDocente__form"
                    onSubmit={handleSubmit}
                >
                    <label className="nuevoCursoDocente__label"> Curso</label>
                    <select
                        name="curso"
                        className="nuevoCursoDocente__input"
                        onChange={handleChange}
                        value={state.curso}
                    >
                        <option value="">Selecciona un Curso</option>
                        <option value="1 Primero A">1 Primero A</option>
                        <option value="1 Primero B">1 Primero B</option>
                        <option value="1 Primero C">1 Primero C</option>
                        <option value="1 Primero D">1 Primero D</option>
                        <option value="1 Primero E">1 Primero E</option>
                        <option value="2 Segundo A">2 Segundo A</option>
                        <option value="2 Segundo B">2 Segundo B</option>
                        <option value="2 Segundo C">2 Segundo C</option>
                        <option value="2 Segundo D">2 Segundo D</option>
                        <option value="2 Segundo E">2 Segundo E</option>
                        <option value="3 Tercero A">3 Tercero A</option>
                        <option value="3 Tercero B">3 Tercero B</option>
                        <option value="3 Tercero C">3 Tercero C</option>
                        <option value="3 Tercero D">3 Tercero D</option>
                        <option value="3 Tercero E">3 Tercero E</option>
                        <option value="4 Cuarto A">4 Cuarto A</option>
                        <option value="4 Cuarto B">4 Cuarto B</option>
                        <option value="4 Cuarto C">4 Cuarto C</option>
                        <option value="4 Cuarto D">4 Cuarto D</option>
                        <option value="4 Cuarto E">4 Cuarto E</option>
                        <option value="5 Quinto A">5 Quinto A</option>
                        <option value="5 Quinto B">5 Quinto B</option>
                        <option value="5 Quinto C">5 Quinto C</option>
                        <option value="5 Quinto D">5 Quinto D</option>
                        <option value="5 Quinto E">5 Quinto E</option>
                        <option value="6 Sexto A">6 Sexto A</option>
                        <option value="6 Sexto B">6 Sexto B</option>
                        <option value="6 Sexto C">6 Sexto C</option>
                        <option value="6 Sexto D">6 Sexto D</option>
                        <option value="6 Sexto E">6 Sexto D</option>
                    </select>
                    <label className="nuevoCursoDocente__label"> Materia</label>
                    <select
                        name="materia"
                        className="nuevoCursoDocente__input"
                        onChange={handleChange}
                        value={state.materia}
                    >
                        <option value="">Seleccione una Materia</option>
                        <option value="MATEMÁTICA">MATEMÁTICA</option>
                        <option value="FÍSICA">FÍSICA</option>
                        <option value="QUÍMICA">QUÍMICA</option>
                        <option value="LENGUAS CASTELLANA Y ORIGINARIA">LENGUAS CASTELLANA Y ORIGINARIA</option>
                        <option value="BIOLOGÍA">BIOLOGÍA</option>
                        <option value="CIENCIAS SOCIALES">CIENCIAS SOCIALES</option>
                        <option value="HISTORIA">HISTORIA</option>
                        <option value="GEOGRAFÍA">GEOGRAFÍA</option>
                        <option value="EDUCACIÓN CÍVICA">EDUCACIÓN CÍVICA</option>
                        <option value="EDUCACIÓN FÍSICA Y DEPORTES">EDUCACIÓN FÍSICA Y DEPORTES</option>
                        <option value="EDUCACIÓN MUSICAL">EDUCACIÓN MUSICAL</option>
                        <option value="COSMOVISIONES Y FILOSOFÍA">COSMOVISIONES Y FILOSOFÍA</option>
                        <option value="ARTES PLÁSTICAS Y VISUALES">ARTES PLÁSTICAS Y VISUALES</option>
                        <option value="LENGUA EXTRANJERA">LENGUA EXTRANJERA</option>
                        <option value="PSICOLOGÍA">PSICOLOGÍA</option>
                        <option value="VALORES, ESPIRITUALIDAD Y RELIGIONES">VALORES, ESPIRITUALIDAD Y RELIGIONES</option>
                        <option value="TÉCNICA, TECNOLÓGICA GENERAL">TÉCNICA, TECNOLÓGICA GENERAL</option>
                        <option value="TÉCNICA, TECNOLÓGICA ESPECIALIZADA">TÉCNICA, TECNOLÓGICA ESPECIALIZADA</option>
                    </select>

                    <button
                        // onClick={this.handleClick} 
                        id="signupButton" className="nuevoCursoDocente__button"
                    >
                        Crear Curso
                    </button>
                </form>
                {state.error && (<h4 className="nuevoCursoDocente__error">{state.mensaje}</h4>)}
            </div>
        </div>
    )
}

export default NuevoCursoDocente
