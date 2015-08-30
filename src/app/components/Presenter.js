'use strict';

/*
  Presenter.js

  handles the presentations themselves
  this view should be viewed in full screen

  listens for ctrl+tab (& ctrl+shift+tab) to switch between `Streams` where a `Steam` is anything that
  is position:absolute, height: 100vh, width: 100vh

  the
*/

import React from 'react/addons';
var { CSSTransitionGroup } = React.addons;

import { full } from './styles/base';

export default class Presenter extends React.Component {
  render() {

    var FocusedStream = (<div></div>);

    return (
      <div styles={[full]}>
        PRESENTING NOW
        {/* PUT OVERLAY THING HERE */}
        <CSSTransitionGroup component="div" transitionName="fade" transitionAppear={true}>
          <FocusedStream key="whatever - use the peer.js id for the stream" />
        </CSSTransitionGroup>
      </div>
    );
  }
}
