import React, { useContext } from 'react'
import { db } from '../firebase';
import { auth } from '../firebase';
import { MyContext } from '../MyProvider';

const CargarUsuariosItem = (props) => {
    const { setUsuarioLogeado } = useContext(MyContext)
    const crearUsuario = async () => {
        try {
            const result = await auth.createUserWithEmailAndPassword(props.email, props.password);
            await result.user.updateProfile({
                displayName: props.nombres.trim().toUpperCase()
            })
            let codigo = ''
            if (props.curso != '') {
                const code = props.curso.split(' ')
                codigo = code[0] + code[2]
            }
            db.collection('users').doc(result.user.uid).set({
                uid: result.user.uid,
                nombre: props.nombres.trim().toUpperCase(),
                apellidoPaterno: props.apellidoPaterno.trim().toUpperCase(),
                apellidoMaterno: props.apellidoMaterno.trim().toUpperCase(),
                email: props.email,
                curso: props.curso,
                codigo: codigo,
                fecha: new Date(),
                rol: props.rol,
            }).then(() => {
                console.log("Usuario creado Correctamente")
                alert('Usuario creado Correctamente');
                setUsuarioLogeado({
                    usuario: result.user.displayName,
                    uid: result.user.uid,
                    apellidoPaterno: props.apellidoPaterno.trim().toUpperCase(),
                    apellidoMaterno: props.apellidoMaterno.trim().toUpperCase(),
                    rol: props.rol,
                    curso: props.curso,
                    codigo: codigo,
                })
            }).catch(e => {
                console.log("Error de firestore: " + e.message)
            })
        }
        catch (error) {
            console.log("Error de auth: s" + error.message)
        }
    }
    const crearCuenta = () => {
        if (props.nombres.trim().length > 0 &&
            props.password.trim().length > 0 &&
            props.curso.trim().length > 0 &&
            props.rol.trim().length > 0 &&
            props.email.trim().length > 0) {
            crearUsuario()
        } else {
            console.log("Error de props")
        }
    }
    return (
        <div className="EstudianteItem">
            <div className="EstudianteItem__header">
                <div className="EstudianteItem__column">
                    <div className="EstudianteItem__ico">
                        {props.index}
                    </div>
                </div>
                <div className="EstudianteItem__column">
                    <div className="EstudianteItem__nombre">
                        {props.nombres}
                    </div>
                    <div className="EstudianteItem__apellido">
                        {`${props.apellidoPaterno} ${props.apellidoMaterno}`}
                    </div>
                </div>
                <div className="EstudianteItem__column">
                    <div className="EstudianteItem__titulo">
                        Curso
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.curso}
                    </div>
                </div>
                <div className="EstudianteItem__column">
                    <div className="EstudianteItem__titulo">
                        Correo
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.email}
                    </div>
                </div>
                <div className="EstudianteItem__column">
                    <div className="EstudianteItem__titulo">
                        celular
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.celular}
                    </div>
                </div>
                <div className="EstudianteItem__column">
                        <button onClick={crearCuenta}>CrearCuenta</button>
                </div>

            </div>
        </div>

    )
}

export default CargarUsuariosItem
