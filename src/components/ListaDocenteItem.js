import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import guardar from '../images/guardar.svg';
import { MyContext } from '../MyProvider';

import './styles/ListaDocenteItem.css'

const ListaDocenteItem = (props) => {
    const { usuarioLogeado } = useContext(MyContext)
    const [state, setState] = useState({
        nombre: props.nombre,
        email: props.email,
        curso: props.curso,
        celular: props.celular || "",
        apellidoPaterno: props.apellidoPaterno,
        apellidoMaterno: props.apellidoMaterno,
        estado: props.estado || '',
    })
    const [contenido, setContenido] = useState({
        nombre: props.nombre,
        email: props.email,
        curso: props.curso,
        celular: props.celular || "",
        apellidoPaterno: props.apellidoPaterno,
        apellidoMaterno: props.apellidoMaterno,
        estado: props.estado || '',
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

                <div className="ListaItem__column ">
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
                            type="text"
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
                {
                    usuarioLogeado.rol === 'administrador' &&
                    <div className="ListaItem__column">
                        <div className="ListaItem__row">
                            <div className="EstudianteItem__titulo">
                                Estado
                            </div>
                        </div>
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
                }
                {
                    usuarioLogeado.rol === 'administrador' &&
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
                }
            </div>
        </div>
    )
}

export default ListaDocenteItem
