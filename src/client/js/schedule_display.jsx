import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {store, modifySchedules} from './redux';
import '../css/styles.css';

//All possible schedules
export class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleName: 'schedules'
    }

    this.connectSchedules = this.connectSchedules.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.handleScheduleName = this.handleScheduleName.bind(this);
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
        const pdf = new jsPDF('landscape');
        pdf.addImage(imgData, 'JPEG', 0, 0, 180, 150);
        pdf.save(this.state.scheduleName + ".pdf");
      });
  }

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
          <button onClick={this.printDocument}>Save As PDF</button>
          <button className="return" onClick={() => window.history.back()}>Return</button>
        </div>
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
<<<<<<< Updated upstream
    		<div className="scheduleContainer">
    			{classDisplayList}
    		</div>
=======
		    <div className="scheduleContainer">
		      {classDisplayList}
		    </div>
>>>>>>> Stashed changes
      </span>
    )
  }
};

//A single course
export class ClassDisplay extends Component {
    constructor(props) {
		super(props);
		this.state = { classData: props.classData || {},
			hover: false};
    }
	handleMouseIn() {
		this.setState({ hover: true })
    }

    handleMouseOut() {
		this.setState({ hover: false })
	}

  render() {
    let classData = this.state.classData;
	const tooltipStyle = {
		display: this.state.hover ? 'block' : 'none'
	}

    return (
		  <div className="scheduleClass">
<<<<<<< Updated upstream
  			<button onClick={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} className="classLabel">
  				{classData.subject}{classData.number}{classData.section}<br/>
  				{classData.days} {classData.start} - {classData.end}<br/>
  				{classData.location}
  			</button>
=======
  			<div onClick={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} className="classLabel">
  				{classData.subject}{classData.number}{classData.section}<br/>
  				{classData.days} {classData.start} - {classData.end}<br/>
  				{classData.location}
  			</div>
>>>>>>> Stashed changes
  			<div className="timeLabel" style={tooltipStyle}>
  				{classData.title}<br/>
  				{classData.professor}<br/>
  				CRN: {classData.crn}<br/>
<<<<<<< Updated upstream
  				{classData.credits}
=======
  				Credits: {classData.credits}
>>>>>>> Stashed changes
  			</div>
		  </div>
    );
  }
};
