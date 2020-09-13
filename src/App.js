import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import VirtualClasses from './pages/VirtualClasses';
import Schedules from './pages/Schedules';
import Teachers from './pages/Teachers';
import Qualifications from './pages/Qualifications';
import RegisterCourses from './pages/RegisterCourses';
import CursoDetails from './components/CursoDetails'
import VirtualClassesEdit from './pages/VirtualClassesEdit';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import { connect } from 'react-redux';
import { loginRequest } from './actions';
import { auth } from './firebase';


class App extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
       console.log("con user ", user)
       this.props.loginRequest(user)
      } else {
        console.log("no user")
        this.props.loginRequest(false)
      }
    });
  }

  render() {
    return (

      <BrowserRouter>
        <Layout>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/createuser" component={CreateUser} />
            <Route exact path="/clasesvirtuales" component={VirtualClasses} />
            <Route exact path="/horarios" component={Schedules} />
            <Route exact path="/profesores" component={Teachers} />
            <Route exact path="/calificaciones" component={Qualifications} />
            <Route exact path="/registrarcursos" component={RegisterCourses} />
            <Route exact path="/registrarcursos/:cursoId" component={CursoDetails} />
            <Route exact path="/editarclasesvirtuales" component={VirtualClassesEdit} />

            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}
const mapDispatchToProps = {
  loginRequest,
};


export default connect(null, mapDispatchToProps) (App)