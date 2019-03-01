import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

import {SettingsContainer} from '../src/client/js/settings_display.jsx';

describe('SettingsContainer', () => {
  test('Should render correctly', () => {
    const settingsContainer = shallow(<SettingsContainer/>);
    expect(settingsContainer).toMatchSnapshot();
  });

  test('Should support onClick event on About button', () => {
      const clickCallback = Sinon.spy();
      const settingsContainer = shallow(<SettingsContainer onClick={clickCallback}/>);

      //Simulate an onClick event
      settingsContainer.find('#aboutButton').simulate("click");

      Sinon.assert.called(clickCallback);
  });
});
