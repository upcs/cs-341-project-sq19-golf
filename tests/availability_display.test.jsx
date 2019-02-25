import React from 'react';
import { shallow } from 'enzyme';

import {AvailabilityContainer} from '../src/client/js/availability_display.jsx';

describe('AvailabilityContainer', () => {
  test('Should render correctly', () => {
    const availabilityContainer = render(<AvailabilityContainer/>);
    expect(availabilityContainer).toMatchSnapshot();
  });
});
