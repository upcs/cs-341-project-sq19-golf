import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
        pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      });
  }

  render() {
    const Schedules = this.connectSchedules();
	
    //TODO: Needs date/professor information
    return (
      <section id="main">
    		<div id="name">Schedule Name:
    			<input id="scheduleName" type="text" placeholder="Enter Schedule Name Here"/>
    		</div>
        <div className="horiz-container">
          <Schedules/>
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
		  <div id="divToPrint" className="pdfdim">
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
	state = {
		selected: 0
	  };
	  
	  onSelect = key => {
		this.setState({ selected: key });
	  }
  }
  
  horizScroll() {
  const MenuItem = ({ text, selected }) => {
	  return (
		<div
		  className="menu-item"
		>
		  {text}
		</div>
	  );
	};

	// All items component
	// Important! add unique key
	const Menu = (list) => list.map(el => {
	  const { name } = el;

	  return (
		<MenuItem
		  text={name}
		  key={name}
		/>
	  );
	});

	const Arrow = ({ text, className }) => {
	  return (
		<div
		  className={className}
		>{text}</div>
	  );
	};

	const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
	const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
  }

  render() {
    let schedule = this.state.schedule;

    let classDisplayList = schedule.map((classData, i) => {
      return (
        <ClassDisplay key={"class-" + i} classData={classData}/>
      )
    });

	const { selected } = this.state;
    // Create menu from items
    const menu = Menu(classDisplayList, selected)
	
    return (
      <span className="scheduleOption">
        {classDisplayList}
		<ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
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
		  <div className="profName">
			{classData.profName} 
		  </div>}>
		  <div className="scheduleClass">
			<span className="timeLabel">
			  {classData.start} - {classData.end}
			</span>
			<span className="classLabel">
			  {classData.title}  
			</span>
		  </div>
	  </hover>
    );
  }
};
