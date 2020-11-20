import React, { useEffect } from 'react'
import { useState } from 'react'
import ListaDocenteItem from '../components/ListaDocenteItem'
import ListaForm from '../components/ListaForm'
import ListaItem from '../components/ListaItem'
import { db } from '../firebase'

import logo from '../images/logo@2x.png';
import expandir from '../images/expandir.svg';
import add from '../images/add.svg';
import './styles/CursosDocentesList.css';
// pdf
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import CursosList from '../components/CursosList'
import FormCurso from '../components/FormCurso'

const DocenteItem = (props) => {
    const [state, setState] = useState({
        cursos: false,
        form: false,
    })
    const verContenidos = () => {
        setState({
            ...state,
            cursos: !state.cursos,
            form: false,
        })
    }
    const verForm = () => {
        setState({
            ...state,
            cursos: false,
            form: !state.form,
        })
    }
    return (
        <div className="DocenteItem">
            <div className="DocenteItem__datos">
                Prof. {`${props.nombre} ${props.apellidoPaterno} ${props.apellidoMaterno}`}
            </div>
            <div className="DocenteItem__opciones">
                <div
                    onClick={verContenidos}
                    className="TrimestreItem__img"
                >
                    <img className="TrimestreItem__expandir" src={expandir} alt="expandir" />
                </div>
                <div
                    onClick={verForm}
                    className="DocenteItem__img"
                >
                    <img className="TrimestreItem__expandir" src={add} alt="expandir" />
                </div>
            </div>
            {
                state.cursos &&
                <CursosList
                    idUsuario={props.idUsuario}
                />
            }
            {
                state.form &&
                <FormCurso 
                    idUsuario={props.idUsuario}
                    nombre={props.nombre}
                    apellidoPaterno={props.apellidoPaterno}
                    apellidoMaterno={props.apellidoMaterno}
                    verContenidos={verContenidos}
                />
            }
        </div>
    )
}

const CursosDocentesList = (props) => {
    const [state, setState] = useState({
        data: [],
        curso: '',
        error: '',
        mensaje: '',
    })
    useEffect(() => {
        buscarEstudiantes();
    }, [])
    const buscarEstudiantes = async (curso) => {
        const unsubscribe = await db.collection('users').orderBy('apellidoPaterno').where('rol', '==', 'docente').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idUsuario: doc.id });
            })
            setState({ data: docs })
            console.log("Lista cargada")
        })
        return unsubscribe
    }

    const obtenerListaPdf = () => {
        let datos = []
        state.data.map((doc, index) => {
            let temp = [index + 1, doc.apellidoPaterno, doc.apellidoMaterno, doc.nombre, doc.celular, doc.email]
            datos.push(temp)
        })
        return datos
    }
    const imprimirLista = () => {
        const doc = new jsPDF();
        doc.setFontSize(16)
        doc.text("Unidad Educativa", 25, 20,);
        doc.text("Calama tarde", 25, 25);
        const fecha = new Date();
        doc.addImage(logo, 'PNG', 15, 15, 10, 10)
        doc.setLineWidth(0.5);
        doc.line(15, 27, 195, 27);

        doc.setFontSize(12)
        doc.setTextColor(100)
        // doc.text(`Curso: ${curso.curso}`,20,32)
        // doc.text(`Materia: ${curso.materia}`,20,37)
        // doc.text(`Docente: ${curso.docente}`,20,42)
        doc.setTextColor(30)
        doc.text(`Fecha de impresión: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`, 105, 32,);
        doc.text("Lista de Docentes", 15, 32);
        const col = ['Nro.', 'Apellido Paterno', 'Apellido Materno', 'Nombres', 'Celular', 'Correo']
        const lista = obtenerListaPdf()
        doc.autoTable({
            head: [col],
            body: lista,
            startY: 37,
        })
        // doc.addPage();
        // doc.text("Pagina 2", 20, 20)
        doc.save("ListaDocentes.pdf");
    }

    return (
        <div className="EstudiantesList">
            <div className="EstudiantesList__header">
                <div className="EstudiantesList__titulo">
                    Lista de Docentes
                </div>
                <button className="boton__imprimir" onClick={imprimirLista}>Lista en PDF</button>
                {/* <ListaForm
                    buscarEstudiantes={buscarEstudiantes}
                /> */}
            </div>
            <div className="EstudiantesList__scroll">
                {(state.data.length >= 1) ?
                    state.data.map((doc, index) => (
                        <DocenteItem
                            key={doc.idUsuario}
                            index={index + 1}
                            apellidoPaterno={doc.apellidoPaterno}
                            apellidoMaterno={doc.apellidoMaterno}
                            idUsuario={doc.idUsuario}
                            nombre={doc.nombre}
                            curso={doc.curso}
                            email={doc.email}
                            celular={doc.celular}
                            tutor={doc.tutor}
                            estado={doc.estado}
                        />
                    ))
                    : <div>
                        No hay Docentes registrados en el Sistema
                            </div>
                }
            </div>
        </div>
    )
}

export default CursosDocentesList
