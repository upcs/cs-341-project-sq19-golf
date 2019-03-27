import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/styles.css';

//Options for About Page and Quit to Initial Page
export class HelpContainer extends Component {
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
			<div className="textContainer">
				<div className="contentsTable">
					<b id="tableTitle">Help Directory</b>
					<ul>
					<li><a href="#q1">Question 1</a></li>
					</ul>
				</div>
				<br />
				<div className="helpSet" id="h1">
					<a id="q1">Question</a>
					<p className="helpContent" id="a1">Answer</p>
				</div>

			</div>
		</section>
		);
	}
}
