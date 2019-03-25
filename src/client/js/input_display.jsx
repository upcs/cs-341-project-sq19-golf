import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import fetch from 'node-fetch';
import $ from 'jquery';
import InputPredict from 'react-inline-predict';
import {store, modifySchedules} from './redux';
import '../css/styles.css';

//Menu bar
export class TopNavigation extends Component {
  constructor(props) {
		super(props);

		let defaultOnClick = () => alert('UPSchedule is a convenient schedule planner created by students, for students.');
		this.state = {
			onClick: this.props.onClick || defaultOnClick
		};
	};

  render() {
    return (
      <section className="topNav">
        <a id="leftNav">UP Scheduler</a>
        <div id='rightNav'>
          <div className="dropdown">
            <div className="dropmenu">
              <div className="name"><b>Options</b></div>
                <div className="content">
                  <div className="setting" id="schedules">Schedules</div>
                  <div className="setting" id="help">Help</div>
                  <div className="setting" id="about" onClick={this.state.onClick}>About</div>
                  <Link to="/">
                    <div className="setting" id="quit">Quit</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
    console.log(desiredCourses);


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

      if (subjectInput.value !== '' && courseInput.value !== '') populatedInputs++;
    }

    //Add or remove inputs as necessary
    if (populatedInputs >= inputGroups.length) {
       this.setState({ 'totalInputs': this.state.totalInputs + 1 });
    }
    else if (populatedInputs < inputGroups.length - 1 && inputGroups.length > 5) {
       this.setState({ 'totalInputs': this.state.totalInputs - 1 });
    }
  }

  async retrieveAllSchedules() {
    await fetch('/api/allCoursesRequest', {
      method: 'POST',
      body: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()
    ).then(resJSON => {
      //console.log(resJSON);
      //Gather and filter data
      let courses = resJSON.map(course => {
        return { 'subject': course.subject, 'number': course.number }
      });
      this.setState({'allCoursesRaw': resJSON});
      this.setState({'allCoursesFiltered': courses});
    }).catch((error) => {
      //console.log(error);
    });
  }

  async handleSubmit(event) {
    let desiredCourses = this.state.desiredCourses;
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
      //console.log(error);
    });
}

  render() {
    let courseList = [], references = {}, lastKey = {'key': null};
    for (let i = 0, idx = 0; i < this.state.totalInputs; i++, idx += 2) {
      let course = <CourseInput key={"course-" + i} id={i} idx={idx} value={this.state["course-" + i]} lastKey={lastKey}
                    courses={this.state.allCoursesFiltered} references={references} onChange={this.handleCourseInputChange}/>
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

  createRef(id) {
    if (this.props.references && !this.props.references.hasOwnProperty(id)) {
      return this.props.references[id] = React.createRef();
    }
  }

  //Focuses next input box
  _handleKeyPress(e, idx) {
    if (this.props.lastKey.key === "Shift" && e.key === "Tab") {
      let inputs = this.props.references;
      if (inputs.hasOwnProperty(idx - 1)) {
        ReactDOM.findDOMNode(inputs[idx - 1].current).children[0].focus();
      }
    }
    else if (e.key === "Tab") {
      let inputs = this.props.references;
      if (inputs.hasOwnProperty(idx + 1)) {
        ReactDOM.findDOMNode(inputs[idx + 1].current).children[0].focus();
      }
    }

    this.props.lastKey['key'] = e.key;
  }

  render() {
    let subjects = this.props.courses.map(course => course.subject);
    let courses = this.props.courses.map(course => course.number);

    return (
      <div className="classSelect" onChange={this.handleChange}>
        <InputPredict
          type="text"
          name="name"
          placeholder="Course Type"
          dictionary={subjects}
          ref={this.createRef(this.props.idx)}
          onKeyDown={(e) => this._handleKeyPress(e, this.props.idx)}
        />
        <InputPredict
          type="number"
          name="name"
          placeholder="Course Number"
          dictionary={courses}
          ref={this.createRef(this.props.idx + 1)}
          onKeyDown={(e) => this._handleKeyPress(e, this.props.idx + 1)}
        />
      </div>
    );
  }
};
