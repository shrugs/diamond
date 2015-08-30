'use strict';

import React from 'react/addons';
var { CSSTransitionGroup } = React.addons;
import Router from 'react-router';
var {
  Route,
  RouteHandler,
  DefaultRoute,
} = Router;

import ClientIndex from './ClientIndex';
import HostIndex from './HostIndex';
import ErrorPage from './ErrorPage';
import Streaming from './Streaming';

class App extends React.Component {
  render() {
    return (
      <CSSTransitionGroup component="div" transitionName="fade">
        <RouteHandler key={window.location}/>
      </CSSTransitionGroup>
    );
  }
}

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={ClientIndex}/>
    <Route name="error" path="error/:error" handler={ErrorPage} />
    <Route path="streaming" handler={Streaming} />

    <Route path="host" handler={HostIndex}>
    </Route>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});
