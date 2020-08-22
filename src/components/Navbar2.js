import React, { Fragment } from 'react';

import './styles/Navbar2.css';

class Navbar2 extends React.Component {
    state = {
        isCliked: false,
    }
    handleClick= ()=> {
        this.setState({
            isCliked: !this.state.isCliked
        })
        console.log(this.state.isCliked)
    }
    render(){
        return (
            <React.Fragment>
                <nav className="navbar">
                    <div className="hamburger" onClick={this.handleClick}>
                        <div className="line">

                        </div>
                        <div className="line">

                        </div>
                        <div className="line">

                        </div>
                    </div>
                    <ul className={this.state.isCliked? "nav-links nav-links.open" : "nav-links"}>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Projects</a></li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
};
export default Navbar2;