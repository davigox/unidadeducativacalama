import React from 'react'
import { useState } from 'react'
import ListaForm from '../components/ListaForm'
import ListaItem from '../components/ListaItem'
import { db } from '../firebase'

import logo from '../images/logo@2x.png';

// pdf
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './styles/GeneralList.css'

const GeneralList = (props) => {
    const [state, setState] = useState({
        data: [],
        curso: '',
        error: '',
        mensaje: '',
    })
    const ponerCurso = (curso) => {
        setState({
            ...state,
            curso: curso
        })
    }
    let unsubscribe;
    const buscarEstudiantes = async (curso) => {
        unsubscribe = await db.collection('users').orderBy('apellidoPaterno').where('curso', '==', curso).where('rol', '==', 'estudiante').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idUsuario: doc.id });
            })
            setState({ ...state, data: docs })
            console.log("Lista cargada")
        })
    }

    const obtenerListaPdf = () => {
        let datos = []
        state.data.map((doc, index) => {
            let temp = [index+1,doc.apellidoPaterno,doc.apellidoMaterno,doc.nombre,doc.celular,doc.email]
            datos.push(temp)
        })
        return datos
    }
    const imprimirLista = () => {
        const doc = new jsPDF();
        doc.setFontSize(16)
        doc.text("Unidad Educativa", 25, 20,);
        doc.text("Calama tarde", 25, 25);
        doc.addImage(logo, 'PNG', 15, 15, 10, 10)
        doc.setLineWidth(0.5);
        doc.line(15, 27, 195, 27);
        const fecha = new Date();
        doc.setFontSize(12)
        doc.setTextColor(100)
        doc.text(`Curso: ${state.curso}`,20,32)
        // doc.text(`Materia: ${curso.materia}`,20,37)
        // doc.text(`Docente: ${curso.docente}`,20,42)
        doc.setTextColor(30)
        doc.text(`Fecha de impresión: ${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`, 105, 32,);
        doc.text("Lista de Estudiantes", 15, 37);
        const col = ['Nro.','Apellido Paterno', 'Apellido Materno', 'Nombres', 'Celular', 'Correo']
        const lista = obtenerListaPdf()
        doc.autoTable({
            head: [col],
            body: lista,
            startY: 42,
        })
        // doc.addPage();
        // doc.text("Pagina 2", 20, 20)
        doc.save("ListaEstudiantes.pdf");
    }

    return (
        <div className="EstudiantesList">
            <div className="EstudiantesList__header">
                <div className="EstudiantesList__titulo">
                    Lista de Estudiantes
                </div>
                <button className="boton__imprimir" onClick={imprimirLista}>Lista en PDF</button>
                <ListaForm
                    ponerCurso={ponerCurso}
                    buscarEstudiantes={buscarEstudiantes}
                />
            </div>
            <div className="EstudiantesList__scroll">
                {(state.data.length >= 1) ?
                    state.data.map((doc, index) => (
                        <ListaItem
                            key={doc.idUsuario}
                            index={index+1}
                            apellidoPaterno={doc.apellidoPaterno}
                            apellidoMaterno={doc.apellidoMaterno}
                            idUsuario={doc.idUsuario}
                            nombre={doc.nombre}
                            curso={doc.curso}
                            email={doc.email}
                            celular={doc.celular}
                            tutor={doc.tutor}
                            rol={doc.rol}
                            estado={doc.estado}
                        />
                    ))
                    : <div>
                        No hay estudiantes que participaron
                            </div>
                }
            </div>
        </div>
    )
}

export default GeneralList
