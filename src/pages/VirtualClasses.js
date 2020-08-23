import React from 'react';
import Curso from '../components/Curso';
import Header from '../components/Header';
import CursoForm from '../components/CursoForm';
import {db} from '../firebase'
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';
import '../components/styles/utilities.css';

class VirtualClasses extends React.Component {
	addOrEditCourse = async (CourseObject) => {
		console.log(CourseObject)
		await db.collection('Cursos').doc().set(CourseObject)
		console.log('Nuevo Curso agregado')
    }
	render() {
		return (
			<React.Fragment>

				<CursoForm 
					addOrEditCourse={this.addOrEditCourse}
				/>

				<div className="virtual">
					<div className="virtual__container">
						<Header 
							titulo="Clases Viruales"
							color="color1" 
						/>
						<Header 
							titulo="Inicial en Familia Comunitaria"
							color="color2"
						/>
						<Curso 
							nombre="Primera Sección" 
							profesor="Prof. Carmen"
							color="color3"
						/>
						<Curso 
							nombre="Segunda Sección" 
							profesor="Prof. Silvia"
							color="color3"
						/>
					</div>
				</div>

			</React.Fragment>
		)
	};
};
export default VirtualClasses;