import React from 'react';
import './styles/Video.css'

class Video extends React.Component{
    render() {
        return <div className="Video">
            <div className="Video__section-header">
                <h3 className="Video__titulo">{this.props.titulo}</h3>
            </div>
            <div className="Video__section-video">
                <iframe title={this.props.titulo} className="Video__video--size" type="text/html"
            src={this.props.enlace} frameBorder="0" allowFullScreen={true}></iframe>
            </div>
        </div>
    }
};

export default Video;