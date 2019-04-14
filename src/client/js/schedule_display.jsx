import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { saveAs } from 'browser-filesaver';
import * as html2canvas from 'html2canvas';
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {store, modifySchedules} from './redux';
import '../css/styles.css';

//Displays all user-generated, viable schedules
export class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleName: 'schedules' //Default schedule name value for png generation
    }

    this.printDocument = this.printDocument.bind(this);
    this.handleScheduleName = this.handleScheduleName.bind(this);
  }

  //Redux-react store connection allowing for reactive state updates upon viableSchedules change
  connectSchedules() {
    const mapStateToProps = state => {
      return { viableSchedules: state.viableSchedules };
    };

    const schedulesList = ({ viableSchedules }) => {
      return viableSchedules.map((schedule, i) => {
        return <ScheduleDisplay key={"schedule-" + i} schedule={schedule}/>
      });
    };

    return connect(mapStateToProps)(schedulesList);
  }

  //Allows for the saving of the schedule display DOM section as a png
  printDocument() {
    const input = document.getElementById('divToPrint');
    if (input && input.childElementCount !== 0) {
      html2canvas(input).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, this.state.scheduleName + ".png");
        });
      });
    }
    else if (input) alert("Please generate a schedule first");
  }

  //Set png schedule name
  handleScheduleName(event) {
    this.setState({scheduleName: event.target.value});
  }

  render() {
    const Schedules = this.connectSchedules();

    return (
      <section id="main">
    		<div id="name">Schedule Name:
    			<input id="scheduleName" type="text" placeholder="Enter Schedule Name Here" onChange={this.handleScheduleName}/>
    		</div>
    		<div id="divToPrint" className="pdfdim">
  			  <Schedules/>
    		</div>
        <div className="bottom">
          <button onClick={this.printDocument}>Save As PNG</button>
          <button className="return" onClick={() => window.history.back()}>Return</button>
        </div>
      </section>
    );
  }
}

//Represents a single viable schedule
export class ScheduleDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: props.schedule || [],
      selected: false
    };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  //Handles display of schedule registration information onClick
  updateDisplay(truthVal) {
    this.setState({ selected: truthVal })
  }

  render() {
    //Render all scheduled classes
    let classDisplayList = this.state.schedule.map((classData, i) => {
      return (
        <ClassDisplay key={"class-" + i} classData={classData} updateDisplay={this.updateDisplay} selected={this.state.selected}/>
      );
    });

    //Attach and nest said classes within stylized schedule components
    return (
      <span className="scheduleOption">
    		<div className="scheduleContainer">
    			{classDisplayList}
    		</div>
      </span>
    )
  }
};

//Displays data for a single class
export class ClassDisplay extends Component {
  constructor(props) {
  	super(props);
  	this.state = { classData: props.classData || {} };
  }

  //TODO: Consider moving this up to the parent
  //Handles stateful ferrying of data from child to parent, concerning schedule registration display
  handleMouseClick() {
    let selected = this.props.selected;
	  this.props.updateDisplay(!selected);
  }

  render() {
    let classData = this.state.classData;
	  const tooltipStyle = {
		  display: this.props.selected ? 'block' : 'none'
	  }

    return (
		  <div className="scheduleClass">
  			<div onClick={this.handleMouseClick.bind(this)} className="classLabel">
  				{classData.subject} {classData.number}{classData.section}<br/>
  				{classData.days} {classData.start} - {classData.end}<br/>
  				{classData.location}
  			</div>
  			<div className="timeLabel" style={tooltipStyle}>
  				{classData.title}<br/>
  				{classData.professor}<br/>
  				CRN: {classData.crn}<br/>
  				Credits: {classData.credits}
  			</div>
		  </div>
    );
  }
};
