import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';

class TeacherNew extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Navbar
                pagina="Página principal"
                />
                <Slider/>
            </React.Fragment>
        )
    };
};
export default TeacherNew;