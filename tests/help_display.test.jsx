import React from 'react';
import { shallow, render, setState } from 'enzyme';
import Sinon from 'sinon';

import {HelpContainer} from '../src/client/js/help_display.jsx';

describe('HelpContainer', () => {
  test('Should render correctly', () => {
    const helpContainer = render(<HelpContainer/>);
    expect(helpContainer).toMatchSnapshot();
  });
});
