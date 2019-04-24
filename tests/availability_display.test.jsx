import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import { shallow, render } from 'enzyme';

import {AvailabilityContainer, SelectInput} from '../src/client/js/availability_display.jsx';

console.warn = jest.fn();

describe('AvailabilityContainer', () => {
  test('Should render correctly with a menu', () => {
    const availabilityContainer = render(<HashRouter><AvailabilityContainer showMenu={true}/></HashRouter>);
    expect(availabilityContainer).toMatchSnapshot();
  });

  test('Should render correctly without a menu', () => {
    const availabilityContainer = render(<HashRouter><AvailabilityContainer showMenu={false}/></HashRouter>);
    expect(availabilityContainer).toMatchSnapshot();
  });

  test('Should allow for the menu to be closed and opened', () => {
    //Mock ups of important objects for the showMenu/closeMenu functions
    const event = Object.assign(jest.fn(), { preventDefault: () => {}});
    const dropdownMenu = Object.assign(jest.fn(), { contains: (e) => {}});
    const props = { showMenu: false, dropdownMenu: dropdownMenu };

    const availabilityContainer = shallow(<AvailabilityContainer {...props}/>);
    expect(availabilityContainer).toMatchSnapshot();

    //Open the menu
    availabilityContainer.instance().showMenu(event);
    expect(availabilityContainer.instance().props.showMenu).toBe(false);

    //Close the menu
    availabilityContainer.instance().closeMenu(event);
    expect(availabilityContainer.instance().props.showMenu).toBe(false);

    //The component should have reverted to its original state
    expect(availabilityContainer).toMatchSnapshot();
  });

  test('Should all for days to be parsed', () => {
    const availabilityContainer = shallow(<AvailabilityContainer/>);
    let parseDay = availabilityContainer.instance().parseDay;

    expect(parseDay("Monday")).toBe("M");
    expect(parseDay("Tuesday")).toBe("T");
    expect(parseDay("Wednesday")).toBe("W");
    expect(parseDay("Thursday")).toBe("R");
    expect(parseDay("Friday")).toBe("F");
  });

  test('Should handle changes', () => {
    const availabilityContainer = shallow(<AvailabilityContainer/>);
    expect(availabilityContainer.instance().handleChange({ value: 'a' })).toBe(undefined);
  });

  test('Should handle constraints', () => {
    const availabilityContainer = shallow(<AvailabilityContainer/>);
    expect(availabilityContainer.instance().handleConstraints()).toBe(undefined);
  });

  test('Should handle save events', () => {
    let constraints = [{ StartHour: 0, StartMin: 0, EndHour: 0, EndMin: 0, Day: "Monday" }];
    const availabilityContainer = shallow(<AvailabilityContainer constraints={constraints}/>);

    expect(availabilityContainer.instance().handleSave()).toBe(undefined);
  });

  test('Should handle constraint deletion', () => {
    let constraints = [{ StartHour: 0, StartMin: 0, EndHour: 0, EndMin: 0, Day: "Monday" },
                       { StartHour: 0, StartMin: 0, EndHour: 0, EndMin: 0, Day: "Monday" }];
    const availabilityContainer = shallow(<AvailabilityContainer constraints={constraints}/>);
    expect(availabilityContainer.instance().targetDeleteConstraint({ target: { value: 1 } })).toBe(undefined);
    expect(availabilityContainer.instance().deleteConstraint()).toBe(undefined);

  });
});

describe('SelectInput', () => {
  test('Should render correctly', () => {
    const selectInput = shallow(<SelectInput/>);
    expect(selectInput).toMatchSnapshot();
  });
});
