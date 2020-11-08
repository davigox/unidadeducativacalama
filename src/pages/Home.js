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
                    <div className="MenuHome__opcion">
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
            {/* <VideoContainer
                titulo="TUTORIAL: PROGRAMAS DE PIZARRAS VIRTUALES PARA PROFESORES"
                enlace="https://www.youtube.com/embed/rpbmri9CihQ"
                autor="Autor: davigox.com"
                fecha="Fecha: 09/09/20"
                hora="Hora: 11:25 AM"

            /> */}

            <Footer />
        </React.Fragment>
    )
};

export default Home;