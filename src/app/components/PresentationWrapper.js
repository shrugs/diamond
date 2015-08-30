'use strict';

import React from 'react';
var { CSSTransitionGroup } = React.addons;

import { RouteHandler } from 'react-router';

class PresentationWrapper extends React.Component {
  render() {
    console.log(this.context.router.getCurrentPath());
    return (
      <CSSTransitionGroup component="div" transitionName="fade" transitionAppear={true}>
        <RouteHandler key={this.context.router.getCurrentPath()}/>
      </CSSTransitionGroup>
    );
  }
}
PresentationWrapper.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default PresentationWrapper;
