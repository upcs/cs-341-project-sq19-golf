import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Schedules } from './input_display'
import '../css/styles.css';

//All possible schedules
export class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { schedules: props.schedules || [] };
  }

  render() {
    let schedules = Schedules.viableSchedules || this.state.schedules;

    let schedulesList = [];
    if (schedules) {
      schedulesList = schedules.map((schedule, i) => {
        return (
          <ScheduleDisplay key={"schedule-" + i} schedule={schedule}/>
        )
      });
    }

    //TODO: Needs date/professor information
    return (
      <section id="main">
		<div id="name">Schedule Name:
			<input id="scheduleName" type="text" placeholder="Enter Schedule Name Here"/>
		</div>
        <div className="horiz-container">
          {schedulesList}
        </div>
        <Link to="/">
          <button id="save" type="button">
            Save
          </button>
        </Link>
		<Link to="/availability">
          <button id="return" type="button">
            Return
          </button>
        </Link>
      </section>
    );
  }
}

//A single schedule
export class ScheduleDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { schedule: props.schedule };
  }

  render() {
    let schedule = this.state.schedule;

    let classDisplayList = schedule.map((classData, i) => {
      return (
        <ClassDisplay key={"class-" + i} classData={classData}/>
      )
    });

    return (
      <span className="scheduleOption">
        {classDisplayList}
      </span>
    )
  }
};

//A single course
export class ClassDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { classData: props.classData };
  }

  render() {
    let classData = this.state.classData;

    return (
      <div className="scheduleClass">
        <span className="timeLabel">
          {classData.start} - {classData.end}
        </span>
        <span className="classLabel">
          {classData.title}
          {/*<br/>
          {classData.profName} */}
        </span>
      </div>
    );
  }
};
