import React from 'react';
// import Curso from '../components/Curso';
import CursoEdit from '../components/CursoEdit'
import Header from '../components/Header';
import CursoForm from '../components/CursoForm';
import { db } from '../firebase';
import '../components/styles/utilities.css';
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';
import { Link } from 'react-router-dom';

class RegisterCourses extends React.Component {
    state = {
        data: []
    }
    deleteCourse = async(id) => {
        console.log("Borrado"+ id)
        if (window.confirm("Estas seguro de ELIMINAR el CURSO")){
            await db.collection('Cursos').doc(id).delete();
            console.log("Curso " + id + " Eliminado")
        }
    }
    addOrEditCourse = async (CourseObject) => {

        await db.collection('Cursos').doc().set(CourseObject)

        console.log('Nuevo Curso agregado')
    }
    getCourse = async () => {
        db.collection('Cursos').orderBy('numero').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            })
            // console.log(docs);
            this.setState({ data: docs })
            console.log(this.state.data)
        })

    }
    componentDidMount() {
        this.getCourse()
    }
    componentDidUpdate() {

    }
    render() {
        return (
            <React.Fragment>



                <div className="virtual">
                    <div className="virtual__container">
                        <Header
                            titulo="Registrar Cursos"
                            color="color1"
                        />
                        <CursoForm
                            addOrEditCourse={this.addOrEditCourse}
                        />
                        <Header
                            titulo="Secundaria Comunitaria Productiva"
                            color="color2"
                        />
                        {this.state.data.map(curso => {
                            if (curso.nivel === "Secundaria Comunitaria Productiva") {
                                return <Link key={curso.id} to={`/registrarcursos/${curso.id}`}>
                                            <CursoEdit
                                            deleteCourse= {this.deleteCourse}
                                            nombre={curso.curso}
                                            asesor={"Prof.:"+curso.asesor}
                                            paralelo={curso.paralelo}
                                            color="color3"
                                            key={curso.id}
                                            id={curso.id}
                                            />
                                </Link> 
                            }
                            return <div key={curso.id} className="display-none"></div>
                        })}
                    </div>
                </div>

            </React.Fragment>
        )
    };
}
export default RegisterCourses;