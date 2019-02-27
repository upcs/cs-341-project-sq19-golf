import React from 'react';
import { shallow } from 'enzyme';

import {SettingsContainer} from '../src/client/js/settings_display.jsx';

describe('AvailabilityContainer', () => {
  test('Should render correctly', () => {
    const settingsContainer = shallow(<SettingsContainer/>);
    expect(settingsContainer).toMatchSnapshot();
  });
});
