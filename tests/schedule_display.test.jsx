import React from 'react';
import { shallow, render, setState } from 'enzyme';
import Sinon from 'sinon';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

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
  
  test('Should not connect to schedule database properly', () => {
	  let schedules = [[], []];
	  const schedulesContainer = shallow(<SchedulesContainer {...props}/>);
	  expect(schedulesContainer).toMatchSnapshot();
	  const props = { connectSchedules: undefined };
	  
	  schedulesContainer.instance().connectSchedules();
	  expect(schedulesContainer.instance().props.connectSchedules).toBe();
  });
  
  test('Should not produce pdf of page properly', () => {
	  const schedulesContainer = shallow(<SchedulesContainer/>);
	  expect(schedulesContainer).toMatchSnapshot();
	  let pdf = new jsPDF();
	  
	  schedulesContainer.instance().printDocument();
	  expect(schedulesContainer.instance().state.printDocument).toBe(pdf);
  });
  
  test('Should title schedule name on pdf', () => {
	   const schedulesContainer = shallow(<SchedulesContainer/>);
       expect(schedulesContainer).toMatchSnapshot();
       const event = Object.assign(jest.fn(), { preventDefault: () => {}});
	   
	   schedulesContainer.instance().handleScheduleName(event);
	   expect(schedulesContainer.instance().state.handleScheduleName).toEqual({scheduleName: event.target.value});
  });
  
  test('Should support onClick event on buttons', () => {
      const clickCallback = Sinon.spy();
      const schedulesContainer = shallow(<schedulesContainer onClick={clickCallback}/>);

      //Simulate an onClick event
      schedulesContainer.find('.print').simulate('click');
  
	  schedulesContainer.find('.return').simulate('click');

      Sinon.assert.called(clickCallback);
  });
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
    //Mocks class data state through providing arbitrary properties
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
  
  test('Allow for mouse hovering', () => {
	  const classDisplay = shallow(<ClassDisplay {...props}/>);
	  expect(classDisplay).toMatchSnapshot();
	  const props = { handleMouseIn: undefined, handleMouseOut: undefined };
	  
	  classDisplay.instance().handleMouseIn();
	  expect(classDisplay.instance().props.handleMouseIn).toBe();
	  
	  classDisplay.instance().handleMouseOut();
	  expect(classDisplay.instance().props.handleMouseOut).toBe();
  });
  
  test('Should support onClick event on classes', () => {
      const clickCallback = Sinon.spy();
      const classDisplay = shallow(<ClassDisplay onClick={clickCallback}/>);

      //Simulate an onClick event
      classDisplay.find('.classLabel').simulate('click');

      Sinon.assert.called(clickCallback);
  });
});
