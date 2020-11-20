import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import guardar from '../images/guardar.svg';

import './styles/ListaItem.css'

const ListaItem = (props) => {
    const [state, setState] = useState({
        nombre: props.nombre,
        email: props.email,
        curso: props.curso,
        celular: props.celular || "",
        apellidoPaterno: props.apellidoPaterno,
        apellidoMaterno: props.apellidoMaterno,
        estado: props.estado,
    })
    const [contenido, setContenido] = useState({
        nombre: props.nombre,
        email: props.email,
        curso: props.curso,
        celular: props.celular || "",
        apellidoPaterno: props.apellidoPaterno,
        apellidoMaterno: props.apellidoMaterno,
        estado: props.estado,
    })
    const guardarCambiosContenido = async () => {
        if (contenido.nombre === state.nombre && contenido.apellidoMaterno === state.apellidoMaterno && contenido.apellidoPaterno === state.apellidoPaterno && contenido.email === state.email && contenido.curso === state.curso && contenido.celular === state.celular && contenido.estado === state.estado) {
            console.log('no cambio nada y no hacer nada')
        }
        else {
            if (window.confirm('Seguro que quiere guardar los cambios que hiciste?')) {
                await db.collection('users').doc(props.idUsuario).update({
                    nombre: state.nombre.trim().toUpperCase(),
                    apellidoPaterno: state.apellidoPaterno.trim().toUpperCase(),
                    apellidoMaterno: state.apellidoMaterno.trim().toUpperCase(),
                    email: state.email,
                    curso: state.curso,
                    celular: state.celular,
                    estado: state.estado,

                })
                setContenido({
                    ...contenido,
                    nombre: state.nombre.trim().toUpperCase(),
                    apellidoPaterno: state.apellidoPaterno.trim().toUpperCase(),
                    apellidoMaterno: state.apellidoMaterno.trim().toUpperCase(),
                    email: state.email,
                    curso: state.curso,
                    celular: state.celular,
                    estado: state.estado,
                })
                window.alert('Cambios guardados correctamente')
            }
        }
    }
    const handleChangeForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="ListaItem">
            <div className="ListaItem__header">
                <div className="ListaItem__column">
                    <div className="ListaItem__ico">
                        {props.index}
                    </div>
                </div>
                <div className="ListaItem__column">
                    <div className="ListaItem__row">
                        <div className="ListaItem__titulo">
                            Nombres:
                        </div>
                        <div className="ListaItem__titulo">
                            A. Paterno:
                        </div>
                        <div className="ListaItem__titulo">
                            A. Materno:
                        </div>
                    </div>
                    <div className="ListaItem__row">
                        <input
                            type="text"
                            className="ListaItem__input"
                            name="nombre"
                            value={state.nombre}
                            onChange={handleChangeForm}
                        />
                        <input
                            type="text"
                            className="ListaItem__input"
                            name="apellidoPaterno"
                            value={state.apellidoPaterno}
                            onChange={handleChangeForm}
                        />
                        <input
                            type="text"
                            className="ListaItem__input"
                            name="apellidoMaterno"
                            value={state.apellidoMaterno}
                            onChange={handleChangeForm}
                        />
                    </div>
                    <div className="ListaItem__row">
                        <div className="ListaItem__tituloCorreo">
                            Correo
                        </div>
                        <div className="ListaItem__titulo">
                            celular
                        </div>
                    </div>
                    <div className="ListaItem__row">
                        <input
                            type="email"
                            className="ListaItem__inputCorreo"
                            name="email"
                            value={state.email}
                            onChange={handleChangeForm}
                        />
                        <input
                            type="text"
                            className="ListaItem__input"
                            name="celular"
                            value={state.celular}
                            onChange={handleChangeForm}
                        />
                    </div>
                </div>
                <div className="ListaItem__column">
                    <div className="ListaItem__row">
                        <div className="ListaItem__titulo">
                            Curso
                        </div>
                    </div>
                    <div className="ListaItem__row">
                        <select
                            name="curso"
                            className="ListaItem__input"
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
                    </div>
                    <div className="ListaItem__row">
                        <div className="ListaItem__titulo">
                            Estado
                        </div>
                    </div>
                    <div className="ListaItem__row">
                        <select
                            name="estado"
                            className={`ListaItem__input ${state.estado}`}
                            onChange={handleChangeForm}
                            value={state.estado}
                        >
                            <option value="habilitado">habilitado</option>
                            <option value="deshabilitado">deshabilitado</option>
                        </select>

                    </div>
                </div>
                <div className="ListaItem__column">
                    <div className="ListaItem__row">
                        <div className="ListaItem__titulo">
                            Guardar
                        </div>
                    </div>
                    <div className="ListaItem__row">
                        <div className="cursoItem__img" onClick={guardarCambiosContenido}>
                            <img src={guardar} alt="editar" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ListaItem
