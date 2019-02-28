import React from 'react';
import { shallow } from 'enzyme';

import {SettingsContainer} from '../src/client/js/settings_display.jsx';

describe('SettingsContainer', () => {
  test('Should render correctly', () => {
    const settingsContainer = shallow(<SettingsContainer/>);
    expect(settingsContainer).toMatchSnapshot();
  });
});
