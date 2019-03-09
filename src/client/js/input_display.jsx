import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import fetch from 'node-fetch';
import '../css/styles.css';
import $ from 'jquery';

export const Schedules = { 'viableSchedules': null };

//Menu bar
export class TopNavigation extends Component {
  render() {
    return (
      <section className="topNav">
        <a id="leftNav">UP Scheduler</a>
        <Link id='rightNav' to='/settings'>
          Settings
        </Link>
      </section>
    );
  }
};

//All input options
export class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalInputs: 5,
      desiredCourses: []
    }

    this.handleCourseInputChange = this.handleCourseInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  modifyNecessaryInputs() {
    let inputGroups = $("#classGroup").children();

    let populatedInputs = 0;
    for (let i = 0; i < inputGroups.length; i++) {
      let inputChildren = inputGroups[i].children;
      if (inputChildren[0].value != '' && inputChildren[1].value != '') populatedInputs++;
    }

    if (populatedInputs >= inputGroups.length) {
       this.setState({ 'totalInputs': this.state.totalInputs + 1 });
    }
    else if (populatedInputs < inputGroups.length - 1 && inputGroups.length > 5) {
       this.setState({ 'totalInputs': this.state.totalInputs - 1 });
    }
  }

  handleCourseInputChange(inputID, courseID, subject) {
    let desiredCourses = this.state.desiredCourses;
    desiredCourses[inputID] = {'subject': subject, 'courseID': courseID};
    this.setState({ 'desiredCourses': desiredCourses });
    this.modifyNecessaryInputs();
  }

  async handleSubmit(event) {
    event.preventDefault();
    let desiredCourses = this.state.desiredCourses;

    let response;
    await fetch('/api/scheduleRequest', {
      method: 'POST',
      body: JSON.stringify(desiredCourses),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()
  ).then(resJSON => {
    Schedules.viableSchedules = resJSON;
  }).catch((error) => {
    //console.log(error);
  });
}

  render() {
    let courseList = [];
    for (let i = 0; i < this.state.totalInputs; i++) {
      let course = <CourseInput key={"course-" + i} id={i} value={this.state["course-" + i]} onChange={this.handleCourseInputChange}/>
      courseList.push(course);
    }

    return (
      <form id="main" onSubmit={this.handleSubmit}>
        <TermInput/>
        <div id="classGroup">
          {courseList}
        </div>
        <Link to='/schedules'>
          <button form="main" type="submit">
            Submit
          </button>
        </Link>
        <Link to='/availability'>
          <button form="main" type="submit">
            Availability
          </button>
        </Link>
        <button form="main" type="submit"/>
      </form>
    );
  }
};

//Academic term input
export class TermInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your courses for
        <input id="termSelect" type="text" defaultValue="Fall 2019"/>
      </div>
    );
  }
};

//Course selection input
export class CourseInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let parent = event.target.parentNode;
    let courseType = $(parent).children()[0].value;
    let courseID = $(parent).children()[1].value;

    this.props.onChange(this.props.id, courseID, courseType)
  }

  checkIfPopulated(event) {
    event.target.dataset.populated = (event.target.value !== "") ? "true" : "false";
  }

  render() {
    return (
      <div className="classSelect">
        <input type="text" placeholder="Course Type" onChange={this.handleChange} data-populated="false"/>
        <input type="number" placeholder="Course Number" onChange={this.handleChange} data-populated="false"/>
      </div>
    );
  }
};
