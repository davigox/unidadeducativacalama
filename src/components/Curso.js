import React, { Component } from 'react';

import './styles/Curso.css';

class Curso extends Component {
    render() {
        return (
            <div className={"curso " + this.props.color}>
                <h3 className="curso__text">
                    {this.props.nombre}
                </h3>
                <h3 className="curso__text">
                    {this.props.profesor}
                </h3>
            </div>
        )
    }
}
export default Curso;
