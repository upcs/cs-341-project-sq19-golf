import React from 'react';
import { shallow, render, setState } from 'enzyme';
import {store} from '../src/client/js/redux';
import {TopNavigation, InputContainer, CourseInput, TermInput} from '../src/client/js/input_display.jsx';

describe('TopNavigation', () => {
  test('Should render correctly', () => {
    const topNav = shallow(<TopNavigation/>);
    expect(topNav).toMatchSnapshot();

    topNav.instance().aboutClick();
	  expect(topNav.instance().state.aboutClick).toBe(null);
  });
});

describe('InputContainer', () => {
  test('Should render correctly', () => {
    const inputContainer = shallow(<InputContainer/>);
    expect(inputContainer).toMatchSnapshot();
    const event = Object.assign(jest.fn(), { preventDefault: () => {}});
    let courseData = {'inputID': 0, 'courseID': 341, 'subject': 'CS'};

    //Ensures necessary inputs exist
    //inputContainer.instance().modifyNecessaryInputs();
    //expect(inputContainer.instance().state.totalInputs).toEqual(5);

    //Handle course data dump
    inputContainer.instance().retrieveAllSchedules();
    expect(inputContainer.instance().state.allCoursesRaw).toEqual([]);

    //Handle course input change
    inputContainer.instance().handleCourseInputChange(courseData.inputID, courseData.courseID, courseData.subject);
    expect(inputContainer.instance().state.desiredCourses).toEqual([{'courseID': 341, 'subject': 'CS'}]);

    //Handle submission
    inputContainer.instance().handleSubmit(event);
    expect(inputContainer.instance().props.handleSubmit).toBe();
  });
});

describe('CourseInput', () => {
  test('Should render correctly', () => {
    const courseInput = shallow(<CourseInput courses={[]}/>);
    expect(courseInput).toMatchSnapshot();
    const event = Object.assign(jest.fn(), { preventDefault: () => {}});
    const props = { idx: 0 }

    courseInput.instance().handleChange(event);
    expect(courseInput.instance().props.handleChange).toBe(0);

    courseInput.instance().createRef(idx);
    expect(courseInput.instance().props.createRef).toBe();
  });
});

describe('TermInput', () => {
  test('Should render correctly', () => {
    const termInput = shallow(<TermInput/>);
    expect(termInput).toMatchSnapshot();
  });
});
