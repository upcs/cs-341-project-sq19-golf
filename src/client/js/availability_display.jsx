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
      showMenu: this.props.showMenu || false,
			dropdownMenu: this.props.dropdownMenu || null,
	  	selected: -1
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
		if (!this.state.dropdownMenu.contains(event.target)) {

		  this.setState({ showMenu: false }, () => {
				document.removeEventListener('click', this.closeMenu);
		  });

		}
  }

	/*handleSubmit(event) {
			event.preventDefault();
			const data = new FormData(event.target);

			fetch('/api/scheduleRequest', {
			  method: 'POST',
			  body: data
			});
  }*/

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
				getProps: {(state, rowInfo) => ({
					if (typeof rowInfo !== "undefined") {
						return {
								onClick: (e, handleOriginal) => {
									this.setState({
										selected: rowInfo.row.accessor = 1;
									});
									var timePref = [][];
									function addPref (rowInfo, rowInfo.row.accessor) {
										timePref[rowInfo.row.acessor].push(rowInfo);
									}
									if(handleOriginal) {
										handleOriginal()
									}
								},
								style: {
									background: rowInfo.row.accessor === this.row.acessor? '#730ac9' : 'white',
									color: rowInfo.row === this.row.accessor? 'white' : 'black'
								},
							}
					}
					else {
						return {
							onClick: (e, handleOriginal) => {
								if (handleOriginal) {
									handleOriginal()
								}
							},
							style: {
								background: 'white',
								color: 'black'
						},
					}
					})}
			}

			columns.push(col);
		}

		return (
			<div id="main">
				<SelectInput/>
			 	<div id="tableCap"></div>
			  <ReactTable

				data={data}
				resolveData={data => data.map(row => row)}
				columns={columns}
				showPagination={false}
				minRows={0}
				sortable={false}
				resizable={false}
			  />
				<div className="bottom" id="option-container">
					<Link to="/">
						<button id="save" type="button">
							Save
						</button>
					</Link>
					<Link to="/availability" refresh="true">
						<button type="reset">
							Reset
						</button>
					</Link>
					<button onClick={this.showMenu}>
					  Additional Options
					</button>
					{
					  this.state.showMenu ? (
						  <div className="menu" ref={(element) => { this.state.dropdownMenu = element }}>
								<span id="blacklist">
									<div className="inputHeader">Professor Blacklist</div>
									<input id="profBlacklist" type="text" placeholder="Enter Professor Name"/>
									<button onClick={
										//possible check to make sure that user has indeed provided valid input.
											var profBL = document.getElementById("profBlacklist").value;
											var blacklistArray = [];
											function addProf (profBL) {
												blacklistArray.push(profBL);
												console.log("Blacklist: " + blacklistArray.join(", ") );
											}} id="profButton" form="main" type="profSave">
										Save
									</button>
								</span>
					  	</div>
						) : (null)
					}
				</div>
			</div>
		);
  }
}

//Time Select Input
export class SelectInput extends Component {
  render() {
    return (
      <div id="greetingText">Select your unavailability over a typical school week.</div>

    );
  }
};
