import React from 'react';
import { connect } from 'react-redux'
import Slider from '../components/Slider';
// import Video from '../components/Video';
import Footer from '../components/Footer'
import '../components/styles/tablet.css';
import '../components/styles/desktop.css';
import VideoContainer from '../components/VideoContainer';

const Home = ({user}) => {
    return (
        <React.Fragment>

            <Slider />
            {/* {console.log(user)} */}
            <VideoContainer
                titulo="TUTORIAL: ZOOM"
                enlace="https://www.youtube.com/embed/Qei_RoUhK0U"
                autor="Autor: davigox.com"
                fecha="Fecha: 09/09/20"
                hora="Hora: 11:25 AM"

            />
            <VideoContainer
                titulo="TUTORIAL: INICIO EN GOOGLE CLASSROOM"
                enlace="https://www.youtube.com/embed/lzqex0u7850"
                autor="Autor: davigox.com"
                fecha="Fecha: 09/09/20"
                hora="Hora: 11:25 AM"

            />
            <VideoContainer
                titulo="TUTORIAL: PROGRAMAS DE PIZARRAS VIRTUALES PARA PROFESORES"
                enlace="https://www.youtube.com/embed/rpbmri9CihQ"
                autor="Autor: davigox.com"
                fecha="Fecha: 09/09/20"
                hora="Hora: 11:25 AM"

            />

            <Footer />
        </React.Fragment>
    )
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(Home)