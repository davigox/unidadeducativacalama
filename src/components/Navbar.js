import React, { useState } from 'react';
import { Link } from 'react-router-dom'

// colocando contexto a Navbar2.js
import { useContext } from 'react'
import { MyContext } from '../MyProvider';
import { useEffect } from 'react';

import './styles/Navbar.css';
import user from '../images/user.svg'
import logo from '../images/escudo_calama_logo.svg'

import { auth } from '../firebase';
import logout from '../images/logout.svg';
import arrow from '../images/arrow.svg';
import cerrar from '../images/cerrar.svg';
import miscursos from '../images/miscursos.svg';
import cursos from '../images/cursos.svg';
import perfil from '../images/perfil.svg';

// import Login from './Login';
const Navbar = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        isCliked: false,
        isCliked2: false,
        user: "sin Usuario",
        rol: null
    })
    const handleClick = () => {
        setState({
            ...state,
            isCliked: !state.isCliked
        })

    }

    const handleClick2 = () => {
        setState({
            ...state,
            isCliked2: !state.isCliked2
        })

    }
    const handleLogout = () => {
        auth.signOut()
        handleClick2()
    }
    useEffect(() => {

    })
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

                {usuarioLogeado.usuario != '' ?
                    (<div onClick={handleClick2} className="navbar__usuario">
                        <img className="usuario__imagen" src={user} alt="user" />
                        <div className="usuario__nombre">
                            {`${usuarioLogeado.usuario} ${usuarioLogeado.apellidoPaterno} ${usuarioLogeado.apellidoMaterno}` || state.user}
                        </div>
                    </div>)
                    : <Link to="/login" className="navbar__button">Iniciar Sesión</Link>
                }
                {
                    usuarioLogeado.uid &&
                    <div className="hamburger" onClick={handleClick}>
                        <div className="line">

                        </div>
                        <div className="line">

                        </div>
                        <div className="line">

                        </div>
                    </div>

                }
                <div onClick={handleClick} className={state.isCliked ? "nav-links nav-links--open" : "nav-links"}>
                    <div className="nav-links__opciones">
                        {
                            usuarioLogeado.rol === 'administrador' &&
                            <Link to={`/generallist`} className="navlinks__opcion" >
                                <img src={miscursos} alt="Miscuros" />
                                <div>Lista de Estudiantes</div>
                            </Link>
                        }
                        {
                            (usuarioLogeado.rol === 'administrador' || usuarioLogeado.rol === 'docente' || usuarioLogeado.rol === 'estudiante') &&
                            <Link to={`/generaldocenteslist`} className="navlinks__opcion" >
                                <img src={miscursos} alt="Miscuros" />
                                <div>Todos los Docentes</div>
                            </Link>
                        }
                        {
                            usuarioLogeado.rol === 'administrador' &&
                            <Link to={`/cargarusuarios`} className="navlinks__opcion" >
                                <img src={miscursos} alt="Miscuros" />
                                <div>Cargar Usuarios</div>
                            </Link>
                        }
                        {
                            usuarioLogeado.rol === 'administrador' &&
                            <Link to={`/cursosdocenteslist`} className="navlinks__opcion" >
                                <img src={cursos} alt="Miscuros" />
                                <div>Cursos de Docentes</div>
                            </Link>
                        }
                        {
                            usuarioLogeado.rol === 'administrador' &&
                            <Link to={`/opcionessistema`} className="navlinks__opcion" >
                                <img src={cursos} alt="Miscuros" />
                                <div>Opciones de Sistema</div>
                            </Link>
                        }
                        {
                            usuarioLogeado.rol === 'docente' &&
                            <Link to={`/miscursosdocente/${usuarioLogeado.uid}`} className="navlinks__opcion" >
                                <img src={cursos} alt="Miscuros" />
                                <div>Mis cursos</div>
                            </Link>
                        }
                        {
                            usuarioLogeado.rol === 'estudiante' &&
                            <Link to={`/miscursosestudiante/${usuarioLogeado.uid}/${usuarioLogeado.codigo}`} className="navlinks__opcion" >
                                <img src={cursos} alt="Miscuros" />
                                <div>Mis cursos</div>
                            </Link>
                        }
                        {
                            (usuarioLogeado.rol === 'estudiante' || usuarioLogeado.rol === 'docente' || usuarioLogeado.rol === 'administrador') &&
                            <Link to={`/miperfil/${usuarioLogeado.uid}`} className="navlinks__opcion" >
                                <img src={perfil} alt="Miscuros" />
                                <div>Mi perfil</div>
                            </Link>
                        }
                        {
                            usuarioLogeado.usuario !== '' &&
                            <div
                                onClick={handleLogout}
                                className="navlinks__opcion">
                                <img src={logout} alt="Miscuros" />
                                <div>Cerrar Sesión</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>

        </React.Fragment>
    )
};
export default Navbar;