import React, { Fragment } from 'react';

import './styles/Navbar2.css';
import menu_arrow from '../images/menu-arrow.svg'
import logo from '../images/logo.svg'

class Navbar2 extends React.Component {
    state = {
        isCliked: false,
    }
    handleClick = () => {
        this.setState({
            isCliked: !this.state.isCliked
        })
        console.log(this.state.isCliked)
    }
    render() {
        return (
            <React.Fragment>
                <nav className="navbar">
                    <div className="navbar__back">
                        {/* eslint-disable-next-line */}
                        <a href="/" className="arrow" id="arrow"></a>
                    </div>
                    <div className="navbar__logo">
                        <img className="logo__img" src={logo} alt="logo" />
                        <div className="navbar__section-info">
                            <h3 className="navbar__titulo">
                                U.E. "Calama"
                                </h3>
                            <h3 className="navbar__titulo">
                                Plataforma web
                            </h3>
                        </div>
                    </div>
                    <div className="hamburger" onClick={this.handleClick}>
                        <div className="line">

                        </div>
                        <div className="line">

                        </div>
                        <div className="line">

                        </div>
                    </div>
                    <ul className={this.state.isCliked ? "nav-links nav-links--open" : "nav-links"}>
                        <div className="nav-links__pages">
                            <li><a href="#">Iniciar sesión <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Página Principal <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Clases Virtuales <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Horarios <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Plantel Docente <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a className="nav-links2" href="#">Mis Datos <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                        </div>
                        <div className="nav-links__admin">
                            <li><a href="#">Materias y Cursos <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Registrar Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Registrar Docentes <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Registrar Cursos <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                            <li><a href="#">Registrar Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></a></li>
                        </div>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
};
export default Navbar2;