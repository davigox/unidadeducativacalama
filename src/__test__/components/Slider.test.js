import React from 'react';
import ReactDOM from 'react-dom';
import Slider from '../../components/Slider';
import { mount } from 'enzyme';

// it('Render sin Fallar?', () => {
//     const div=document.createElement('div');
//     ReactDOM.render(<Slider/>, div);
// })
describe('<Slider/>', () => {
    test('Render del  componente', () => {
        const slider = mount(<Slider/>);
        expect(slider.length).toEqual(1)
    })
})