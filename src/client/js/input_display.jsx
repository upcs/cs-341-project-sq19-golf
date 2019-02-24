import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/styles.css';

//Menu bar
export class TopNavigation extends Component {
  render() {
    return (
      <section className="topNav">
        <a id="leftNav">UP Scheduler</a>
        <a id="rightNav">Settings</a>
      </section>
    );
  }
};

export class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { numInputs: necessaryInputs() }
  }

  render() {
    let courseList = [];
    for (let i = 0; i < this.state.numInputs; i++) {
      let course = <CourseInput key={"course-" + i}/>
      courseList.push(course);
    }

    return (
      <section id="main">
        <TermInput/>
        <div id="classGroup">
          {courseList}
        </div>
        <Link to='/schedules'>
          <button id="submitButton">
            Submit
          </button>
        </Link>
      </section>
    );
  }
};

class TermInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your courses for
        <input id="termSelect" type="text" defaultValue="Fall 2019"/>
      </div>
    );
  }
};

class CourseInput extends Component {
  render() {
    return (
      <div className="classSelect">
        <input type="text" placeholder="Course Type"/>
        <input type="number" placeholder="Course Number"/>
      </div>
    );
  }
};

function necessaryInputs() {
  //TODO: Add logic
  return 3;
}

function displaySchedules() {
  //TODO: Add logic

}
