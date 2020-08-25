import React, { Component } from 'react'

import './styles/CursoEdit.css'
import editar from '../images/editar.svg'
import borrar from '../images/borrar.svg'

export default class CursoEdit extends Component {
    render() {
        return (
            
            <div className={"curso-edit " + this.props.color}>
                <div className="curso-edit__container1">
                    <h3 className="curso-edit__text1">
                        <div>{this.props.nombre }</div>
                        <div>{ this.props.paralelo}</div>
                    </h3>
                    <h3 className="curso-edit__text2">
                        {this.props.materia}
                    </h3>
                </div>
                <div className="curso-edit__container2">
                    <img className="curso-edit__img" src={editar} alt="editar" />
                    <img className="curso-edit__img" src={borrar} alt="borrar" />
                </div>
            </div>
                
        )
    }
}
