'use strict';

import React from 'react';
import { Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';

import { palette } from './styles/constants';

import mui from 'material-ui';
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
ThemeManager.setPalette(palette);

import ClientIndex from './ClientIndex';
import HostIndex from './HostIndex';
import ErrorPage from './ErrorPage';
import Streaming from './Streaming';
import Presenter from './Presenter';

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
          onClick={() => chrome.runtime.reload()}>Reload</FlatButton>
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

React.render(
  <Router history={new HashHistory({queryKey: true})}>
    <Route component={App}>
      <Route path="/" component={ClientIndex} />
      <Route path="error" component={ErrorPage} />
      <Route path="streaming" component={Streaming} />

      <Route path="host" component={HostIndex}>
        <Route path="present" component={Presenter} />
      </Route>

    </Route>
  </Router>,
  document.getElementById('app')
);
