import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import {Provider} from "react-redux";
import {store} from './redux';
import {TopNavigation, InputContainer} from './input_display';
import {AvailabilityContainer} from './availability_display';
import {SchedulesContainer} from './schedule_display';

//Allows fade transitions
const FadeInRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
);

//Allows navigation to other pages
const PageContainer = (
  <div id="pageContainer">
    <TopNavigation/>
    <FadeInRoute exact path="/" component={InputContainer}/>
    <FadeInRoute exact path="/availability" component={AvailabilityContainer}/>
    <FadeInRoute exact path="/schedules" component={SchedulesContainer}/>
  </div>
);

//Stores what is inputted into input page
const InputPage = (
  <Provider store={store}>
    <HashRouter>
      {PageContainer}
    </HashRouter>
  </Provider>
);

ReactDOM.render(InputPage, document.getElementById('root'));
