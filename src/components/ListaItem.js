import React from 'react';
import user from '../images/user.svg';
const ListaItem = (props) => {
    return (
        <div className="EstudianteItem">
            <div className="EstudianteItem__header">
                <div className="EstudianteItem__column">
                    <div className="EstudianteItem__ico numero">
                        {/* <img src={user} alt="user" /> */}
                        {props.index}
                    </div>
                </div>
                <div className="EstudianteItem__column nombre">
                    <div className="EstudianteItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="EstudianteItem__apellido">
                        {`${props.apellidoPaterno} ${props.apellidoMaterno}`}
                    </div>
                </div>
                <div className="EstudianteItem__column celular">
                    <div className="EstudianteItem__titulo">
                        Curso
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.curso}
                    </div>
                </div>
                <div className="EstudianteItem__column correo">
                    <div className="EstudianteItem__titulo">
                        Correo
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.email}
                    </div>
                </div>
                <div className="EstudianteItem__column celular">
                    <div className="EstudianteItem__titulo">
                        celular
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.celular}
                    </div>
                </div>
                {/* <div className="EstudianteItem__column">
                    <div className="EstudianteItem__titulo">
                        Padre/Madre/Tutor
                    </div>
                    <div className="EstudianteItem__numero">
                        {props.tutor}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ListaItem
