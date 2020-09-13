import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { loginRequest } from '../actions';

import './styles/Navbar2.css';
import menu_arrow from '../images/menu-arrow.svg'
import logo from '../images/logo.svg'

import { auth } from '../firebase';
import user from '../images/user.svg';
import arrow from '../images/arrow.svg';
// import Login from './Login';
class Navbar2 extends React.Component {

    state = {
        isCliked: false,
        isCliked2: false,
        user: this.props.user.displayName
    }
    handleClick = () => {
        this.setState({
            ...this.state,
            isCliked: !this.state.isCliked
        })
        console.log(this.state.isCliked)
    }
    handleClick2 = () => {
        this.setState({
            ...this.state,
            isCliked2: !this.state.isCliked2
        })
    }
    handleLogout = () => {
        auth.signOut()
        this.props.loginRequest(false)
        this.handleClick2()
    }
    render() {
        return (
            <React.Fragment>

                <nav className="navbar">

                    <Link to="/" className="navbar__logo">
                        <img className="logo__img" src={logo} alt="logo" />
                        <div className="navbar__section-info">
                            <h3 className="navbar__titulo">
                                U.E. "Calama"
                                </h3>
                            <h3 className="navbar__titulo">
                                Aplicación Web
                            </h3>
                        </div>
                    </Link>
                    {/* <div className="navbar__back"> */}
                    {/* eslint-disable-next-line */}
                    {/* <Link to="/" className="arrow" id="arrow"></Link> */}
                    {console.log("hola " + this.props.user)}
                    {this.props.user ?
                        (<div onClick={this.handleClick2} className="navbar__usuario">
                            <img className="usuario__imagen" src={user} alt="user" />
                            <div className="usuario__nombre">
                                {this.props.user.displayName|| this.state.user}
                            </div>
                            <img className="usuario__flecha" src={arrow} alt="" />
                        </div>)
                        // <button onClick={this.handleLogout} className="navbar__button">Cerrar Sesión</button>
                        : <Link to="/login" className="navbar__button">Iniciar Sesión</Link>
                    }

                    {/* </div> */}
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
                            <li><Link to="/createuser">Crear Usuario <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li onClick={this.handleLogout}><div>Cerrar Sesión <img src={menu_arrow} alt="Menu Arrow" /></div></li>
                            <li><Link to="/">Página Principal <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/clasesvirtuales">Clases Virtuales <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/horarios">Horarios <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/profesores">Plantel Docente <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link to="/calificaciones">Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                            <li><Link className="nav-links2" to="#">Mis Datos <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                        </div>
                        {
                            this.props.user && (
                                <div className="nav-links__admin">
                                    <li><Link to="editarclasesvirtuales">Editar Clases Virtuales <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                                    <li><Link to="#">Registrar Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                                    <li><Link to="#">Registrar Docentes <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                                    <li><Link to="/registrarcursos">Registrar Cursos <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                                    <li><Link to="#">Registrar Calificaciones <img src={menu_arrow} alt="Menu Arrow" /></Link></li>
                                </div>
                            )
                        }

                    </ul>
                </nav>
                <div className={this.state.isCliked2 ? "menu-user menu-user-open" : "menu-user"}>
                    <div className="menu-user__item">
                        <div className="menu-user__opcion opciones">!Hola, David Gonzalo Cusi Quispe</div>
                    </div>
                    <div className="menu-user__item">
                        <div className="menu-user__opcion opciones">Ver mi perfil</div>
                    </div>
                    <div className="menu-user__item">
                        <div onClick={this.handleLogout} className="menu-user__opcion cerrar-sesion">Cerrar Sesión</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = {
    loginRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);