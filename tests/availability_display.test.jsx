import React from 'react';
import { shallow } from 'enzyme';

import {AvailabilityContainer, SelectInput} from '../src/client/js/availability_display.jsx';

describe('AvailabilityContainer', () => {
  test('Should render correctly', () => {
    const availabilityContainer = shallow(<AvailabilityContainer/>);
    expect(availabilityContainer).toMatchSnapshot();
  });
});

describe('SelectInput', () => {
  test('Should render correctly', () => {
    const selectInput = shallow(<SelectInput/>);
    expect(selectInput).toMatchSnapshot();
  });
});
