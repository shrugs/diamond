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
import Screen from './Screen';
import DefaultScreen from './DefaultScreen';
import ScreenSwitcher from './ScreenSwitcher';

import Peer from 'peerjs';

import key from 'keymaster';

const FORWARD_SHORTCUT = 'ctrl+tab';
const BACKWARD_SHORTCUT = 'shift+ctrl+tab';

const TESTING = true;
const TIMER_DELAY = 6000;

export default class Presenter extends React.Component {

  constructor(props) {
    super();

    this.fullscreen = this.fullscreen.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.incrementFocusedScreen = this.incrementFocusedScreen.bind(this);
    this.decrementFocusedScreen = this.decrementFocusedScreen.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.windowFocused = this.windowFocused.bind(this);
    this.onCall = this.onCall.bind(this);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      hasFullscreenedOnce: false,
      focusedScreen: 0,
      tempFocusedScreen: 0,
      screens: [
        (<DefaultScreen key="default" src={props.location.query.defaultScreen} />),
      ],
    };
  }

  componentDidMount() {
    key(FORWARD_SHORTCUT, this.incrementFocusedScreen);
    key(BACKWARD_SHORTCUT, this.decrementFocusedScreen);
    window.addEventListener('webkitfullscreenchange', this.updateDimensions);

    // INIT PEERJS
    var peer = new Peer(this.props.location.query.room, {key: 'qfsyx0jzn7xbhuxr'});
    peer.on('call', this.onCall);
  }
  componentWillUnmount() {
    key.unbind(FORWARD_SHORTCUT);
    key.unbind(BACKWARD_SHORTCUT);
    window.removeEventListener('webkitfullscreenchange', this.updateDimensions);

    // DESTROY PEERJS
    // @TODO(shrugs) message all of the peers that the host will now shut down
    // call .close() on all connections
  }

  /**
    BEGIN PEERJS LOGIC BLOCK
  **/

  onCall(call) {
    call.answer();
    call.on('stream', (remoteStream) => {
      // got a new remoteStream ; save to store and setState with a new Screen
      var url = window.URL.createObjectURL(remoteStream);
      this.state.screens.push(
        <Screen key={url} src={url} metadata={call.metadata} />
      );
      this.setState({
        screens: this.state.screens,
        focusedScreen: this.state.screens.length,
      });
    });
  }

  /**
    END PEERJS LOGIC BLOCK
  **/

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

  resetTimer() {
    window.clearTimeout(this.state.timer);
    this.setState({timer: window.setTimeout(this.windowFocused, TIMER_DELAY)});
  }

  windowFocused() {
    // hide screenswitcher ui
    // change focusedScreen state var
    var screens = this.state.screens;
    var tScreen = screens.splice(this.state.tempFocusedScreen, 1)[0];
    screens.unshift(tScreen);
    this.setState({
      timer: undefined,
      focusedScreen: 0,
      screens: screens,
    });
  }

  incrementFocusedScreen() {
    var i = this.state.timer !== undefined ? this.state.tempFocusedScreen : 0 ;
    i = (i + 1) % this.state.screens.length;
    this.setState({
      tempFocusedScreen: i,
    });
    this.resetTimer();
  }

  decrementFocusedScreen() {
    var i = this.state.timer !== undefined ? this.state.tempFocusedScreen : this.state.screens.length;
    i = (i - 1);
    if (i < 0) {
      i = this.state.screens.length - 1;
    }
    this.setState({
      tempFocusedScreen: i,
    });
    this.resetTimer();
  }

  render() {
    var r = [];
    if (document.webkitIsFullScreen || TESTING) {
      r.push(
        <div key="presenter">
          <div styles={[styles.presenter]}>
            {this.state.timer !== undefined ? <ScreenSwitcher styles={[full, styles.switcher]} screens={this.state.screens} focusedScreen={this.state.tempFocusedScreen} /> : null}
          </div>
          <CSSTransitionGroup component="div" transitionName="fade" style={styles.presentationContainer}>
            {this.state.screens[this.state.focusedScreen]}
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
        <div style={{
          position: 'absolute',
          background: 'url(' + this.props.location.query.defaultScreen + ') no-repeat',
          backgroundSize: 'cover',
          WebkitFilter: 'blur(30px)',
          width: '100%',
          height: '100%',
        }}></div>
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
    backgroundColor: '#424242',
  },
  presentationContainer: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  presenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    height: '100vh',
    width: '100vw',
  },
  switcher: {
    zIndex: '1',
    height: '30vh',
    position: 'relative',
  },
});
