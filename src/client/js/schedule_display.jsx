import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
        const pdf = new jsPDF("1", "mm", "a4");
        pdf.addImage(imgData, 'JPEG', 20, 20, 180, 150);
        pdf.output('/schedules');
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
    			<div className="horiz-container">
    			  <Schedules/>
    			</div>
    		</div>
        <div className="bottom">
          <button className="print" onClick={this.printDocument}>Save As PDF</button>
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
        {classDisplayList}
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
			<button onClick={this.handleMouseIn.bind(this)} className="classLabel">
				{classData.subject}{classData.number}<br/>
				{classData.days} {classData.start} - {classData.end}
			</button>
			<div className="timeLabel" style={tooltipStyle}>
				{classData.title}<br/>
				Instructor: {classData.professor}
			</div>
		  </div>
    );
  }
};
