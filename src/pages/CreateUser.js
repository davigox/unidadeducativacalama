import React, { Component } from 'react';
import './styles/Login.css'
import { auth } from '../firebase';
import PageLoading from '../components/PageLoading';
export default class CreateUser extends Component {
    state = {
        loading: false,
        error: null,
        form: {
            nombre: "",
            email: "",
            password: ""
        }
    }
    handleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log("escribe")
    }
    handleClick = async (email, password, e) => {
        console.log("click login")
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try{
            this.setState({loading:true, error: null})
            const result = await auth.createUserWithEmailAndPassword(this.state.form.email, this.state.form.password)
            this.setState({loading: false})
            result.user.updateProfile({
                displayName: this.state.form.nombre
            })
            this.props.history.push('/')
        } catch(error){
            this.setState({loading: false, error: error})
        }
    }
    render() {
        if(this.state.loading){
            return <PageLoading />
        }
        return (
            <div className="login__container">
                <div className="login__titulo">
                    <div>
                        Crear Usuario
                    </div>
                </div>
                <div className="login__centrado">
                    <form className="login__form" onSubmit={this.handleSubmit}>
                        <label className="login__form--label"> Nombres y Apellidos</label>
                        <input
                            id="nombre"
                            className="login__form--input"
                            type="text"
                            name="nombre"
                            value={this.state.form.nombre}
                            onChange={this.handleChange}
                        />
                        <label className="login__form--label"> Correo Electronico Gmail</label>
                        <input
                            id="email"
                            className="login__form--input"
                            type="email"
                            name="email"
                            value={this.state.form.email}
                            onChange={this.handleChange}
                        />
                        <label className="login__form--label"> Contraseña</label>
                        <input
                            id="signupApellidos"
                            className="login__form--input"
                            type="password"
                            name="password"
                            value={this.state.form.password}
                            onChange={this.handleChange}
                        />

                        <button onClick={this.handleClick} id="signupButton" className="login__form--button" >Crear Usuario</button>
                        {this.state.error && (
                            <p className="error">{this.state.error.message}</p>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}
