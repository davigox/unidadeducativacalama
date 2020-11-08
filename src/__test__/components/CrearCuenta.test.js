import React from 'react';
import CrearCuenta from '../../pages/CrearCuenta.js';
import IniciarCuenta from '../../pages/IniciarCuenta.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';


describe('Tests de modulo administracion de servicios', () => {
    test('Render del  componente CrearCuenta', () => {
        const crearcuenta = mount(<Router><CrearCuenta/></Router>);
        expect(crearcuenta.length).toEqual(1)
    })
    test('Render del  componente IniciarCuenta', () => {
        const iniciarcuenta = mount(<Router><IniciarCuenta/></Router>);
        expect(iniciarcuenta.length).toEqual(1)
    })

})