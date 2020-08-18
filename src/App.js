import React from 'react';
import Video from './components/Video'
function App() {
  return (
    <React.Fragment>
      <Video
        titulo="Tutorial para estudiantes"
        enlace="https://www.youtube.com/embed/-bI0diefasA"
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
    
  );
}

export default App;
