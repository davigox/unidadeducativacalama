import React from 'react';
import GeneralList from '../../pages/GeneralList';
import EstudiantesList from '../../pages/EstudiantesList';

import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';


describe('Tests de modulo de servicios', () => {
    test('Render del  componente GeneralList', () => {
        const generalList = mount(<Router><GeneralList/></Router>);
        expect(generalList.length).toEqual(1)
    })
    test('Render del  componente EstudiantesList', () => {
        const estudiantesList = mount(<Router><EstudiantesList/></Router>);
        expect(estudiantesList.length).toEqual(1)
    })
    // test('Render del  componente PreguntasList', () => {
    //     const preguntasList = mount(<Router><PreguntasList/></Router>);
    //     expect(preguntasList.length).toEqual(1)
    // })

})