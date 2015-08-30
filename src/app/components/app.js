'use strict';

import React from 'react/addons';

import { palette } from './styles/constants';

import mui from 'material-ui';
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
ThemeManager.setPalette(palette);

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

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  render() {
    // <CSSTransitionGroup component="div" transitionName="fade">
    //   <RouteHandler key={window.location}/>
    // </CSSTransitionGroup>
    return (
      <RouteHandler key={window.location}/>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={ClientIndex}/>
    <Route name="error" path="error/:error" handler={ErrorPage} />
    <Route path="streaming" handler={Streaming} />

    <Route name="host" path="host" handler={HostIndex}>
    </Route>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});
