import React, { Component } from 'react'
import mas from '../images/mas.svg'
import './styles/Header.css'

 class Header extends Component {
    render() {
        return (

            <div className="header__container">
                <div className={ "header " + this.props.color}>
                    <h3 className="header__text">
                        {this.props.titulo}
                    </h3>
                    <img onClick={this.props.onCliked} className="header__img" src={mas} alt="mas"/>
                </div>
            </div>
        )
    }
}
export default Header