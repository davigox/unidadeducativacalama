import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// agregando contexto a App.js
import { MyContext } from './MyProvider';

import { auth, db } from './firebase';

import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import CursoEdit from './pages/CursoEdit';
import IniciarCuenta from './pages/IniciarCuenta';
import CrearCuenta from './pages/CrearCuenta';
import MisCursosDocente from './pages/MisCursosDocente';
import NuevoCursoDocente from './pages/NuevoCursoDocente';
import NuevoYoutube from './pages/NuevoYoutube';
import YoutubeEdit from './pages/YoutubeEdit';
import VerCursosEstudiante from './pages/VerCursosEstudiante';
import MisCursosEstudiante from './pages/MisCursosEstudiante';
import CursoDetalle from './pages/CursoDetalle';
import MiPerfil from './pages/MiPerfil';
import PreguntaEdit from './pages/PreguntaEdit';
import YoutubeDetalle from './pages/YoutubeDetalle';
import PreguntaDetalle from './pages/PreguntaDetalle';
import EstudiantesList from './pages/EstudiantesList';
import GeneralList from './pages/GeneralList';
import EstudiantesCursoList from './pages/EstudiantesCursoList';
import GeneralDocentesList from './pages/GeneralDocentesList';
import CargarUsuarios from './pages/CargarUsuarios';
import Cuestionario from './pages/Cuestionario';
import NuevoCuestionario from './pages/NuevoCuestionario';
import EditarUsuario from './pages/EditarUsuario';
import CursosDocentesList from './pages/CursosDocentesList';
import OpcionesSistema from './pages/OpcionesSistema';



