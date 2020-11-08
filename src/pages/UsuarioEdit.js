import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { useEffect } from 'react'
import { useContext } from 'react'
import { MyContext } from '../MyProvider'


// CSS
import './styles/UsuarioEdit.css'

// Imagenes
import cerrar from '../images/cerrar.svg'

const UsuarioEdit = (props) => {
    const {usuarioLogeado, setUsuarioLogeado} = useContext(MyContext)
    const [state, setState] = useState({
        nombre: '',
        rol: '',
        uid: '',
        error: false,
        mensaje: '',
    })
    const handleChangeForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm(`Estas seguro de guardar los cambios`)) {
            db.collection('users').doc(state.uid).update({
                nombre: state.nombre,
                rol: state.rol,
            }).then(() => {
                console.log("Usuario actualizado")
                setState({
                    ...state,
                    mensaje: 'Se guardo correctamente',
                    error: false,
                })
                setUsuarioLogeado({
                    ...usuarioLogeado,
                    usuario: state.nombre,
                    rol: state.rol,
                })
            }).catch(e => {
                console.log("Error : " + e)
                setState({
                    ...state,
                    mensaje: 'No se pudo guardar intentelo nuevamente',
                    error: true,
                })
            })
        }else{
            props.history.push('/vistaadministrativo');
        }
    }
    const getUser = async () => {
        const uid = props.match.params.idUsuario
        await db.collection('users').doc(uid).get().then(doc => {
            if(doc.exists){
                console.log('Usuario encontrado ',doc.data().nombre);
                setState({
                    ...state,
                    nombre: doc.data().nombre,
                    rol: doc.data().rol,
                    uid: doc.data().uid,
                })
            }
        });
    }
    useEffect(() => {
        getUser();
        console.log('render nuevo')
    }, [])
    return (
        <div className="usuarioEdit">
            <div className="usuarioEdit__centrado">
                <div className="usuarioEdit__header">
                    <div className="usuarioEdit__titulo">
                        Datos del Usuario
                    </div>
                    <Link to="/vistaadministrativo">
                        <img src={cerrar} alt="cerrar" />
                    </Link>
                </div>
                <form
                    className="usuarioEdit__form"
                    onSubmit={handleSubmit}
                >
                    <label className="usuarioEdit__label"> Nombre de Usuario</label>
                    <input
                        id="email"
                        className="usuarioEdit__input"
                        type="text"
                        name="nombre"
                        value={state.nombre}
                        onChange={handleChangeForm}
                    />
                    <label className="usuarioEdit__label"> Rol de Usuario</label>
                    <input
                        id="signupApellidos"
                        className="usuarioEdit__input"
                        type="text"
                        name="rol"
                        value={state.rol}
                        onChange={handleChangeForm}
                    />

                    <button
                        // onClick={this.handleClick} 
                        id="signupButton" className="usuarioEdit__button"
                    >
                        Guardar
                    </button>
                </form>
                {state.error && (<h4 className="usuarioEdit__error">{state.mensaje}</h4>)}
                {(state.mensaje !== '' && state.error === false) && (<h4 className="usuarioEdit__correcto">{state.mensaje}</h4>)}
            </div>
        </div>
    )
}
export default UsuarioEdit;