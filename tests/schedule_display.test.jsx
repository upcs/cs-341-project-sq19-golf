import React from 'react';
import { shallow, render, setState } from 'enzyme';

import {SchedulesContainer, ScheduleDisplay, ClassDisplay} from '../src/client/js/schedule_display.jsx';

//Mocked functions
beforeEach(() => {
});

//Tests
describe('SchedulesContainer', () => {
  test('Should render correctly with a "populated" schedules property', () => {
    //Mocks class data state through providing abitrary properties
    let schedules = [[], []];

    const schedulesContainer = shallow(<SchedulesContainer schedules={schedules}/>);
    expect(schedulesContainer).toMatchSnapshot();
  });

  test('Should render correctly with no schedules property', () => {
    const schedulesContainer = shallow(<SchedulesContainer/>);
    expect(schedulesContainer).toMatchSnapshot();
  });

  test('Should render correctly with a null schedules property', () => {
    const schedulesContainer = shallow(<SchedulesContainer schedules={null}/>);
    expect(schedulesContainer).toMatchSnapshot();
  });
  
  SchedulesContainer.instance().connectSchedules();
  expect(SchedulesContainer.instance().props.connectSchedules).toBe(schedules);
  
  SchedulesContainer.instance().printDocument();
  expect(SchedulesContainer.instance().props.printDocument).toBe();
});

describe('ScheduleDisplay', () => {
  test('Should render correctly with a "populated" schedule property', () => {
    //Mocks class data state through providing abitrary properties
    let schedule = [[], []];

    const scheduleDisplay = shallow(<ScheduleDisplay schedule={schedule}/>);
    expect(scheduleDisplay).toMatchSnapshot();
  });

  test('Should render correctly with no schedule property', () => {
    const scheduleDisplay = shallow(<ScheduleDisplay/>);
    expect(scheduleDisplay).toMatchSnapshot();
  });

  test('Should render correctly with a null schedule property', () => {
    const scheduleDisplay = shallow(<ScheduleDisplay schedule={null}/>);
    expect(scheduleDisplay).toMatchSnapshot();
  });
});

describe('ClassDisplay', () => {
  test('Should render correctly with a "populated" classData property', () => {
    //Mocks class data state through providing abitrary properties
    let classData = {'start': 0, 'end': 1, 'title': 'class'};
	
    const classDisplay = shallow(<ClassDisplay classData={classData}/>);
    expect(classDisplay).toMatchSnapshot();
  });

  test('Should render correctly with no classData property', () => {
    const classDisplay = shallow(<ClassDisplay/>);
    expect(classDisplay).toMatchSnapshot();
  });

  test('Should render correctly with a null classData property', () => {
    const classDisplay = shallow(<ClassDisplay classData={null}/>);
    expect(classDisplay).toMatchSnapshot();
  });
  
  ClassDisplay.instance().handleMouseIn();
  expect(ClassDisplay.instance().props.handleMouseIn).toBe();
  
  ClassDisplay.instance().handleMouseOut();
  expect(ClassDisplay.instance().props.handleMouseOut).toBe();
});
