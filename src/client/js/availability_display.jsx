import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import '../css/styles.css';
import Dropdown from 'react-dropdown';
import ReactDataGrid from 'react-data-grid';
import {store, modifyConstraints} from './redux';
import {Course}  from '../../server/courses';

var bigInt = require("big-integer");

//Availability Table
export class AvailabilityContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      showMenu: this.props.showMenu || false,
			dropdownMenu: this.props.dropdownMenu || null,
	  	selected: -1,
			blacklistArray: [],
			blacklistInput: "",

			//props for availability constraints
			selectedDay: null,
			selectedStartHour: null,
			selectedStartMin: null,
			selectedEndHour: null,
			selectedEndMin: null,
			constraints: [],
			numConstraints: 0,
			delConstraintID: null,

			//props for blacklist

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

  parseDay(day){
	  switch (day){ //days
			case "Monday":
				return "M";
			case "Tuesday":
				return "T";
			case "Wednesday":
				return "W";
			case "Thursday":
				return "R";
			case "Friday":
				return "F";
		}

	}

	render() {

	let optionsDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	let optionsHrs = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    let optionsMins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

	let columns = [ {key: 'number', name:'ID'},
					{key: 'Day', name:'Day'},
					{key: 'StartHour', name:'Start Hour'},
					{key: 'StartMin', name:'Start Minute'},
					{key: 'EndHour', name:'End Hour'},
					{key: 'EndMin', name:'End Minute'}];

	return (
		<div>
			<React.Fragment>
				<td>
					<Dropdown

						placeholder='Select day'

						options={optionsDays}
						onChange={(e) => {
							this._onSelect;
							this.setState({selectedDay: (e.value)});
						}}

					>
					</Dropdown>
				</td>
				<td>

					<Dropdown

						options={optionsHrs}
						onChange={(e) => {
							this._onSelect;
							this.setState({selectedStartHour: (e.value)});
						}}

						placeholder='Select start hour'
					>
					</Dropdown>
				</td>
				<td>
					<Dropdown options={optionsMins}

						onChange={(e) => {
							this._onSelect;
							this.setState({selectedStartMin: (e.value)});

						}}

						placeholder='Select start minute'
					>
					</Dropdown>

				</td>
				<td>

					<Dropdown

						options={optionsHrs}
						onChange={(e) => {
							this._onSelect;
							this.setState({selectedEndHour: (e.value)});
						}}

						placeholder='Select end hour'
					>
					</Dropdown>
				</td>
				<td>
					<Dropdown options={optionsMins}

						onChange={(e) => {
							this._onSelect;
							this.setState({selectedEndMin: (e.value)});
						}}

						placeholder='Select end minute'
					>
					</Dropdown>

				</td>
				<td>
					<button onClick={()=>{
								//check that all fields are filled out for each constraint. If not: give error msg.
								if((this.state.selectedDay == null) || (this.state.selectedStartHour == null) ||
										(this.state.selectedStartMin == null) || (this.state.selectedEndHour == null) ||
										(this.state.selectedEndMin == null)) {
										alert("Please fill all constraints");
									}
									else { //If so, store constraints
										this.state.constraints.push(
											{	number: this.state.numConstraints, //keep count to be able to remove
												Day: this.state.selectedDay,
												StartHour: this.state.selectedStartHour,
												StartMin: this.state.selectedStartMin,
												EndHour: this.state.selectedEndHour,
												EndMin: this.state.selectedEndMin
											}
										);
										this.setState({numConstraints: this.state.numConstraints + 1});
										//console.log(this.state.constraints);
										}
									}}
					>Add</button>
				</td>

			</React.Fragment>
			<div>
				<ReactDataGrid columns={columns} //columns defined before return statement:
								rowGetter={i => this.state.constraints[i]} //iterate through constraints elements
								rowsCount = {this.state.constraints.length}
				/>
			</div>
			<div>
				<td>
					<input type="number" value={this.state.delConstraintID} onChange={(e) => {
						if (this.state.constraints.length > e.target.value && e.target.value >= 0){
							this.setState({delConstraintID : e.target.value});
						}
					}}/>
				</td>
				<td>
					<button onClick={()=>{
						this.setState({
							constraints: this.state.constraints.filter((x) => {
											return this.state.delConstraintID != x.number;
										})
						});
						this.setState({numConstraints: this.state.numConstraints - 1});
					}}> Remove Constraint</button>
				</td>
			</div>

			<div className="bottom" id="option-container">
				<Link to="/">
					<button id="save" type="button" onClick=
						{()=>
							{	//GENERATE DUMMY COURSES FORM CONSTRAINTS
								//TODO: SEND ARRAY OF DUMMY COURSES TO SCHEDULING PAGE AND TREAT AS REGULAR COURSE
									let initialMask = "0" * 168;
									let constraintsMask = [[],[],[],[],[]]; //weekMask
									for(var i = 0; i < this.state.constraints.length; i++){
										let course = new Course('DUMMY','DUMMY','DUMMY','DUMMY','DUMMY', //subject, number, section, title, crn
										String(this.state.constraints[i].StartHour + ':' + this.state.constraints[i].StartMin + " am"), //start
										String(this.state.constraints[i].EndHour + ':' + this.state.constraints[i].EndMin + " am"),  //end
										this.parseDay(this.state.constraints[i].Day), 'DUMMY', 'DUMMY', 'DUMMY') //professor, location, credits
										constraintsMask[0].push(course.mask[0]);
										constraintsMask[1].push(course.mask[1]);
										constraintsMask[2].push(course.mask[2]);
										constraintsMask[3].push(course.mask[3]);
										constraintsMask[4].push(course.mask[4]);
										//console.log(course.mask);
								}
								var orMask = new Array(5);
								for(var j = 0; j < 5; j++){
									//accumulator and current are binary strings
									orMask[j] = (constraintsMask[j].reduce(function(accumulator, current) { return (bigInt(accumulator, 2).or(bigInt(current, 2))).toString(2);})); //bitwise OR on all masks
									//now orMask contains the mask that represents all diferent constraints

								}
								if(orMask == null) {orMask = [initialMask, initialMask, initialMask, initialMask, initialMask];}
								let constraints = { timeMask: orMask, profBlacklist: this.state.blacklistArray };
								store.dispatch(modifyConstraints(constraints));
							}
						}
					>Save
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
									<input id="profBlacklist" type="text" placeholder="Enter Professor Name" value={this.state.blacklistInput}
											onChange={(e) => {this.setState({blacklistInput: e.target.value});}
													}
									/>
									<button onClick={() => this.state.blacklistArray.push(this.state.blacklistInput)} id="profButton" form="main" type="profSave">
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
