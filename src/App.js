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
import VirtualClassesEdit from './pages/VirtualClassesEdit';


function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/clasesvirtuales" component={VirtualClasses} />
        <Route exact path="/horarios" component={Schedules} />
        <Route exact path="/profesores" component={Teachers} />
        <Route exact path="/calificaciones" component={Qualifications} />
        <Route exact path="/registrarcursos" component={RegisterCourses} />
        <Route exact path="/editarclasesvirtuales" component={VirtualClassesEdit} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
    </BrowserRouter>
  )
}

export default App;
