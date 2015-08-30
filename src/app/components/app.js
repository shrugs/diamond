'use strict';

import React from 'react/addons';

import { palette } from './styles/constants';

import mui from 'material-ui';
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
ThemeManager.setPalette(palette);

import Router from 'react-router';
var {
  Route,
  RouteHandler,
  DefaultRoute,
} = Router;

import ClientIndex from './ClientIndex';
import PresentationWrapper from './PresentationWrapper';
import HostIndex from './HostIndex';
import ErrorPage from './ErrorPage';
import Streaming from './Streaming';

import { FlatButton } from 'material-ui';

class App extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  render() {
    return (
      <div>
        <FlatButton
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '9999',
          }}
          onClick={() => chrome.runtime.reload()} >Reload</FlatButton>
        <RouteHandler key={window.location}/>
      </div>
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

    <Route name="host" path="host" handler={PresentationWrapper}>
      <DefaultRoute handler={HostIndex} />
      <Route name="fuck" path="error" handler={ErrorPage} />
    </Route>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});
