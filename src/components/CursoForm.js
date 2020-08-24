import React from 'react'

import './styles/CursoForm.css'

class CursoForm extends React.Component {

    state = {
        curso: '',
        numero: '',
        nivel: '',
        asesor: '',
        paralelo: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addOrEditCourse(this.state);
        this.setState({
            curso: '',
            numero: '',
            nivel: '',
            asesor: '',
            paralelo: ''
        })
    }
    handleNumero = (name, value) => {
        if (value === "Primero" && name === "curso") {
            this.setState({
                ...this.state,
                numero: "1",
                curso: "Primero"
            });
        } else if (value === "Segundo" && name === "curso") {
            this.setState({
                ...this.state,
                numero: "2",
                curso: "Segundo"
            });
        } else if (value === "Tercero" && name === "curso") {
            this.setState({
                ...this.state,
                numero: "3",
                curso: "Tercero"
            });
        } else if (value === "Cuarto" && name === "curso") {
            this.setState({
                ...this.state,
                numero: "4",
                curso: "Cuarto"
            });
        } else if (value === "Quinto" && name === "curso") {
            this.setState({
                ...this.state,
                numero: "5",
                curso: "Quinto"
            });
        } else if (value === "Sexto" && name === "curso") {
            this.setState({
                ...this.state,
                numero: "6",
                curso: "Sexto"
            });
        }
    }
    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        console.log(this.state)
        this.handleNumero(e.target.name, e.target.value)
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form__div">
                    <label>Curso</label>
                    <select
                        name="curso"
                        className="form__input"
                        onChange={this.handleInputChange}
                        value={this.state.curso}
                    >
                        <option value="" >Seleccione un curso</option>
                        <option value="Primero">Primero</option>
                        <option value="Segundo">Segundo</option>
                        <option value="Tercero">Tercero</option>
                        <option value="Cuarto">Cuarto</option>
                        <option value="Quinto">Quinto</option>
                        <option value="Sexto">Sexto</option>
                    </select>
                </div>
                <div className="form__div">
                    <label>Paralelo</label>
                    <select
                        name="paralelo"
                        className="form__input"
                        onChange={this.handleInputChange}
                        value={this.state.paralelo}
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
                        onChange={this.handleInputChange}
                        value={this.state.nivel}
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
                        onChange={this.handleInputChange}
                        className="form__input" type="text"
                        name="asesor"
                        value={this.state.asesor}
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
export default CursoForm