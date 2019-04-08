//Sprint 4: Performance testing
//var start = Date.now();
//

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import {Provider} from "react-redux";

import {store} from './redux';
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
  <Provider store={store}>
    <HashRouter>
      {PageContainer}
    </HashRouter>
  </Provider>
);

ReactDOM.render(InputPage, document.getElementById('root'));

/*//Sprint 4: Performance testing
var webshot = require('webshot');
renderPage("http://google.com");
renderPage("http://youtube.com");
renderPage("http://up.edu");
renderPage("http://amazon.com");
renderPage("en.wikapedia.ord/wiki/Main_Page");
//

function renderPage(url) {
  webshot(url, url + '.png', function(err) {
    console.log(url + " load time: " + (Date.now() - start) / 1000 + " seconds");
  });
}*/
