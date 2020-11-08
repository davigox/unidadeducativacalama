import React, { useContext, useState } from 'react'
import { MyContext } from '../MyProvider';
import { Link } from 'react-router-dom';

import './styles/IniciarCuenta.css'

import { auth, db } from '../firebase';

const IniciarCuenta = (props) => {
    const { usuarioLogeado, setUsuarioLogeado } = useContext(MyContext)
    const [clave, setClave] = useState({
        error: false,
        mensaje: '',
    });
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const handleChangeForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const logearUsuario = async (email, password) => {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            db.collection('users').doc(result.user.uid).get().then(doc => {
                if (doc.exists) {
                    setUsuarioLogeado({
                        ...usuarioLogeado,
                        usuario: result.user.displayName,
                        apellidoPaterno: doc.data().apellidoPaterno,
                        apellidoMaterno: doc.data().apellidoMaterno,
                        uid: result.user.uid,
                        rol: doc.data().rol,
                        curso: doc.data().curso,
                        codigo: doc.data().codigo
                    })
                } else {
                    auth.logout();
                }
            })
            alert('Bienvenido al sistema');
            props.history.push('/')
        } catch (error) {
            console.log(error)
            setClave({
                ...clave,
                mensaje: error.message,
                error: true
            })
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        if (state.password !== '' && state.email !== '') {
            logearUsuario(state.email, state.password)
        } else {
            setClave({
                ...clave,
                mensaje: 'El debese llenar todos los campos',
                error: true
            })
        }
    }
    return (

        <div className="iniciarCuenta__container">
            <div className="iniciarCuenta--centrado">
                <div className="iniciarCuenta__header">
                    <div className="iniciarCuenta__titulo">
                        Bienvenido!
                    </div>
                    <div className="iniciarCuenta__subtitulo">
                        Inicia sesión para continuar
                    </div>
                </div>
                <form
                    className="iniciarCuenta__form"
                    onSubmit={handleSubmit}
                >
                    <label className="iniciarCuenta__form--label"> Correo Electronico Gmail</label>
                    <input
                        id="email"
                        className="iniciarCuenta__form--input"
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChangeForm}
                    />
                    <label className="iniciarCuenta__form--label"> Contraseña</label>
                    <input
                        id="signupApellidos"
                        className="iniciarCuenta__form--input"
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChangeForm}
                    />
                    <div className="iniciaCuenta__texto">
                        ¿Olvidaste tu contraseña?
                    </div>
                    <button
                        // onClick={this.handleClick} 
                        id="signupButton" className="iniciarCuenta__form--button"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="iniciarCuenta__footer">
                    <div className="iniciarCuenta__footer--text">
                    ¿No tienes una cuenta?-
                    </div>
                    <Link to="/crearcuenta"className="iniciarCuenta__footer--link">Regístrate</Link>
                </div>
                {clave.error && (<h4 className="crearCuenta__error">{clave.mensaje}</h4>)}
            </div>
        </div>
    )
}
export default IniciarCuenta;