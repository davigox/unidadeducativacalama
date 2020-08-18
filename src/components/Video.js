import React from 'react';
import './styles/Video.css'

class Video extends React.Component{
    render() {
        return <div className="Video">
            <div className="Video__section-header">
                <h3 className="Video__titulo--size-desktop">{this.props.titulo}</h3>
            </div>
            <div className="Video__section-video">
                <iframe className="Video__video--size-desktop" type="text/html"
            src={this.props.enlace} frameborder="0" allowfullscreen="true"></iframe>
            </div>
        </div>
    }
};

export default Video;