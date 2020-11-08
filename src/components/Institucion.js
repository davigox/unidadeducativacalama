import React from 'react'
import escudo_calama from '../images/escudo_calama.png'

import './styles/Institucion.css';

const Institucion = () => {
    return (
        <div className="Institucion">
            <div className="Institucion__centrado">
                <div className="Institucion__titulo">
                    Unidad Educativa "Calama"
                </div>
                <div className="Institucion__imagen">
                    <img src={escudo_calama} alt="calama"/>
                </div>
                <div className="Institucion__parrafo">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae aliquam rerum sit quos quisquam provident labore dolorum corporis optio, necessitatibus praesentium accusantium minus, corrupti deserunt consectetur quasi exercitationem qui! Accusantium?
                </div>
                <div className="Institucion__titulo">
                    Misión
                </div>
                <div className="Institucion__parrafo">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A atque inventore sint magnam expedita omnis vel deserunt culpa, ullam velit tempore in sapiente hic qui magni assumenda rem blanditiis! Sint?
                </div>
                <div className="Institucion__titulo">
                    Visión
                </div>
                <div className="Institucion__parrafo">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A atque inventore sint magnam expedita omnis vel deserunt culpa, ullam velit tempore in sapiente hic qui magni assumenda rem blanditiis! Sint?
                </div>
                <div className="Institucion__titulo">
                    Reseña histórica
                </div>
                <div className="Institucion__parrafo">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A atque inventore sint magnam expedita omnis vel deserunt culpa, ullam velit tempore in sapiente hic qui magni assumenda rem blanditiis! Sint?
                </div>
                <div className="Institucion__titulo">
                    Ubicación geográfica
                </div>
                <div className="Institucion__parrafo">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A atque inventore sint magnam expedita omnis vel deserunt culpa, ullam velit tempore in sapiente hic qui magni assumenda rem blanditiis! Sint?
                </div>
                <div className="Institucion__mapa">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.798694614688!2d-68.19221764239508!3d-16.532861572490408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915edee2cb8463f9%3A0x1d829f4d196141f7!2sColegio%20Mixto%20Calama!5e0!3m2!1ses-419!2sbo!4v1603582161969!5m2!1ses-419!2sbo" width="100%" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
            </div>
        </div>
    )
}

export default Institucion
