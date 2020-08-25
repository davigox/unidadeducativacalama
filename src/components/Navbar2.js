import React from 'react';
import {Link} from 'react-router-dom'

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
                        <Link to="/" className="arrow" id="arrow"></Link>
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
                    <ul onClick={this.handleClick} className={this.state.isCliked ? "nav-links nav-links--open" : "nav-links"}>
                        <div className="nav-links__pages">
                            <li><Link to="/login">Iniciar sesión <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/">Página Principal <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/clasesvirtuales">Clases Virtuales <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/horarios">Horarios <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/profesores">Plantel Docente <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/calificaciones">Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link className="nav-links2" to="#">Mis Datos <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                        </div>
                        <div className="nav-links__admin">
                            <li><Link to="editarclasesvirtuales">Editar Clases Virtuales <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="#">Registrar Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="#">Registrar Docentes <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/registrarcursos">Registrar Cursos <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="#">Registrar Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                        </div>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
};
export default Navbar2;