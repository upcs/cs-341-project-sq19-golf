import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import fetch from 'node-fetch';
import $ from 'jquery';
import InputPredict from 'react-inline-predict';
import {store, modifySchedules, modifyLastKey} from './redux';
import Popup from 'reactjs-popup'
import '../css/styles.css';

//Menu bar
export class TopNavigation extends Component {
  constructor(props) {
		super(props);
	};

  //Moves the user back to the previous page
  backClick() {
    window.history.back();
  }

  render() {
    return (
      <section className="topNav">
        <div id="leftNav"><a>UP Scheduler</a></div>
        <div id='rightNav'>
          <Popup trigger={<button id="modal-1" className="navEl"> Help </button>} modal closeOnDocumentClick>
            <div>
              <div className="header">Help<hr/></div>
              <span><ul align="left">
                <b>Availability Page</b><br/>
                Enter times you are unavailable, or professors you would like to avoid.
                Schedules matching these fields will not be generated
                <br/><br/>
                <b>Schedule Page</b><br/>
                View, name, and save your generated schedule
                </ul>
              </span>
            </div>
          </Popup>
          <Popup trigger={<button id="modal-2" className="navEl"> About </button>} modal closeOnDocumentClick>
            <div>
              <div className="header">About<hr/></div>
              <ul align="left">UPSchedule is a convenient schedule planner created by students, for students.</ul>
            </div>
          </Popup>
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
      totalInputs: 5, //Default number of inputs
      allCourses: { //Describes courses corresponding to a given subject/courseID
        subjectMap: {},
        numberMap: {},
      },
      desiredCourses: [] //Records user requested courses
    }

    this.handleCourseInputChange = this.handleCourseInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveAllCourses = this.retrieveAllCourses.bind(this);

    //Retrieve course data for auto-complete purposes
    this.retrieveAllCourses();
  }

  //Handles desiredCourses state update on input
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

  //Retrieves all courses on initial load, used for subjMap/numMap
  async retrieveAllCourses() {
    await fetch('/api/allCoursesRequest', {
      method: 'POST',
      body: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()
    ).then(resJSON => {
      this.setState({'allCourses': {'subjectMap': resJSON.subjMap, 'numberMap': resJSON.numMap} });
      console.log(resJSON);
    }).catch((error) => {
      //console.log(error); //Warnings are currently surpressed, as they can be excessive
    });
  }

  //Handles request of user-generated viable schedules
  async handleSubmit(event) {
    //Remove undefined entries
    let invalidCourse = false;
    let desiredCourses = this.state.desiredCourses.filter(course => {
      let courses = this.state.allCourses;
      let validSubj = courses.numberMap.all.includes(course.subject);
      let validCourseID = courses.subjectMap[course.subject] && courses.subjectMap[course.subject].includes(course.courseID.toString());

      if (validSubj && validCourseID) return course;
      else invalidCourse = true; //Record invalid entries
    });

    //If no valid courses exist, inform the user
    if (desiredCourses.length === 0 ) {
      alert("Please enter at least one valid course");
      event.preventDefault();
    }
    else {
      //Notidy user of invalid course
      if (invalidCourse) alert("Invalid courses(s) detected. Schedule generation will proceed without such inputs");

      //Get schedule constraints
      let constraints = store.getState().constraints;

      //Bundle constraints and desired courses
      let data = {
        desiredCourses,
        constraints
      };

      //Grab relevant data from the backend DB
      await fetch('/api/scheduleRequest', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()
      ).then(resJSON => {
        store.dispatch({ type: "CLEAR_SCHEDULES" }); //Hack to fix React's key-based rendering
        store.dispatch(modifySchedules(resJSON));
      }).catch((error) => {
        //console.log(error); //Warnings are currently surpressed, as they can be excessive
      });
    }
  }

  render() {
    //Render all necessary inputs
    let courseList = [], references = {};
    for (let i = 0, idx = 0; i < this.state.totalInputs; i++, idx += 2) {
      let course = <CourseInput key={"course-" + i} id={i} idx={idx} value={this.state["course-" + i]}
                    courses={this.state.allCourses} references={references} onChange={this.handleCourseInputChange}/>
      courseList.push(course);
    }

    return ('dummy','dummy',
      <div>
        <form id="main">
          <TermInput/>
          <div id="classGroup">
            {courseList}
          </div>
        </form>
        <div className="bottom">
          <Link to='/schedules'>
            <button form="main" onClick={this.handleSubmit}>
              Submit
            </button>
          </Link>
          <Link to='/availability'>
            <button form="main">
              Availability
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

//Academic term input
export class TermInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your courses for
        <input disabled id="termSelect" type="text" defaultValue="Fall 2019"/>
      </div>
    );
  }
};

//Course selection input
export class CourseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: { //Records current user input
        subject: null,
        number: null
      },
      color: '#d3d3d3' //Used to hack match suggestion to be "lazy"
    }

    this.handleInput = this.handleInput.bind(this);
  }

  //Create a reference on rendering for future DOM-based modificaitons
  createRef(id) {
    if (this.props.references && !this.props.references.hasOwnProperty(id)) {
      return this.props.references[id] = React.createRef();
    }
    else if (this.props.references) {
      return this.props.references[id];
    }
  }

  //Focuses the next input box (necessary as InputPredict breaks this feature)
  _handleKeyDown(e, idx) {
    let lastKey = store.getState().lastKey;

    if (lastKey === "Shift" && e.key === "Tab") {
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

    if (e.key === "Shift") store.dispatch(modifyLastKey(e.key));
  }

  //A helper method for _handleKeyDown to allow for shift to be held
  _handleKeyUp(e) {
    if (e.key === "Shift") store.dispatch(modifyLastKey(null));
  }

  //Records user input and writes to parent's state
  handleInput(value, match, context) {
    let input = this.state.input;
    if (context == 'subject') {
      if (match) this.setState({ color: 'transparent' });

      input[context] = value.toString().toUpperCase();
    }
    else input[context] = value.toString();
    this.setState({ input: input });

    //Send input back up to parent component
    this.props.onChange(this.props.id, input.number, input.subject)
  }

  render() {
    let input = this.state.input;
    let courses = this.props.courses;

    //Treat all possible autocompletions
    let numbers = (courses.subjectMap[input.subject]) ? courses.subjectMap[input.subject] : courses.subjectMap.all;
    let subjects = (courses.numberMap[input.number]) ? courses.numberMap[input.number] : courses.numberMap.all;

    return (
      <div className="classSelect">
        <InputPredict
          type="text"
          autocomplete="off"
          name="subject"
          placeholder="Course Subject"
          dictionary={subjects}
          ref={this.createRef(this.props.idx)}
          onKeyDown={(e) => this._handleKeyDown(e, this.props.idx)}
          onValueChange={((value, match) => this.handleInput(value, match, 'subject'))}
          onKeyUp={(e) => this._handleKeyUp(e)}
        />
        <InputPredict
          type="text"
          autocomplete="off"
          name="number"
          pattern="[0-9]*"
          placeholder="Course Number"
          dictionary={numbers}
          ref={this.createRef(this.props.idx + 1)}
          onValueChange={((value, match) => this.handleInput(value, match, 'number'))}
          onKeyDown={(e) => this._handleKeyDown(e, this.props.idx + 1)}
          onKeyUp={(e) => this._handleKeyUp(e)}
        />
      </div>
    );
  }
};
