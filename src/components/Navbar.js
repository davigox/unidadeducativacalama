import React, { Fragment } from 'react';
// import {Link} from 'react-router-dom';
import logo from '../images/logo.svg';
import './styles/Navbar.css';
import './styles/animations.css'
import menu_arrow from '../images/menu-arrow.svg'
class Navbar extends React.Component {
    state = {
        isSitchedOn: false,

    }
    handleClick = ()=>{
        this.setState({
            isSitchedOn: !this.state.isSitchedOn
        })
        document.getElementById('body').classList.toggle('overflow--hidden');
    }
    render(){
        let body= document.getElementById("body");
        console.log(this.state.isSitchedOn);
        return (
            <React.Fragment>

                <div className={this.state.isSitchedOn? "blur blur--active" : "blur"} id="blur"></div>
                <div className="Navbar">
                    <div className="Navbar__btn-back">
                        {/* eslint-disable-next-line */}
                        <a href="/" className="arrow" id="arrow"></a>
                    </div>
                    <div className="Navbar__logo">
                        <img className="logo__img" src={logo} alt="logo" />
                        <div className="Navbar__section-info">
                            <h3 className="Navbar__titulo">
                                U.E. "Calama"
                                </h3>
                            <div className="Navbar__subtitulo">
                                {this.props.pagina}
                            </div>
                        </div>
                    </div>
                    <div className="Navbar__btn-menu">
                        <div onClick={this.handleClick } className={this.state.isSitchedOn? "burger-btn burger-btn--active" : "burger-btn"} id="burger-btn">
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                    </div>
                    {/* <div className={this.state.isSitchedOn? "navbar__menu menu--active" : "navbar__menu"}>
                        <div className="menu-container">
                            <ul className="menu">
                                <li className="menu__item">
                                    <a href="/clasesvirtuales" className="slideUp duration-3">
                                        Clases Virtuales<img src={menu_arrow} />
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="/clasesvirtuales" className="slideUp duration-3">
                                        Clases Virtuales<img src={menu_arrow} />
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="/clasesvirtuales" className="slideUp duration-3">
                                        Clases Virtuales<img src={menu_arrow} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div className={this.state.isSitchedOn? "navbar__menu menu--active" : "navbar__menu"}>
                        <div className="menu-container">
                            <ul className="menu">
                                <li className="menu__item">
                                    <a href="/clasesvirtuales" className="slideUp duration-3">
                                        Clases Virtuales<img src={menu_arrow} />
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="/clasesvirtuales" className="slideUp duration-3">
                                        Clases Virtuales<img src={menu_arrow} />
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a href="/clasesvirtuales" className="slideUp duration-3">
                                        Clases Virtuales<img src={menu_arrow} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
};
export default Navbar;