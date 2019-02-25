import React from 'react';
import { shallow } from 'enzyme';

import {SchedulesContainer} from '../src/client/js/schedule_display.jsx';

describe('SchedulesContainer', () => {
  test('Should render correctly', () => {
    const schedulesContainer = shallow(<SchedulesContainer/>);
    expect(schedulesContainer).toMatchSnapshot();
  });
});
