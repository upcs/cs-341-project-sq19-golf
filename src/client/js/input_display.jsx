import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import fetch from 'node-fetch';
import $ from 'jquery';
import InputPredict from 'react-inline-predict';
import {store, modifySchedules} from './redux';
import '../css/styles.css';

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
      allCoursesRaw: [],
      allCoursesFiltered: [],
      desiredCourses: []
    }

    this.handleCourseInputChange = this.handleCourseInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveAllSchedules = this.retrieveAllSchedules.bind(this);

    //Retrieve course data for auto-complete purposes
    this.retrieveAllSchedules();
  }

  handleCourseInputChange(inputID, courseID, subject) {
    let desiredCourses = this.state.desiredCourses;
    desiredCourses[inputID] = {'subject': subject.toUpperCase(), 'courseID': courseID};
    this.setState({ 'desiredCourses': desiredCourses });
    this.modifyNecessaryInputs();
  }

  //Determine whether inputs should be added or removed, onChange()
  modifyNecessaryInputs() {
    let inputGroups = $("#classGroup").children();

    //Iterate over all inputs to determine fill status
    let populatedInputs = 0;
    for (let i = 0; i < inputGroups.length; i++) {
      let subjectInput = inputGroups[i].firstChild.children[0];
      let courseInput = inputGroups[i].lastChild.children[0];

      if (subjectInput.value != '' && courseInput.value != '') populatedInputs++;
    }

    //Add or remove inputs as necessary
    if (populatedInputs >= inputGroups.length) {
       this.setState({ 'totalInputs': this.state.totalInputs + 1 });
    }
    else if (populatedInputs < inputGroups.length - 1 && inputGroups.length > 5) {
       this.setState({ 'totalInputs': this.state.totalInputs - 1 });
    }
  }

  async retrieveAllSchedules(callback) {
    await fetch('/api/allCoursesRequest', {
      method: 'POST',
      body: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()
    ).then(resJSON => {
      //Gather and filter data
      let courses = resJSON.map(course => {
        return { 'subject': course.subject, 'number': course.number }
      });
      this.setState({'allCoursesRaw': resJSON});
      this.setState({'allCoursesFiltered': courses});
    }).catch((error) => {
      console.log(error);
    });
  }

  async handleSubmit(event) {
    let desiredCourses = this.state.desiredCourses;
    console.log(desiredCourses);
    await fetch('/api/scheduleRequest', {
      method: 'POST',
      body: JSON.stringify(desiredCourses),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()
    ).then(resJSON => {
      store.dispatch({ type: "CLEAR_SCHEDULES" }); //Hack to fix React's dumbass key-based rendering
      console.log(resJSON);
      store.dispatch(modifySchedules(resJSON));
    }).catch((error) => {
      console.log(error);
    });
}

  render() {
    let courseList = [];
    for (let i = 0; i < this.state.totalInputs; i++) {
      let course = <CourseInput key={"course-" + i} id={i} value={this.state["course-" + i]} courses={this.state.allCoursesFiltered} onChange={this.handleCourseInputChange}/>
      courseList.push(course);
    }

    return (
      <form id="main">
        <TermInput/>
        <div id="classGroup">
          {courseList}
        </div>
        <Link to='/schedules'>
          <button form="main" onClick={this.handleSubmit}>
            Submit
          </button>
        </Link>
        <Link to='/availability'>
          <button form="main" type="submit">
            Availability
          </button>
        </Link>
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
    let parent = event.target.parentNode.parentNode;
    let courseType = parent.firstChild.children[0].value;
    let courseID = parent.lastChild.children[0].value;

    this.props.onChange(this.props.id, courseID, courseType)
  }

  render() {
    let subjects = this.props.courses.map(course => course.subject);
    let courses = this.props.courses.map(course => course.number);

    //console.log(subjects);
    return (
      <div className="classSelect" onChange={this.handleChange}>
        <InputPredict
          type="text"
          name="name"
          placeholder="Course Type"
          dictionary={subjects}
        />
        <InputPredict
          type="number"
          name="name"
          placeholder="Course Number"
          dictionary={courses}
        />
      </div>
    );
  }
};
