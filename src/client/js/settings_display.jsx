import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/styles.css';

export class SettingsContainer extends Component {
	constructor(props) {
		super(props);
		};
  
	render() {
		return (
		<section id="main">
			<button onClick={() => {alert('UPSchedule is a convenient schedule planner created by students, for students.');}}>About</button>
			<Link to="/">
			<button id="quit" type="button">
				Quit
			</button>
			</Link>
		</section>
		);
	}
}