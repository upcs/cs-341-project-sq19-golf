import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/styles.css';

export class SettingsContainer extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
		<section id="main">
			<Link to="/">
			<button id="quit" type="button">
				Quit
			</button>
			</Link>
		</section>
		);
	}
}