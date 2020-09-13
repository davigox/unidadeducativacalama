import React, { Component } from 'react'
import {auth} from '../firebase'
export const AppContext = React.createContext({
    user: true
});

export class AppContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false
        };
        this.toogleUser = this.toogleUser.bind(this);
    }
    toogleUser() {
        this.setState({ user: !this.state.user})
    }
    render() {
        auth.onAuthStateChanged(function (user) {
            if(user){
                this.setState({user: true})
            }else{
                this.setState({user: false})
            }
        })
        const{ children } = this.props;
        const { user } = this.state
        return (
            <AppContext.Provider
                value={{
                    user,
                    toogleUser: this.toogleUser
                }}
            >
                {children}
            </AppContext.Provider>
        )
    }
}
export const AppContextConsumer = AppContext.Consumer;