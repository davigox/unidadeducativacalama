import React, { useState } from 'react';
import Slider from '../components/Slider';
import Footer from '../components/Footer'
import VideoContainer from '../components/VideoContainer';

import './styles/MenuHome.css';

import institucion from '../images/institucion.svg';
import horario from '../images/horario.svg';
import comunicados from '../images/comunicados.svg';
import galeria from '../images/galeria.svg';
import Institucion from '../components/Institucion';
import Horario from '../components/Horario';
import Comunicado from '../components/Comunicado';

const Home = ({ user }) => {
    const [state, setState] = useState({
        institucion: true,
        horario: false,
        comunicado: false,
        tutoriales: false,
    })
    const handleChangeInstitucion = (e) => {
        setState({
            ...state,
            institucion: !state.institucion,
            horario: false,
            comunicado: false,
            tutoriales: false,
        })
    }
    const handleChangeHorario = (e) => {
        setState({
            ...state,
            institucion: false,
            horario: !state.horario,
            comunicado: false,
            tutoriales: false,
        })
    }
    const handleChangeComunicado = (e) => {
        setState({
            ...state,
            institucion: false,
            horario: false,
            comunicado: !state.comunicado,
            tutoriales: false,
        })
    }
    const handleChangeTutoriales = (e) => {
        setState({
            ...state,
            institucion: false,
            horario: false,
            comunicado: false,
            tutoriales: !state.tutoriales,
        })
    }

    return (
        <React.Fragment>

            <Slider />
            <div className="MenuHome">
                <div className="MenuHome__opciones">
                    <div onClick={handleChangeInstitucion} name="institucion" className="MenuHome__opcion">
                        <div className="MenuHome__cuadro cuadroAmarillo">
                            <img src={institucion} alt="institucion" />
                        </div>
                        <div className="MenuHome__titulo">
                            Institución
                        </div>
                    </div>
                    <div onClick={handleChangeHorario} className="MenuHome__opcion">
                        <div className="MenuHome__cuadro cuadroAzul">
                            <img src={horario} alt="institucion" />
                        </div>
                        <div className="MenuHome__titulo">
                            Horario de Clases
                        </div>
                    </div>
                    <div onClick={handleChangeComunicado} className="MenuHome__opcion">
                        <div className="MenuHome__cuadro cuadroRojo">
                            <img src={comunicados} alt="institucion" />
                        </div>
                        <div className="MenuHome__titulo">
                            Comunicados
                        </div>
                    </div>
                    <div onClick={handleChangeTutoriales} className="MenuHome__opcion">
                        <div className="MenuHome__cuadro cuadroVioleta">
                            <img src={galeria} alt="institucion" />
                        </div>
                        <div className="MenuHome__titulo">
                            Tutoriales
                        </div>
                    </div>
                </div>

            </div>
            {
                state.institucion &&
                <Institucion

                />
            }
            {
                state.horario &&
                <Horario

                />
            }
            {
                state.comunicado &&
                <Comunicado

                />
            }
            {
                state.tutoriales &&  (
                    <>
                        <VideoContainer
                            titulo="000 Crear Cuenta de estudiante(Solo para Estudiantes)"
                            enlace="https://www.youtube.com/embed/AYyj7PXydNo"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="000 Crear Cuenta (Solo para docentes)"
                            enlace="https://www.youtube.com/embed/ka5VDGQiSBU"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="001 Iniciar Sesión y Cerrar Sesión"
                            enlace="https://www.youtube.com/embed/AbL8ktsFakM"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="002 Crear Cursos"
                            enlace="https://www.youtube.com/embed/PKUfJOoGIAY"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="003 Crear Trimestres"
                            enlace="https://www.youtube.com/embed/Xt5PWhBMviY"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="004 Compartir grupo de whatsapp"
                            enlace="https://www.youtube.com/embed/CXDwnScjqCg"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="005 Compartir clase classroom"
                            enlace="https://www.youtube.com/embed/IIFNu9PxSi0"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="006 Compartir reunión Zoom"
                            enlace="https://www.youtube.com/embed/dmLIdFyr5ws"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="007 Vista estudiante"
                            enlace="https://www.youtube.com/embed/0c_8_AO_BAA"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="008 Compartir video de Youtube"
                            enlace="https://www.youtube.com/embed/7Vo3gk1YlF8"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="009 Evaluaciones de contenidos"
                            enlace="https://www.youtube.com/embed/drSVCeU4eYk"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="010 Realizar preguntas y calificar preguntas"
                            enlace="https://www.youtube.com/embed/QLUwOVEU6YM"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="011 Realizar respuestas y calificar respuestas"
                            enlace="https://www.youtube.com/embed/xAum76lmgY4"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="012 Realizar aportes y calificar aportes"
                            enlace="https://www.youtube.com/embed/lN8CJ7I6qvU"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="013 Realizar apuntes y calificar apuntes"
                            enlace="https://www.youtube.com/embed/sBmXdSf8iVY"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="014 Realizar tareas y calificar tareas"
                            enlace="https://www.youtube.com/embed/_AKJihwx3rY"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                        <VideoContainer
                            titulo="015 Generar calificaciones trimestrales"
                            enlace="https://www.youtube.com/embed/vZelpq_Jz94"
                            autor="Autor: davigox.com"
                            fecha="Fecha: 11/11/20"
                            hora="Hora: 11:25 AM"
                        />
                    </>
                )
            }

            <Footer />
        </React.Fragment>
    )
};

export default Home;