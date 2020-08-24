import React from 'react';
import Curso from '../components/Curso';
import Header from '../components/Header';
import CursoForm from '../components/CursoForm';
import { db } from '../firebase'
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';
import '../components/styles/utilities.css';

class VirtualClasses extends React.Component {
	state = {
		data: []
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
						{this.state.data.map(curso => {
							if (curso.nivel === "Inicial en Familia Comunitaria") {
								return <Curso
									nombre={curso.curso}
									profesor={curso.asesor}
									paralelo={curso.paralelo}
									color="color3"
									key={curso.id}
								/>
							}
							return <div key={curso.id} className="display-none"></div>
						})}
						<Header
							titulo="Primaria Comunitaria Vocacional"
							color="color2"
						/>
						{this.state.data.map(curso => {
							if (curso.nivel === "Primaria Comunitaria Vocacional") {
								return <Curso
									nombre={curso.curso}
									profesor={curso.asesor}
									paralelo={curso.paralelo}
									color="color3"
									key={curso.id}
								/>
							}
							return <div key={curso.id} className="display-none"></div>
						})}
						<Header
							titulo="Secundaria Comunitaria Productiva"
							color="color2"
						/>
						{this.state.data.map(curso => {
							if (curso.nivel === "Secundaria Comunitaria Productiva") {
								return <Curso
									nombre={curso.curso}
									profesor={curso.asesor}
									paralelo={curso.paralelo}
									color="color3"
									key={curso.id}
								/>
							}
							return <div key={curso.id} className="display-none"></div>
						})}
					</div>
				</div>

			</React.Fragment>
		)
	};
};
export default VirtualClasses;