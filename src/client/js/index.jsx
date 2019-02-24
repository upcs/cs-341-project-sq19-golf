import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';

import {TopNavigation, InputContainer} from './input_display';
import {SchedulesContainer} from './schedule_display';

const FadeInRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
);

const pageContainer = (
  <div id="pageContainer">
    <TopNavigation/>
    <FadeInRoute exact path="/" component={InputContainer}/>
    <FadeInRoute exact path="/schedules" component={SchedulesContainer}/>
  </div>
);

const inputPage = (
    <BrowserRouter>
      {pageContainer}
    </BrowserRouter>
);

ReactDOM.render(inputPage, document.getElementById('root'));