function App(props) {
  const { usuarioLogeado, setUsuarioLogeado } = useContext(MyContext)

  const [usuario, setUsuario] = useState({
    rol: 'sin_rol',
    displayName: 'Sin Usuario',
    uid: 'none',
    curso: 'Sin Curso',
    trimestres: true,
  })
  const cleanUsuario = () => {
    setUsuario({
      rol: 'Sin_Rol',
      displayName: 'Sin Usuario',
      uid: 'none',
      curso: 'Sin Curso'
    })
  }
  const updateEstado = () => {
    setUsuario({
      ...usuario
    })
  }
  const updateUsuario = (data, rol) => {
    setUsuario({
      ...usuario,
      rol: rol,
      displayName: data.displayName,
      uid: data.uid
    })
    console.log("update usuario" + usuario.rol)
  }
  const getUsuario = () => {
    return usuario
  }
  const updateRol = (rol) => {
    setUsuario({
      ...usuario,
      rol: rol
    })
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("con user ", user)
        db.collection('users').doc(user.uid).get().then(doc => {
          if (doc.exists) {
            db.collection('sistema').doc('calama').get().then(docSis => {
              if (docSis.exists) {
                setUsuarioLogeado({
                  ...usuarioLogeado,
                  usuario: doc.data().nombre,
                  apellidoPaterno: doc.data().apellidoPaterno,
                  apellidoMaterno: doc.data().apellidoMaterno,
                  uid: user.uid,
                  estado: doc.data().estado,
                  curso: doc.data().curso,
                  codigo: doc.data().codigo,
                  rol: doc.data().rol,
                  trimestres: docSis.data().trimestres,
                  cuenta: docSis.data().crearCuentas,
                  sesion: docSis.data().iniciarSesion
                })
                console.log('datos de sistema agregados', doc.data().trimestres)
              } else {
                console.log("no existe")
              }
            })
            console.log('usuario puesto en contexto')
          } else {
            console.log("no existe")
          }
        })
      } else {
        db.collection('sistema').doc('calama').get().then(docSis => {
          if (docSis.exists) {
            setUsuarioLogeado({
              ...usuarioLogeado,
              trimestres: docSis.data().trimestres,
              cuenta: docSis.data().crearCuentas,
              sesion: docSis.data().iniciarSesion
            })
            console.log('datos de sistema agregados')
          } else {
            console.log("no existe")
          }
        })
      }
    });
  }, [])

  return (

    <BrowserRouter>
      <Layout >

        <Switch>
          <Route exact path="/" component={Home} />
          {/* USUARIOS */}
          <Route
            exact
            path="/cargarusuarios"
            render={props => (
              <CargarUsuarios />)
            }
          />
          <Route exact path="/" component={Home} />
          {/* USUARIOS */}
          <Route
            exact
            path="/crearcuenta"
            render={props => (
              <CrearCuenta {...props} updateUsuario={updateUsuario} />)
            }
          />
          <Route
            exact
            path="/login"
            render={props => (
              <IniciarCuenta {...props} nombre={usuario.displayName} uid={usuario.uid} getUsuario={getUsuario} />)
            }
          />
          {/* ADMINISTRATIVO */}
          <Route
            exact
            path="/generalList"
            render={props => (
              <GeneralList {...props} />)
            }
          />
          <Route
            exact
            path="/generaldocenteslist"
            render={props => (
              <GeneralDocentesList {...props} />)
            }
          />
          <Route
            exact
            path="/miperfil/:idUsuario"
            render={props => (
              <MiPerfil {...props} />)
            }
          />
          <Route
            exact
            path="/editarusuario/:idUsuario"
            render={props => (
              <EditarUsuario {...props} />)
            }
          />
          <Route
            exact
            path="/cursosdocenteslist"
            render={props => (
              <CursosDocentesList {...props} />)
            }
          />
          <Route
            exact
            path="/opcionessistema"
            render={props => (
              <OpcionesSistema {...props} />)
            }
          />

          {/* DOCENTE */}
          <Route
            exact
            path="/miscursosdocente/:idDocente"
            render={props => (
              <MisCursosDocente {...props} />)
            }
          />
          <Route
            exact
            path="/:idUsuario/:idCurso/cursoedit"
            render={props => (
              <CursoEdit {...props} />)
            }
          />
          <Route
            exact
            path="/:idUsuario/:idCurso/:idContenido/youtubeedit"
            render={props => (
              <YoutubeEdit {...props} />)
            }
          />
          <Route
            exact
            path="/nuevocursodocente"
            render={props => (
              <NuevoCursoDocente {...props} />)
            }
          />
          <Route
            exact
            path="/preguntaedit/:idPregunta"
            render={props => (
              <PreguntaEdit {...props} />)
            }
          />
          <Route
            exact
            path="/:idUsuario/:idCurso/nuevoyoutube"
            render={props => (
              <NuevoYoutube {...props} />)
            }
          />
          <Route
            exact
            path="/estudianteslist/:idCurso/:idTrimestre"
            render={props => (
              <EstudiantesList {...props} />)
            }
          />
          <Route
            exact
            path="/estudiantescursolist/:idCurso/:codigo"
            render={props => (
              <EstudiantesCursoList {...props} />)
            }
          />
          <Route
            exact
            path="/nuevocuestionario/:idCurso/:idTrimestre"
            render={props => (
              <NuevoCuestionario {...props} />)
            }
          />
          {/* ESTUDIANTE */}
          <Route
            exact
            path="/vercursosestudiante/:idUsuario"
            render={props => (
              <VerCursosEstudiante {...props} />)
            }
          />
          <Route
            exact
            path="/miscursosestudiante/:idUsuario/:codigo"
            render={props => (
              <MisCursosEstudiante {...props} />)
            }
          />
          <Route
            exact
            path="/:idUsuario/:idCurso/cursodetalle"
            render={props => (
              <CursoDetalle {...props} />)
            }
          />
          <Route
            exact
            path="/youtubedetalle/:idCurso/:idContenido"
            render={props => (
              <YoutubeDetalle {...props} />)
            }
          />
          <Route
            exact
            path="/preguntadetalle/:idPregunta"
            render={props => (
              <PreguntaDetalle {...props} />)
            }
          />
          <Route
            exact
            path="/cuestionario/:idContenido/:idTrimestre"
            render={props => (
              <Cuestionario {...props} />)
            }
          />

          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
export default App;