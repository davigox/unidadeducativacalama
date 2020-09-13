import React, { Component } from 'react'
import './styles/VideoContainer.css'

export default class VideoContainer extends Component {
    render() {
        return (
            <div className="video-container">
                <div className="video-container__main">
                    <div className="video-container__section-video">
                        <div className="video-container__video">
                            <iframe title={this.props.titulo} className="video-container__video--size" type="text/html"
                                src={this.props.enlace} frameBorder="0" allowFullScreen={true}></iframe>
                        </div>
                        <div className="video-container__titulo">
                            <div>
                                {this.props.titulo}
                            </div>
                        </div>
                    </div>
                    <div className="video-container__section-red">
                        <div className="video-container__info">
                            INFORMACIÓN:
                        </div>
                        <div className="video-container__autor">
                            {this.props.autor}
                        </div>
                        <div className="video-container__fecha">
                            {this.props.fecha}
                        </div>
                        <div className="video-container__hora">
                            {this.props.hora}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
