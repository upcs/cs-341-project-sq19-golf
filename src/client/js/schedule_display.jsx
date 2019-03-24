import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Schedules } from './input_display'
import '../css/styles.css';

//All possible schedules
export class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { schedules: this.props.schedules || [] };

    let defaultOnClick = () => window.history.back();
    this.state = {
      onClick: this.props.onClick || defaultOnClick
    };
  };

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
        <div className="scheduleBox">
        <div className="horiz-container">
          {schedulesList}
        </div>
          <table>
          <tbody>
            <tr>
          		<td>
                <div id="name"><b>Schedule Name </b>
            			<input id="scheduleName" type="text" placeholder="Enter Schedule Name Here"/>
            		</div>
              </td>
              <td>
                <Link to="/">
                  <button id="save" type="button">
                    Save
                  </button>
                </Link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

//A single schedule
export class ScheduleDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { schedule: props.schedule || [] };
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
    this.state = { classData: props.classData || {} };
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
