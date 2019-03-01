import React from 'react';
import { shallow } from 'enzyme';

import {TopNavigation, InputContainer, CourseInput, TermInput} from '../src/client/js/input_display.jsx';

describe('TopNavigation', () => {
  test('Should render correctly', () => {
    const topNav = shallow(<TopNavigation/>);
    expect(topNav).toMatchSnapshot();
  });
});

describe('InputContainer', () => {
  test('Should render correctly', () => {
    const inputContainer = shallow(<InputContainer/>);
    expect(inputContainer).toMatchSnapshot();
	
	//Accepts necessary inputs
	inputContainer.instance().necessaryInputs();
    expect(inputContainer.instance().props.necessaryInputs).toBe(false);
	
	//Handle course input change
    inputContainer.instance().handleCourseInputChange('inputID', 'courseID', 'subject');
    expect(inputContainer.instance().props.handleCourseInputChange).toBe(false);

    //Handle submission
    inputContainer.instance().handleSubmit(event);
    expect(inputContainer.instance().props.handleSubmit).toBe(false);

    //The component should have reverted to its original state
    expect(inputContainer).toMatchSnapshot();
  });
});

describe('CourseInput', () => {
  test('Should render correctly', () => {
    const courseInput = shallow(<CourseInput/>);
    expect(courseInput).toMatchSnapshot();
	
	//Handle change
    courseInput.instance().handleChange(event);
    expect(courseInput.instance().props.handleChange).toBe(false);
	
	//Check if populated
    courseInput.instance().checkIfPopulated(event);
    expect(courseInput.instance().props.checkIfPopulated).toBe(false);
	
	//The component should have reverted to its original state
	expect(inputContainer).toMatchSnapshot();
  });
});

describe('TermInput', () => {
  test('Should render correctly', () => {
    const termInput = shallow(<TermInput/>);
    expect(termInput).toMatchSnapshot();
  });
});
