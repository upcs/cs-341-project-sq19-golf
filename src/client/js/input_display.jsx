import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import fetch from 'node-fetch';
import $ from 'jquery';
import autoComplete from 'js-autocomplete';
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
      allCourses: {
          raw: [],
          filtered: []
      },
      desiredCourses: []
    }

    this.handleCourseInputChange = this.handleCourseInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveAllSchedules = this.retrieveAllSchedules.bind(this);

    //Retrieve course data for auto-complete purposes
    this.retrieveAllSchedules(() => {
      let courses = this.state.allCourses.filtered;
      let data = courses.map((course, i) => {
        return course.subject;
      })

      let test = new autoComplete({
        selector: '#courseType',
        minChars: 2,
        source: function(term, suggest){
          console.log('a');
          term = term.toUpperCase();
          var choices = data;
          var suggestions = [];
          for (i=0;i<choices.length;i++)
            if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
          suggest(suggestions);
        }
      })
    });
  }

  //Determine whether inputs should be added or removed, onChange()
  modifyNecessaryInputs() {
    let inputGroups = $("#classGroup").children();

    //Iterate over all inputs to determine fill status
    let populatedInputs = 0;
    for (let i = 0; i < inputGroups.length; i++) {
      let inputChildren = inputGroups[i].children;
      if (inputChildren[0].value != '' && inputChildren[1].value != '') populatedInputs++;
    }

    //Add or remove inputs as necessary
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
      this.setState({'allCourses.raw': resJSON});
      this.setState({'allCourses.filtered': courses});

      //Use filtered data once finished
      callback();
    }).catch((error) => {
      console.log(error);
    });
  }

  async handleSubmit(event) {
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
      store.dispatch({ type: "CLEAR_SCHEDULES" }); //Hack to fix React's dumbass key-based rendering
      store.dispatch(modifySchedules(resJSON));
    }).catch((error) => {
      console.log(error);
    });
}

  render() {
    let courseList = [];
    for (let i = 0; i < this.state.totalInputs; i++) {
      let course = <CourseInput key={"course-" + i} id={i} value={this.state["course-" + i]} onChange={this.handleCourseInputChange}/>
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
        <input id="courseType" type="text" placeholder="Course Type" onChange={this.handleChange} data-populated="false"/>
        <input className="courseNum" type="number" placeholder="Course Number" onChange={this.handleChange} data-populated="false"/>
      </div>
    );
  }
};
