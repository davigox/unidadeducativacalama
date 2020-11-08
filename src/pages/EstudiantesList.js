import React, { useEffect, useState } from 'react'
import EstudianteItem from '../components/EstudianteItem';
import { db } from '../firebase';

import './styles/EstudiantesList.css';
import logo from '../images/logo@2x.png';
// pdf
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const EstudiantesList = (props) => {
    const [curso, setCurso] = useState({
        curso: '',
        materia: '',
        docente: '',
        titulo: '',
    })
    const imprimirLista = () => {
        const doc = new jsPDF("landscape");
        doc.setFontSize(16)
        doc.text("Unidad Educativa", 25, 20,);
        doc.text("Calama tarde", 25, 25);
        doc.addImage(logo, 'PNG', 15, 15, 10, 10)
        doc.setLineWidth(0.5);
        doc.line(15, 27, 280, 27);
        
        doc.setFontSize(12)
        doc.setTextColor(100)
        doc.text(`Curso: ${curso.curso}`,20,32)
        doc.text(`Materia: ${curso.materia}`,20,37)
        doc.text(`Docente: ${curso.docente}`,20,42)
        doc.setTextColor(30)
        doc.text(`Lista de Calificaciones ${curso.titulo}`, 15, 50);
        const col = ['Nro.','Apellido Paterno', 'Apellido Materno', 'Nombres', 'Saber/45pts', 'Saber/45pts','Hacer/45pts','Hacer/45pts','Ser/Decidir/45pts']
        const lista = obtenerListaPdf()
        doc.autoTable({
            head: [col],
            body: lista,
            startY: 55,
        })
        // doc.addPage();
        // doc.text("Pagina 2", 20, 20)
        doc.save("ListaCalificaciones.pdf");
    }
    
    const obtenerListaPdf = () => {
        let datos = []
        state.data.map((doc, index) => {
            let temp = [index+1,doc.apellidoPaterno,doc.apellidoMaterno,doc.nombre,`Respuestas:${doc.respuestas} Calificación:${Math.round(doc.promedioRespuestas*.45)}pts`,`Aportes:${doc.aportes} Calificación:${Math.round(doc.promedioAportes*.45)}pts`,`Preguntas:${doc.preguntas} Calificación:${Math.round(doc.promedioPreguntas*.45)}pts`,`Tareas:${doc.tareas} Calificación:${Math.round(doc.promedioTareas*.45)}pts`,`Notas:${doc.notas} Calificación:${Math.round(doc.promedioNotas*.10)}pts`]
            datos.push(temp)
        })
        return datos
    }
    const getCurso = () => {
        db.collection('trimestres').doc(props.match.params.idTrimestre).get().then(doc => {
            if (doc.exists) {
                setCurso({
                    ...curso,
                    titulo: doc.data().titulo,
                    curso: doc.data().curso,
                    materia: doc.data().materia,
                    docente: doc.data().nombre,
                })
            } else {
                console.log('El curso no fue encontrado en la BD')
            }
        })
    }
    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
        getCurso()
    },[])
    useEffect(() => {
        const unsubscribe = db.collectionGroup('participaciones').orderBy('nombre').where('idTrimestre', '==', props.match.params.idTrimestre).where('rol', '==', 'estudiante').onSnapshot((querySnapshot) => {
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
                    Registro de participaciones
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
                <div className="EstudiantesList__row">
                    <div className="EstudiantesList__text1">
                        Trimestre:
                    </div>
                    <div className="EstudiantesList__text2">
                        {curso.titulo}
                    </div>
                </div>
                <button className="boton__imprimir" onClick={imprimirLista}>Lista en PDF</button>
            </div>
            <div className="EstudiantesList__scroll">
                {(state.data.length >= 1) ?
                    state.data.map((doc, index) => (
                        <EstudianteItem
                            idTrimestre={doc.idTrimestre}
                            key={index}
                            idUsuario={doc.idUsuario}
                            idCurso={props.match.params.idCurso}
                            nombre={doc.nombre}
                            apellidoPaterno={doc.apellidoPaterno}
                            apellidoMaterno={doc.apellidoMaterno}
                            promedioPreguntas={doc.promedioPreguntas}
                            preguntas={doc.preguntas}
                            promedioRespuestas={doc.promedioRespuestas}
                            respuestas={doc.respuestas}
                            promedioAportes={doc.promedioAportes}
                            aportes={doc.aportes}
                            promedioNotas={doc.promedioNotas}
                            notas={doc.notas}
                            promedioTareas={doc.promedioTareas}
                            tareas={doc.tareas}
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

export default EstudiantesList
