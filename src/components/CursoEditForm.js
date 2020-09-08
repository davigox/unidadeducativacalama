import React, { Component } from 'react'
import './styles/CursoForm.css'

export default class CursoEditForm extends Component {
    render() {
        return (
            <form className="form" 
            // onSubmit={this.handleSubmit}
            >
                <div className="form__div">
                    <label>Curso</label>
                    <select
                        name="curso"
                        className="form__input"
                        // onChange={this.handleInputChange}
                        // value={this.state.curso}
                    >
                        <option value="" >Seleccione un curso</option>
                        <option value="Primero A">Primero A</option>
                        <option value="Primero B">Primero B</option>
                        <option value="Primero C">Primero C</option>
                        <option value="Primero D">Primero D</option>
                        <option value="Primero E">Primero E</option>
                        <option value="Segundo A">Segundo A</option>
                        <option value="Segundo B">Segundo B</option>
                        <option value="Segundo C">Segundo C</option>
                        <option value="Segundo D">Segundo D</option>
                        <option value="Segundo E">Segundo E</option>
                        <option value="Tercero A">Tercero A</option>
                        <option value="Tercero B">Tercero B</option>
                        <option value="Tercero C">Tercero C</option>
                        <option value="Tercero D">Tercero D</option>
                        <option value="Tercero E">Tercero E</option>
                        <option value="Cuarto">Cuarto A</option>
                        <option value="Quinto">Quinto A</option>
                        <option value="Sexto">Sexto A</option>
                    </select>
                </div>
                <div className="form__div">
                    <label>Paralelo</label>
                    <select
                        name="paralelo"
                        className="form__input"
                        // onChange={this.handleInputChange}
                        // value={this.state.paralelo}
                    >
                        <option value="">Seleccione un paralelo</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
                <div className="form__div">
                    <label>Nivel de Escolaridad</label>
                    <select
                        name="nivel"
                        className="form__input"
                        // onChange={this.handleInputChange}
                        // value={this.state.nivel}
                    >
                        <option value="">Seleccione un nivel</option>
                        <option value="Inicial en Familia Comunitaria">Inicial en Familia Comunitaria</option>
                        <option value="Primaria Comunitaria Vocacional">Primaria Comunitaria Vocacional</option>
                        <option value="Secundaria Comunitaria Productiva">Secundaria Comunitaria Productiva</option>
                    </select>
                </div>
                <div className="form__div">
                    <label>Asesor</label>
                    <input
                        // onChange={this.handleInputChange}
                        className="form__input" type="text"
                        name="asesor"
                        // value={this.state.asesor}
                    />
                </div>
                <button
                    // onClick={this.handleClick}
                    className="form__btn">
                    Agregar Curso
                        </button>
            </form>
        )
    }
}
