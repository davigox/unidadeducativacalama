
import React, { useState } from 'react';
import { createContext } from 'react';

export const MyContext = createContext({})
const MyProvider = ({ children }) => {
    const [usuarioLogeado, setUsuarioLogeado] = useState({
        usuario: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        curso: '',
        uid: '',
        rol: '',
        url: '',
        descripcion: '',
        titulo: '',
        trimestres: '',
        sesion: '',
        cuenta: ''

    })
    return (
        <MyContext.Provider value={{ usuarioLogeado, setUsuarioLogeado }}>
            {children}
        </MyContext.Provider>
    )

}
export default MyProvider;