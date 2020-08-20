import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Video from '../components/Video'
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';

class TeacherNew extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar
                    pagina="Página principal"
                />
                <Slider />
                <Video
                    titulo="Tutorial para estudiantes"
                    enlace="https://www.youtube.com/embed/Qei_RoUhK0U"
                />
                <Video
                    titulo="Tutorial para docentes"
                    enlace="https://www.youtube.com/embed/-bI0diefasA"
                />
                <Video
                    titulo="Tutorial básico de ZOOM"
                    enlace="https://www.youtube.com/embed/-bI0diefasA"
                />
            </React.Fragment>
        )
    };
};
export default TeacherNew;