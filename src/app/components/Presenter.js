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
import StyleSheet from 'react-style';
import { FlatButton } from 'material-ui';

import { full, button } from './styles/base';
import { palette } from './styles/constants';

import LinkButton from './LinkButton';

export default class Presenter extends React.Component {

  constructor() {
    super();

    this.fullscreen = this.fullscreen.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      hasFullscreenedOnce: false,
    }
  }

  componentDidMount() {
    window.addEventListener('webkitfullscreenchange', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('webkitfullscreenchange', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  fullscreen() {
    document.documentElement.webkitRequestFullscreen();
    this.setState({hasFullscreenedOnce: true});
  }

  render() {
    var r = [];
    if (document.webkitIsFullScreen) {
      r.push(
        <div key="presenter">
          {/* PUT OVERLAY THING HERE */}
          <CSSTransitionGroup component="div" transitionName="fade">
            <div key="test">
              YO YO YO
            </div>
          </CSSTransitionGroup>
        </div>
      );
    } else {
      r.push(
        <div styles={[styles.readyContainer]} key="ready">
          <h2 styles={[styles.title]}>You're Ready to Present</h2>
          <FlatButton
            styles={[button]}
            primary={this.state.hasFullscreenedOnce}
            secondary={!this.state.hasFullscreenedOnce}
            onClick={this.fullscreen.bind(this)}>
            Start Presenting
          </FlatButton>
          <p styles={[styles.subtext]}>You must make this window fullscreen to present.</p>
        </div>
      );

      if (this.state.hasFullscreenedOnce) {
        r.push(
          <div key="finished" styles={[styles.readyContainer, styles.back]}>
            <h2 styles={[styles.title]}>Done Presenting?</h2>
            <LinkButton
              to="host"
              styles={[button]}
              secondary={true}>
              Finish Presenting
            </LinkButton>
          </div>
        );
      }
    }

    return (
      <div styles={[full, styles.container]}>
        {r}
      </div>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto, sans-serif',
  },
  subtext: {
    color: palette.accent3Color,
  },
  readyContainer: {
    textAlign: 'center',
  },
  back: {
    marginTop: '30px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
