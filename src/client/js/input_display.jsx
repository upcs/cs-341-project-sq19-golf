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

//All input options
export class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalInputs: this.necessaryInputs(),
      populatedInputs: 0
    }
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  necessaryInputs() {
    //$('.classSelect').find('input[data-populated="true"]');

    return 3;
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);

    fetch('/api/scheduleRequest', {
      method: 'POST',
      body: data
    });
  }

  render() {
    let courseList = [];
    for (let i = 0; i < this.state.totalInputs; i++) {
      let course = <CourseInput key={"course-" + i}/>
      courseList.push(course);
    }

    return (
      <form id="main" onSubmit={this.handleSubmit}>
        <TermInput/>
        <div id="classGroup">
          {courseList}
        </div>
        <Link to='/availability'>
          <button id="submitButton" form="main" type="submit">
            Submit
          </button>
        </Link>
      </form>
    );
  }
};

//Academic term input
class TermInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your courses for
        <input id="termSelect" type="text" defaultValue="Fall 2019"/>
      </div>
    );
  }
};

//Course selection input
class CourseInput extends Component {
  constructor(props) {
    super(props);
  }

  checkIfPopulated(event) {
    event.target.dataset.populated = (event.target.value !== "") ? "true" : "false";
  }

  render() {
    return (
      <div className="classSelect">
        <input type="text" placeholder="Course Type" onChange={this.props.handleChange} data-populated="false"/>
        <input type="number" placeholder="Course Number" onChange={this.props.handleChange} data-populated="false"/>
      </div>
    );
  }
};
