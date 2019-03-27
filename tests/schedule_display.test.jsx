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
  
  test('Should not connect to schedule database properly', () => {
	  let schedules = [[], []];
	  const schedulesContainer = shallow(<SchedulesContainer {...props}/>);
	  expect(schedulesContainer).toMatchSnapshot();
	  const props = { connectSchedules: false };
	  
	  schedulesContainer.instance().connectSchedules();
	  expect(schedulesContainer.instance().props.connectSchedules).toBe(false);
  });
  
  test('Should not produce pdf of page properly', () => {
	  const schedulesContainer = shallow(<SchedulesContainer {...props}/>);
	  expect(schedulesContainer).toMatchSnapshot();
	  const props = { printDocument: false };
	  
	  schedulesContainer.instance().printDocument();
	  expect(schedulesContainer.instance().props.printDocument).toBe(false);
  });
  
  test('Should title schedule name on pdf', () => {
	   const schedulesContainer = shallow(<SchedulesContainer {...props}/>);
       expect(schedulesContainer).toMatchSnapshot();
       const event = Object.assign(jest.fn(), { preventDefault: () => {}});
	   const props = { handleScheduleName: '' };
	   
	   schedulesContainer.instance().handleScheduleName(event);
	   expect(schedulesContainer.instance().props.handleScheduleName).toBe('');
  });
  
  SchedulesContainer.find('.print').simulate("click");
  
  SchedulesContainer.find('.return').simulate("click");
  
  SchedulesContainer.find('.classLabel').simulate("click");
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
	  const props = { handleMouseIn: false, handleMouseOut: false };
	  
	  classDisplay.instance().handleMouseIn();
	  expect(classDisplay.instance().props.handleMouseIn).toBe(false);
	  
	  classDisplay.instance().handleMouseOut();
	  expect(classDisplay.instance().props.handleMouseOut).toBe(false);
  });
});
