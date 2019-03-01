import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";

import {HashRouter, Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';

import {SettingsContainer} from './settings_display';
import {TopNavigation, InputContainer} from './input_display';
import {AvailabilityContainer} from './availability_display';
import {SchedulesContainer} from './schedule_display';

const FadeInRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
);

const PageContainer = (
  <div id="pageContainer">
    <TopNavigation/>
    <FadeInRoute exact path="/" component={InputContainer}/>
    <FadeInRoute exact path="/settings" component={SettingsContainer}/>
    <FadeInRoute exact path="/availability" component={AvailabilityContainer}/>
    <FadeInRoute exact path="/schedules" component={SchedulesContainer}/>
  </div>
);

const InputPage = (
    <HashRouter>
      {PageContainer}
    </HashRouter>
);

ReactDOM.render(InputPage, document.getElementById('root'));
