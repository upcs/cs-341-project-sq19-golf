import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactTable from "react-table";
import '../css/styles.css';

//Availability Table
export class AvailabilityContainer extends Component { 
	constructor(props) {
		super(props);
	}
	
	handleSubmit(event) {
			event.preventDefault();
			const data = new FormData(event.target);
			console.log(data);

			fetch('/api/scheduleRequest', {
			  method: 'POST',
			  body: data
			});
		  }
	
	render() {
		const data = [{
				time: '8:00AM'
			},{
				time: '9:00AM'
			},{
				time: '10:00AM'
			},{
				time: '11:00AM'
			},{
				time: '12:00PM'
			},{
				time: '1:00PM'
			},{
				time: '2:00PM'
			},{
				time: '3:00PM'
			},{
				time: '4:00PM'
			},{
				time: '5:00PM'
			},{
				time: '6:00PM'
			},{
				time: '7:00PM'
			},{
				time: '8:00PM'
			},{
				time: '9:00PM'
			},{
				time: '10:00PM'
			}]

		const columns = [{
				Header: 'Time',
				accessor: 'time'
			},{
				Header: 'Monday',
				accessor: 'monday'
			},{
				Header: 'Tuesday',
				accessor: 'tuesday'
			},{
				Header: 'Wednesday',
				accessor: 'wednesday'
			},{
				Header: 'Thursday',
				accessor: 'thursday'
			},{
				Header: 'Friday',
				accessor: 'friday'
			}]

		return (
			<div id="table">
			  <ReactTable
				data={data}
				columns={columns}
			  />
			</div>
		  <form id="main" onSubmit={this.handleSubmit}>
			<SelectInput/>
			
			<Link to='/schedules'>
			  <button id="submitButton" form="main" type="submit">
				Submit
			  </button>
			</Link>
		  </form>
		);
  }
}

//Time Select Input
class SelectInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your unavailability over a typical school week: 
      </div>
    );
  }
};

function displaySchedules() {
  //TODO: Add logic

}