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
	const event = Object.assign(jest.fn(), { preventDefault: () => {}});
	let courseData = {'inputID': 0, 'courseID': 341, 'subject': 'CS'};
	
	//Accepts necessary inputs
	inputContainer.instance().necessaryInputs();
    expect(inputContainer.instance().props.necessaryInputs).toEqual();
	
	//Handle course input change
    inputContainer.instance().handleCourseInputChange(courseData);
    expect(inputContainer.instance().props.handleCourseInputChange).toEqual();

    //Handle submission
    inputContainer.instance().handleSubmit(event);
    expect(inputContainer.instance().props.handleSubmit).toBe();
  });
});

describe('CourseInput', () => {
  test('Should render correctly', () => {
    const courseInput = shallow(<CourseInput/>);
    expect(courseInput).toMatchSnapshot();
	const event = Object.assign(jest.fn(), { preventDefault: () => {}});
	
	//Handle change
    courseInput.instance().handleChange(event);
    expect(courseInput.instance().props.handleChange).toBe();
	
	//Check if populated
    courseInput.instance().checkIfPopulated(event);
    expect(courseInput.instance().props.checkIfPopulated).toBe();
  });
});

describe('TermInput', () => {
  test('Should render correctly', () => {
    const termInput = shallow(<TermInput/>);
    expect(termInput).toMatchSnapshot();
  });
});
