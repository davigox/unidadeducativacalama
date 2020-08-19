import React from 'react';
// import {Link} from 'react-router-dom';
import logo from '../images/logo.svg';
import './styles/Navbar.css';

class Navbar extends React.Component {
    render(){
        return (
                <div className="Navbar">
                    <div className="Navbar__btn-back">
                        {/* eslint-disable-next-line */}
                        <a href="/" className="arrow" id="arrow"></a>
                    </div>
                    <div className="Navbar__logo">
                        <div className="Navbar__logo--margen">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="Navbar__section-info">
                            <h3 className="Navbar__titulo">
                                U.E. "Calama"
                            </h3>
                            <div className="Navbar__subtitulo">
                                subtitulo
                            </div>
                        </div>
                    </div>  
                    <div className="Navbar__btn-menu">
                        <div className="burger-btn" id="burger-btn">
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                    </div>
                </div>
        )
    };
};
export default Navbar;