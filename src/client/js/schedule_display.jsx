import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Schedules} from './input_display';
import {store, modifySchedules} from './redux';
import '../css/styles.css';

//All possible schedules
export class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.connectSchedules = this.connectSchedules.bind(this);
  }

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
  
  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.output('/schedules');
        pdf.save("download.pdf");
      });
  }

  render() {
    const Schedules = this.connectSchedules();
	
    return (
      <section id="main">
    		<div id="name">Schedule Name:
    			<input id="scheduleName" type="text" placeholder="Enter Schedule Name Here"/>
    		</div>
		<div id="divToPrint" className="pdfdim">
			<div className="horiz-container">
			  <Schedules/>
			</div>
		</div>
        <Link to="/">
          <button id="save" type="button">
            Save
          </button>
        </Link>
		    <Link to="/availability">
          <button id="return" type="button">
            Return
          </button>
        </Link>
		<button onClick={this.printDocument}>Save As PDF</button> 
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
  
  scheduleHover() {
	  const hover = ({ onHover, children }) => (
		<div className="hover">
			<div className="hover__no-hover">{children}</div>
			<div className="hover__hover">{onHover}</div>
		</div>
	  )
  }
  
  render() {
    let classData = this.state.classData;
    return (
	  <hover onHover = {
		  <div className="hoverInfo">
			<span className="titleLabel">
			{classData.title}
			</span>
			<span className="profLabel">
			Instructor: {classData.professor}
			</span>
		  </div>}>
		  <div className="scheduleClass">
			<span className="classLabel">
			{classData.subject}{classData.number}
			</span>
			<span className="timeLabel">
			  {classData.days} <br/>
			  {classData.start} - {classData.end}
			</span>	
		  </div>
	  </hover>
    );
  }
};