import React from 'react';

function Imagen({src}){
    let imgStyles={
        width:100+"%",
        height: 100+"%"

    }
    return <img src={src} alt="slide-imagen" style={imgStyles} />
}

export default Imagen;