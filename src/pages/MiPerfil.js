import React, { useContext } from 'react'
import { MyContext } from '../MyProvider';
import { Link } from 'react-router-dom';

import './styles/CrearCuenta.css'

import { useState } from 'react';
import { auth, db } from '../firebase';
import { useEffect } from 'react';

const MiPerfil = (props) => {
    const [clave, setClave] = useState({
        error: false,
        mensaje: '',
        codigo: ''
    });
    const [state, setState] = useState({
        nombre: '',
        curso: '',
        celular: 0,
        apellidoPaterno: '',
        apellidoMaterno: '',
    })
    const handleChangeForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const { usuarioLogeado, setUsuarioLogeado } = useContext(MyContext)
    useEffect(() => {
        db.collection('users').doc(props.match.params.idUsuario).get().then(doc => {
            if (doc.exists) {
                setState({
                    ...state,
                    nombre: doc.data().nombre,
                    apellidoPaterno: doc.data().apellidoPaterno,
                    apellidoMaterno: doc.data().apellidoMaterno,
                    curso: doc.data().curso,
                    celular: doc.data().celular === undefined? 0: doc.data().celular,
                })
            }
            else {
                console.log('El usuario no fue encontrado en la BD')
            }
        })
    }, [])
    const actualizarUsuario = async () => {
        try {
            let codigo = ''
            if (state.curso != '') {
                const code = state.curso.split(' ')
                codigo = code[0] + code[2]
            }

            db.collection('users').doc(props.match.params.idUsuario).update({
                nombre: state.nombre.trim().toUpperCase(),
                apellidoPaterno: state.apellidoPaterno.trim().toUpperCase(),
                apellidoMaterno: state.apellidoMaterno.trim().toUpperCase(),
                curso: state.curso,
                celular: parseInt(state.celular),
                codigo: codigo,
                fecha: new Date(),
            }).then(() => {
                console.log("Usuario Actualizado Correctamente")
                alert('Usuario Actualizado Correctamente');
                setUsuarioLogeado({
                    ...usuarioLogeado,
                    usuario: state.nombre.trim().toUpperCase(),
                    apellidoPaterno: state.apellidoPaterno.trim().toUpperCase(),
                    apellidoMaterno: state.apellidoMaterno.trim().toUpperCase(),
                    curso: state.curso,
                    codigo: codigo,
                })
                props.history.push('/');
            }).catch(e => {
                console.log("Error : " + e)
            })
        } catch (error) {
            console.log(error.message)
            setClave({
                ...clave,
                mensaje: error.message,
                error: true
            })
        }
        console.log('actualizado')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit")
        if (state.nombre.trim().length > 0) {
            actualizarUsuario()
        }
        else {
            setClave({
                ...clave,
                mensaje: 'El debes de llenar todos los campos',
                error: true
            })
        }
    }
    return (

        <div className="crearCuenta__container">
            <div className="crearCuenta--centrado">
                <div className="crearCuenta__header">
                    <div className="crearCuenta__titulo">
                        Mi Perfil
                    </div>
                    <div className="crearCuenta__subtitulo">
                        Aqui puedes actualizar tus datos
                    </div>
                </div>
                <form
                    className="crearCuenta__form"
                    onSubmit={handleSubmit}
                >
                    <label className="crearCuenta__form--label"> Nombres</label>
                    <input
                        id="nombre"
                        className="crearCuenta__form--input"
                        type="text"
                        name="nombre"
                        value={state.nombre}
                        onChange={handleChangeForm}
                    />
                    <label className="crearCuenta__form--label">Apellido Paterno</label>
                    <input
                        id="nombre"
                        className="crearCuenta__form--input"
                        type="text"
                        name="apellidoPaterno"
                        value={state.apellidoPaterno}
                        onChange={handleChangeForm}
                    />
                    <label className="crearCuenta__form--label">Apellido Materno</label>
                    <input
                        id="nombre"
                        className="crearCuenta__form--input"
                        type="text"
                        name="apellidoMaterno"
                        value={state.apellidoMaterno}
                        onChange={handleChangeForm}
                    />
                    <label className="crearCuenta__form--label"> Curso</label>
                    <select
                        name="curso"
                        className="crearCuenta__form--input"
                        onChange={handleChangeForm}
                        value={state.curso}
                    >
                        <option value="">Selecciona un Curso</option>
                        <option value="1 Primero A">1 Primero A</option>
                        <option value="1 Primero B">1 Primero B</option>
                        <option value="1 Primero C">1 Primero C</option>
                        <option value="1 Primero D">1 Primero D</option>
                        <option value="1 Primero E">1 Primero E</option>
                        <option value="2 Segundo A">2 Segundo A</option>
                        <option value="2 Segundo B">2 Segundo B</option>
                        <option value="2 Segundo C">2 Segundo C</option>
                        <option value="2 Segundo D">2 Segundo D</option>
                        <option value="2 Segundo E">2 Segundo E</option>
                        <option value="3 Tercero A">3 Tercero A</option>
                        <option value="3 Tercero B">3 Tercero B</option>
                        <option value="3 Tercero C">3 Tercero C</option>
                        <option value="3 Tercero D">3 Tercero D</option>
                        <option value="3 Tercero E">3 Tercero E</option>
                        <option value="4 Cuarto A">4 Cuarto A</option>
                        <option value="4 Cuarto B">4 Cuarto B</option>
                        <option value="4 Cuarto C">4 Cuarto C</option>
                        <option value="4 Cuarto D">4 Cuarto D</option>
                        <option value="4 Cuarto E">4 Cuarto E</option>
                        <option value="5 Quinto A">5 Quinto A</option>
                        <option value="5 Quinto B">5 Quinto B</option>
                        <option value="5 Quinto C">5 Quinto C</option>
                        <option value="5 Quinto D">5 Quinto D</option>
                        <option value="5 Quinto E">5 Quinto E</option>
                        <option value="6 Sexto A">6 Sexto A</option>
                        <option value="6 Sexto B">6 Sexto B</option>
                        <option value="6 Sexto C">6 Sexto C</option>
                        <option value="6 Sexto D">6 Sexto D</option>
                    </select>

                    <label className="crearCuenta__form--label"> Celular</label>
                    <input
                        id="celular"
                        className="crearCuenta__form--input"
                        type="number"
                        name="celular"
                        value={state.celular}
                        onChange={handleChangeForm}
                    />
                    <button
                        // onClick={this.handleClick} 
                        id="signupButton" className="crearCuenta__form--button"
                    >
                        Actualizar mi cuenta
                    </button>
                </form>
                <div className="crearCuenta__footer">

                </div>
                {clave.error && (<h4 className="crearCuenta__error">{clave.mensaje}</h4>)}
            </div>
        </div>
    )
}
export default MiPerfil;