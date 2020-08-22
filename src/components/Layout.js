import React from 'react';
import Navbar2 from './Navbar2';

function Layout (props) {
    return (
        <div>
            <Navbar2 />
            {props.children} 

        </div>
    );
}

export default Layout