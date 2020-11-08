import React from 'react';
import user from '../images/user.svg';

import './styles/ListaDocenteItem.css'

const ListaDocenteItem = (props) => {
    return (
        <div className="ListaDocenteItem">
            <div className="ListaDocenteItem__header">
                <div className="ListaDocenteItem__column numero">
                    <div className="ListaDocenteItem__ico">
                        {props.index}
                    </div>
                </div>
                <div className="ListaDocenteItem__column nombre">
                    <div className="ListaDocenteItem__nombre">
                        {props.nombre}
                    </div>
                    <div className="ListaDocenteItem__apellido">
                        {`${props.apellidoPaterno} ${props.apellidoMaterno}`}
                    </div>
                </div>
                <div className="ListaDocenteItem__column correo">
                    <div className="ListaDocenteItem__titulo">
                        Correo
                    </div>
                    <div className="ListaDocenteItem__numero">
                        {props.email}
                    </div>
                </div>
                <div className="ListaDocenteItem__column celular">
                    <div className="ListaDocenteItem__titulo">
                        celular
                    </div>
                    <div className="ListaDocenteItem__numero">
                        {props.celular}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaDocenteItem
