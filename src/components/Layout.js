import React from 'react';
import Navbar from './Navbar';

function Layout (props) {
    
    return (
        <div>
            <Navbar updateUsuario={props.updateUsuario} getUsuario={props.getUsuario}/>
            {props.children} 

        </div>
    );
}

export default Layout