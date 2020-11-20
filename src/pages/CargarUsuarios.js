import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import * as XLSX from 'xlsx';
import CargarUsuariosItem from '../components/CargarUsuariosItem';
import { MyContext } from '../MyProvider';

import './styles/CargarUsuarios.css'
const CargarUsuarios = () => {
    const {usuarioLogeado} = useContext(MyContext)
    const [state, setState] = useState({
        data: []
    })
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' })
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data);
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
        promise.then((d) => {
            setState({
                data: d,
            })
        })
    }
    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        readExcel(file)
    }
    if (usuarioLogeado.rol !== 'administrador') {
        return <h1 className="noacceso">Ups! No tienes acceso a estos datos.</h1>
    } else {
        return (
            <div className="CargarUsuarios">
                <div className="CargarUsuarios__form">
                    <div className="CargarUsuarios__titulo">
                        Cargar Usuarios
                    </div>
                    <input className="CargarUsuarios__input" type="file" onChange={handleChangeFile} />
                </div>
                <div className="EstudiantesList__scroll">
                    {
                        state.data.map((doc, index) => (
                            <CargarUsuariosItem
                                index={index + 1}
                                key={index}
                                apellidoPaterno={doc.apellidoPaterno === undefined ? "" : doc.apellidoPaterno}
                                apellidoMaterno={doc.apellidoMaterno === undefined ? "" : doc.apellidoMaterno}
                                nombres={doc.nombres}
                                email={doc.email}
                                password={doc.password}
                                rol={doc.rol}
                                curso={doc.curso}
                            />

                        )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CargarUsuarios
