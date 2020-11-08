import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import './styles/EstudiantesCursoList.css';
import logo from '../images/logo@2x.png';

// pdf
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const EstudiantesCursoList = (props) => {
    const imprimirLista = () => {
        const doc = new jsPDF();
        doc.setFontSize(16)
        doc.text("Unidad Educativa", 25, 20,);
        doc.text("Calama tarde", 25, 25);
        doc.addImage(logo, 'PNG', 15, 15, 10, 10)
        doc.setLineWidth(0.5);
        doc.line(15, 27, 195, 27);
        
        doc.setFontSize(12)
        doc.setTextColor(100)
        doc.text(`Curso: ${curso.curso}`,20,32)
        doc.text(`Materia: ${curso.materia}`,20,37)
        doc.text(`Docente: ${curso.docente}`,20,42)
        doc.setTextColor(30)
        doc.text("Lista de Estudiantes", 15, 50);
        const col = ['Nro.','Apellido Paterno', 'Apellido Materno', 'Nombres', 'Celular', 'Correo']
        const lista = obtenerListaPdf()
        doc.autoTable({
            head: [col],
            body: lista,
            startY: 55,
        })
        // doc.addPage();
        // doc.text("Pagina 2", 20, 20)
        doc.save("ListaEstudiantes.pdf");
    }
    
    const obtenerListaPdf = () => {
        let datos = []
        state.data.map((doc, index) => {
            let temp = [index+1,doc.apellidoPaterno,doc.apellidoMaterno,doc.nombre,doc.celular,doc.email]
            datos.push(temp)
        })
        return datos
    }

    const [curso, setCurso] = useState({
        curso: '',
        materia: '',
        docente: '',
        codigo: '',
    })
    const getCurso = () => {
        db.collection('cursos').doc(props.match.params.idCurso).get().then(doc => {
            if (doc.exists) {
                setCurso({
                    ...curso,
                    curso: doc.data().curso,
                    materia: doc.data().materia,
                    docente: doc.data().docente,
                    codigo: doc.data().codigo,
                })
            } else {
                console.log('El curso no fue encontrado en la BD')
            }
        })
    }

    useEffect(() => {
        getCurso()
    },[])
    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        const unsubscribe = db.collection('users').orderBy('apellidoPaterno').where('codigo', '==', props.match.params.codigo).where('rol', '==', 'estudiante').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), idUsuario: doc.id });
            })
            setState({ data: docs })
            console.log("Estudiantes cargados")
        })
        return unsubscribe
    }, [])
    return (
        <div className="EstudiantesList">
            <div className="EstudiantesList__header">
                <div className="EstudiantesList__titulo">
                    Lista de estudiantes
                </div>
                <div className="EstudiantesList__row">
                    <div className="EstudiantesList__text1">
                        Curso:
                    </div>
                    <div className="EstudiantesList__text2">
                        {curso.curso}
                    </div>
                </div>
                <div className="EstudiantesList__row">
                    <div className="EstudiantesList__text1">
                        Materia:
                    </div>
                    <div className="EstudiantesList__text2">
                        {curso.materia}
                    </div>
                </div>
                <div className="EstudiantesList__row">
                    <div className="EstudiantesList__text1">
                        Docente:
                    </div>
                    <div className="EstudiantesList__text2">
                        {curso.docente}
                    </div>
                </div>
                <button className="boton__imprimir" onClick={imprimirLista}>Lista en PDF</button>
            </div>
            <div className="EstudiantesList__scroll">
                {(state.data.length >= 1) ?
                    state.data.map((doc, index) => (
                        <div key={index}
                            className="EstudianteCursoItem"
                        >
                            <div className="EstudianteCursoItemColumn">
                                <div className="EstudianteCursoItemColumn__numero">
                                    {index+1}
                                </div>
                            </div>
                            <div className="EstudianteCursoItemColumn correo">
                                <div className="EstudianteCursoItemColumn__titulo">
                                    Apellidos y Nombres
                                </div>
                                <div className="EstudianteCursoItemColumn__subtitulo">
                                    {`${doc.apellidoPaterno} ${doc.apellidoMaterno} ${doc.nombre}`}
                                </div>
                            </div>
                            <div className="EstudianteCursoItemColumn celular">
                                <div className="EstudianteCursoItemColumn__titulo">
                                    Celular
                                </div>
                                <div className="EstudianteCursoItemColumn__subtitulo">
                                    {doc.celular}
                                </div>
                            </div>
                            <div className="EstudianteCursoItemColumn correo">
                                <div className="EstudianteCursoItemColumn__titulo">
                                    Correo
                                </div>
                                <div className="EstudianteCursoItemColumn__subtitulo">
                                    {doc.email}
                                </div>
                            </div>
                        </div>
                    ))
                    : <div>
                        No hay estudiantes que mostrar
                            </div>
                }
                
            </div>
        </div>
    )
}

export default EstudiantesCursoList
