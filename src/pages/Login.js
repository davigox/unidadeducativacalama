import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest} from '../actions';
import './styles/Login.css';
import {auth} from '../firebase';

class Login extends Component {
    state = {
        loading: false,
        error: null,
        form:{
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
    handleLogin = async(e) => {
        console.log("click login")
    }
    handleSubmit = async(e) => {
        e.preventDefault();
        try{
            this.setState({loading:true, error: null})
            await auth.signInWithEmailAndPassword(this.state.form.email, this.state.form.password);
            this.setState({loading: false})
            const userNew =  auth.currentUser;
            if(userNew){
                this.props.loginRequest(userNew)
            }

            console.log(this.props.user)
            this.props.history.push('/')
        }catch (error){
            this.setState({loading: false, error: error})
            this.props.loginRequest(false)
            console.log(this.props.user)
        }
    }
    render() {
        return (
            <div className="login__container">
                <div className="login__titulo">
                    <div>
                    Iniciar Sesión
                    </div>
                </div>
                <div className="login__centrado">
                    <form className="login__form" onSubmit={this.handleSubmit}>
                        <label className="login__form--label"> Correo Electronico Gmail</label>
                        <input 
                            id="signupNombres"
                            className="login__form--input" 
                            type="text"
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

                        <button onClick={this.handleLogin} id="signupButton" className="login__form--button" >Iniciar Sesión</button>
                        {this.state.error && (
                            <p className="error">{this.state.error.message}</p>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginRequest,
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps, mapDispatchToProps) (Login)