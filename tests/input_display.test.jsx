import React from 'react';
import { shallow, render, setState, mount, find } from 'enzyme';
import {store} from '../src/client/js/redux';
import {TopNavigation, InputContainer, CourseInput, TermInput} from '../src/client/js/input_display.jsx';

describe('TopNavigation', () => {
  test('Should render correctly', () => {
    const topNav = shallow(<TopNavigation/>);
    expect(topNav).toMatchSnapshot();
  });

  test('Should prevent the user from re-visiting the previous page if no history exists',  () => {
    const topNav = shallow(<TopNavigation/>);
    window.history = null;

    expect(topNav.instance().backClick()).toBe(undefined);
  });

  test('Should react with modal popups', () => {
    const topNav = mount(<TopNavigation/>);

    //Test modal clicks
    topNav.find('#modal-1').simulate('click');
    topNav.find('#modal-2').simulate('click');
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
    inputContainer.instance().retrieveAllCourses();
    expect(inputContainer.instance().state.allCourses).toEqual({'subjectMap': {}, 'numberMap': {}});

    //Handle course input change
    inputContainer.instance().handleCourseInputChange(courseData.inputID, courseData.courseID, courseData.subject);
    expect(inputContainer.instance().state.desiredCourses).toEqual([{'courseID': 341, 'subject': 'CS'}]);

    //Handle submission
    inputContainer.instance().handleSubmit(event);
    expect(inputContainer.instance().props.handleSubmit).toBe();
  });
});

describe('CourseInput', () => {
  let key = {'key': null};
  let courses = {'subjectMap': {'all': null}, 'numberMap': {'all': null}};

  test('Should render correctly', () => {
    const courseInput = shallow(<CourseInput courses={courses} />);
    expect(courseInput).toMatchSnapshot();
  });

  test('Should properly create references', () => {
    const courseInput = shallow(<CourseInput courses={courses}/>);

    courseInput.instance().createRef(0);
    expect(courseInput.instance().props.createRef).toEqual(undefined); //TODO: Fix
  });

  test('Should handle a TAB key press correctly', () => {
    const courseInput = shallow(<CourseInput courses={courses} references={{}} lastKey={key}/>);

    courseInput.instance()._handleKeyDown({key: "Tab"}, 0);
    expect(courseInput.instance().props.lastKey['key']).toEqual(null); //TODO: Fix
  });

  test('Should handle a SHIFT key press correctly', () => {
    const courseInput = shallow(<CourseInput courses={courses} references={{}} lastKey={key}/>);

    courseInput.instance()._handleKeyDown({key: "Shift"}, 0);
    expect(courseInput.instance().props.lastKey['key']).toEqual(null); //TODO: Fix
  });

  test('Should handle an arbitrary key press correctly', () => {
    const courseInput = shallow(<CourseInput courses={courses} lastKey={key}/>);

    courseInput.instance()._handleKeyUp({key: "Enter"}, 0);
    expect(courseInput.instance().props.lastKey['key']).toEqual(null); //TODO: Fix
  });

  /* test('Should handle only Upper-case Inputs', () => {
    const courseInput = shallow(<CourseInput courses={courses} references={{}} lastKey={key}/>);
    expect(courseInput).toMatchSnapshot();

    courseInput.instance().handleInput({key: "Enter"}, 0);
    expect(courseInput.instance().props.lastKey['key']).toEqual(null); //TODO: Fix
  }); */

});

describe('TermInput', () => {
  test('Should render correctly', () => {
    const termInput = shallow(<TermInput/>);
    expect(termInput).toMatchSnapshot();
  });
});
