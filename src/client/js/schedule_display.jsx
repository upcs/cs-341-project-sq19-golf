import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/styles.css';

const tmpSchedules = [
  {
    schedule: {
      classes: [
        {
          startTime: '8:00am',
          endTime: '9:30am',
          courseName: 'CS 341',
          profName: 'Nuxoll'
        },
        {
          startTime: '9:30am',
          endTime: '11:00am',
          courseName: 'CS 349',
          profName: 'Cenek'
        },
        {
          startTime: '1:00pm',
          endTime: '2:30am',
          courseName: 'CS 321',
          profName: 'Vegdahl'
        }
      ]
    }
  },
  {
    schedule: {
      classes: [
        {
          startTime: '10:00am',
          endTime: '11:30am',
          courseName: 'CS 349',
          profName: 'Cenek'
        },
        {
          startTime: '11:30am',
          endTime: '1:00pm',
          courseName: 'CS 321',
          profName: 'Vegdahl'
        },
        {
          startTime: '4:00pm',
          endTime: '6:30pm',
          courseName: 'CS 341',
          profName: 'Nuxoll'
        }
      ]
    }
  }
];

//All possible schedules
export class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { schedules: tmpSchedules };
  }

  //Retrieves generated schedule data
  componentDidMount() {
    fetch('/api/getSchedules')
      .then(res => res.json())
      .then(schedules => this.setState({ schedules: schedules }));
  }

  render() {
    let schedules = this.state.schedules;

    let schedulesList = schedules.map((schedule, i) => {

      return (
        <ScheduleDisplay key={"schedule-" + i} schedule={schedule.schedule}/>
      )
    });


    //TODO: Needs date/professor information
    return (
      <section id="main">
        <div class="horiz-container">
          {schedulesList}
        </div>
        <Link to="/">
          <input id="return" type="button" value="Return"/>
        </Link>
      </section>
    );
  }
}

//A single schedule
class ScheduleDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { schedule: props.schedule };
  }

  render() {
    let schedule = this.state.schedule;

    let classDisplayList = schedule.classes.map((classData, i) => {
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
class ClassDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { classData: props.classData };
  }

  render() {
    let classData = this.state.classData;

    return (
      <div className="scheduleClass">
        <span className="timeLabel">
          {classData.startTime} - {classData.endTime}
        </span>
        <span className="classLabel">
          {classData.courseName}
          {/*<br/>
          {classData.profName} */}
        </span>
      </div>
    );
  }
};
