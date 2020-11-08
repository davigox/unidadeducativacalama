import React from 'react';
import MisCursosDocente from '../../pages/MisCursosDocente';
import MisCursosEstudiante from '../../pages/MisCursosEstudiante';
import PreguntasList from '../../components/PreguntasList';
import RespuestasList from '../../components/RespuestasList';
import ClassroomForm from '../../components/ClassroomForm';
import GeneralList from '../../pages/GeneralList';

import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';


describe('Tests de modulo de servicios', () => {
    test('Render del  componente MisCursosDocente', () => {
        const misCursosDocente = mount(<Router><MisCursosDocente/></Router>);
        expect(misCursosDocente.length).toEqual(1)
    })
    test('Render del  componente MisCursosEstudiante', () => {
        const misCursosEstudiante = mount(<Router><MisCursosEstudiante/></Router>);
        expect(misCursosEstudiante.length).toEqual(1)
    })
    // test('Render del  componente PreguntasList', () => {
    //     const preguntasList = mount(<Router><PreguntasList/></Router>);
    //     expect(preguntasList.length).toEqual(1)
    // })

})