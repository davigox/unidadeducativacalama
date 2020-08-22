import React from 'react';
import Navbar from '../components/Navbar';
import ClassesList from '../components/ClassesList';
import Footer from '../components/Footer'
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';

class VirtualClasses extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="lista">
					<div className="list__container">
						<ClassesList/>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		)
	};
};
export default VirtualClasses;