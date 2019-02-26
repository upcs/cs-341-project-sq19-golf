import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import '../css/styles.css';

//Availability Table
export class AvailabilityContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      showMenu: false,
		};

	  this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	showMenu(event) {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
		  document.addEventListener('click', this.closeMenu);
		});
  }

  closeMenu(event) {
		if (!this.dropdownMenu.contains(event.target)) {

		  this.setState({ showMenu: false }, () => {
				document.removeEventListener('click', this.closeMenu);
		  });

		}
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

	refreshPage() {
		window.location.reload();
	}

	render() {
		let data = [];
		for(let time = 8; time <= 22; time++) {
			let row = {
				times: time + ":00",
				monday: null,
				tuesday: null,
				wednesday: null,
				thursday: null,
				friday: null,
				saturday: null,
				sunday: null
			}

			data.push(row);
		}

		let columns = [], colAccessors = ['times', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		for (let i = 0; i < colAccessors.length; i++) {
			let accessor = colAccessors[i];
			let col = {
				Header: accessor.charAt(0).toUpperCase() + accessor.slice(1),
				accessor: accessor,
			}

			columns.push(col);
		}

		return (
			<div id="main">
				<SelectInput/>
			  <ReactTable
					data={data}
					resolveData={data => data.map(row => row)}
					columns={columns}
					showPagination={false}
					minRows={0}
					sortable={false}
					resizable={false}
			  />
			<div>
				<button type="reset" onClick={ refreshPage }>
					Reset
				</button>
				<button onClick={this.showMenu}>
				  Additional Options
				</button>

				{
				  this.state.showMenu
					? (
					  <div
						className="menu"
						ref={(element) => {
						  this.dropdownMenu = element;
						}}
					  >
						<div id="credit">Max Credit Amount:
							<input type="number" placeholder="Enter Max Credit Value" onChange={this.props.handleChange} data-populated="false"/>
							<button id="creditButton" form="main" type="creditSave">
							Save
							</button>
						</div>
						<div id="blacklist">Professor Blacklist:
							<input id="profBlacklist" type="text" placeholder="Enter Professor Name"/>
							<button id="profButton" form="main" type="profSave">
							Save
							</button>
						</div>
					  </div>
					)
					: (
					  null
					)
				}
			  </div>
			  <form id="main" onSubmit={this.handleSubmit}>
					<Link to='/schedules'>
					  <button id="submitButton" form="main" type="submit">
							Submit
					  </button>
					</Link>
					<Link to='/'>
						<button form="main" type="submit">
							Return
						</button>
					</Link>
			  </form>
			</div>
		);
  }
}

//Time Select Input
export class SelectInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your unavailability over a typical school week:</div>
    );
  }
};
