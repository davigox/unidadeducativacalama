import React, { Component } from 'react'

import Header from '../components/Header'
import CursoEdit from '../components/CursoEdit'
import CursoEditForm from '../components/CursoEditForm'

export default class VirtualClassesEdit extends Component {
    render() {
        return (
            <React.Fragment>
                <Header
                    titulo="Editar Clases Virtuales"
                    color="color1"
                />
                <CursoEditForm 
                    
                />
                <Header
                    titulo="Prof. David Gonzalo Cusi Quispe"
                    color="color2"
                />
                <CursoEdit
                    nombre="Primero"
                    materia="Matemática"
                    paralelo="A"
                    color="color3"
                    key="1"
                />
                
            </React.Fragment>
        )
    }
}
