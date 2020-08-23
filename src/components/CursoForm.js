import React, {useState} from 'react'

import './styles/CursoForm.css'

const CursoForm = (propps) => {
    const initialStateValues = {
        curso: '',
        nivel: '',
        asesor: ''
    }
    const [values, setValues] = useState(initialStateValues);

    const handleSubmit = e => {
        e.preventDefault();
        propps.addOrEditCourse(values);
    }
    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
        
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__div">
                <label>Curso</label>
                <input
                    onChange={handleInputChange}
                    className="form__input" type="text"
                    name="curso"
                // value={this.props.formValues.firstName}
                />
            </div>
            <div className="form__div">
                <label>Nivel</label>
                <input
                    onChange={handleInputChange}
                    className="form__input" type="text"
                    name="nivel"
                // value={this.props.formValues.lastName}
                />
            </div>
            <div className="form__div">
                <label>Asesor</label>
                <input
                    onChange={handleInputChange}
                    className="form__input" type="text"
                    name="asesor"
                // value={this.props.formValues.lastName}
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
export default CursoForm