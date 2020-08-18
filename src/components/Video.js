import React from 'react';
import './styles/Video.css'

class Video extends React.Component{
    render() {
        return <div className="Video">
            <div className="Video__section-header">
                <h3 className="Video__titulo--size-desktop">Tutorial para estudiantes</h3>
            </div>
            <div className="Video__section-video">
                <iframe className="Video__video--size-desktop" type="text/html"
            src='https://www.youtube.com/embed/-bI0diefasA' frameborder="0" allowfullscreen="true"></iframe>
            </div>
        </div>
    }
};

export default Video;