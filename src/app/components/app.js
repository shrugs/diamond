'use strict';

import React from 'react/addons';
var { CSSTransitionGroup } = React.addons;
import Router from 'react-router';
var {
  Route,
  Link,
  RouteHandler,
  DefaultRoute,
} = Router;

import Index from './Index';
import Page1 from './Page1';
import Page2 from './Page2';

// require('../styles/main.css');

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        <CSSTransitionGroup component="div" transitionName="fade">
          <RouteHandler key={window.location}/>
        </CSSTransitionGroup>
      </div>
    );
  }
}

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route path="page1" handler={Page1} />
    <Route path="page2" handler={Page2} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});
