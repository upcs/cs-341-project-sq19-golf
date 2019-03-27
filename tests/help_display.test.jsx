import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

import {HelpContainer} from '../src/client/js/help_display.jsx';

describe('helpContainer', () => {
  test('Should render correctly', () => {
    const helpContainer = shallow(<HelpContainer/>);
    expect(helpContainer).toMatchSnapshot();
  });

});