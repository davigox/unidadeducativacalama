import React from 'react';
// import {Link} from 'react-router-dom';
// import logo from '../images/logo.svg';
import './styles/Footer.css';
import youtube from '../images/youtube.svg';
import facebook from '../images/facebook.svg';
import correo from '../images/correo.svg';
import whatsapp from '../images/whatsapp.svg';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <h3 className="footer__titulo">Contactos para información:</h3>
                <div className="red">
                    <a target="_blank" rel="noopener noreferrer" className="red__uno" href="https://www.youtube.com/channel/UCjRgxPrsLdFjrLmkGktc6Gw?view_as=subscriber">
                        <img className="red__icono" src={youtube} alt="youtube" />
                        <h3 className="red__titulo">YouTube</h3>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="red__uno" href="https://www.facebook.com/david.g.cusiquispe">
                        <img className="red__icono" src={facebook} alt="facebook" />
                        <h3 className="red__titulo">Facebook</h3>
                    </a>
                </div>
                <div className="contacto">
                    <div className="contacto__uno">
                        <img className="contacto__icono" src={whatsapp} alt="whatsapp" />
                        <h3 className="red__titulo">Whatsapp: 63118128</h3>
                    </div>
                    <div className="contacto__uno">
                        <img className="contacto__icono" src={correo} alt="correo" />
                        <a className="red__titulo" href="mailto:robodavcuqupe@gmail.com">robodavcuqupe@gmail.com</a>
                    </div>
                </div>
            </footer>
        )
    };
};
export default Footer;