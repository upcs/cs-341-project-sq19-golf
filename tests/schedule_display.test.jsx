import React from 'react';
import { shallow, render, setState, mount, find } from 'enzyme';
import Sinon from 'sinon';
import {SchedulesContainer, ScheduleDisplay, ClassDisplay} from '../src/client/js/schedule_display.jsx';

//Tests
describe('SchedulesContainer', () => {
  //Mocked functions
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn();
  });

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

  test('Should not produce png of page properly', () => {
	  const schedulesContainer = shallow(<SchedulesContainer/>);

	  schedulesContainer.instance().printDocument();
	  expect(schedulesContainer.instance().props.printDocument).toBe();
  });

  test('Should title schedule name on png', () => {
	   const schedulesContainer = shallow(<SchedulesContainer/>);

     let event = { target: { value: "schedules" }};

	   schedulesContainer.instance().handleScheduleName(event);
	   expect(schedulesContainer.instance().state.scheduleName).toEqual("schedules");
  });
});

describe('ScheduleDisplay', () => {
  test('Should render correctly with a "populated" schedule property', () => {
    //Mocks class data state through providing abitrary properties
    let schedule = [[], []];

    const scheduleDisplay = shallow(<ScheduleDisplay schedule={schedule}/>);
    expect(scheduleDisplay).toMatchSnapshot();
  });

  test('Should update schedule display', () => {
    const scheduleDisplay = shallow(<ScheduleDisplay/>);
    expect(scheduleDisplay).toMatchSnapshot();

	scheduleDisplay.instance().updateDisplay(0);
	expect(scheduleDisplay.instance().state.updateDisplay).toBe();
  });

  test('Should render correctly with no schedule property', () => {
    const scheduleDisplay = shallow(<ScheduleDisplay/>);
    expect(scheduleDisplay).toMatchSnapshot();
  });

  test('Should render correctly with a null schedule property', () => {
    const scheduleDisplay = shallow(<ScheduleDisplay schedule={null}/>);
    expect(scheduleDisplay).toMatchSnapshot();
  });

 /* test('Should support onClick event on Save as PDF button', () => {
      const clickCallback = Sinon.spy();
      const scheduleDisplay = shallow(<ScheduleDisplay onClick={clickCallback}/>);

      //Simulate an onClick event
      scheduleDisplay.find([class="return"]).simulate("click");

      Sinon.assert.called(clickCallback);
  });*/
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

  test('Should support onClick event on classes', () => {
    const props = { selected: null, updateDisplay: () => {} };
    const classDisplay = shallow(<ClassDisplay {...props}/>);

	   classDisplay.instance().handleMouseClick();
     expect(classDisplay.instance().props.handleMouseClick).toBe();
  });

  test('Should handle mouseIn and mouseOut', () => {
	  const classDisplay = shallow(<ClassDisplay/>);
	  classDisplay.simulate("mouseIn");
	  expect(classDisplay.props.selected).toBe(undefined);
	  classDisplay.simulate("mouseOut");
    expect(classDisplay.props.selected).toBe(undefined);
  });
});
