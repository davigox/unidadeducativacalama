import React, { Component } from 'react'

import './styles/Header.css'

 class Header extends Component {
    render() {
        return (
            <div className={ "header " + this.props.color}>
                <h3 className="header__text">
                    {this.props.titulo}
                </h3>
            </div>
        )
    }
}
export default Header