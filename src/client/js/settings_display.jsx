import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Return from './return.jsx'
import '../css/styles.css';

//Options for About Page and Quit to Initial Page
export class SettingsContainer extends Component {
	constructor(props) {
		super(props);

		let defaultOnClick = () => alert('UPSchedule is a convenient schedule planner created by students, for students.');
		this.state = {
			onClick: this.props.onClick || defaultOnClick
		};
	};

	render() {
		return (
		<section id="main">
			<button id='aboutButton' onClick={this.state.onClick}>About</button>
			<Link to="/">
				<button id="quit" type="button">
					Quit
				</button>
			</Link>
		</section>
		);
	}
}
