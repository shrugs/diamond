'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import { full } from './styles/base';

import { FlatButton, CircularProgress } from 'material-ui';

import Peer from 'peerjs';

export default class Streaming extends React.Component {
  constructor(props) {
    super(props);

    this.disconnect = this.disconnect.bind(this);
    this.error = this.error.bind(this);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    var { room, title, tagline } = this.props.location.query;
    var { stream } = this.props.location.state;

    var peer = new Peer({key: 'qfsyx0jzn7xbhuxr'});
    var call = peer.call(room, stream, {metadata: {title: title, tagline: tagline}});
    call.on('close', () => {
      // CONNECTION CLOSED
      this.setState({
        call: undefined,
      });
      // @TODO(shrugs) trigger steaming ending here
      this.disconnect();
    });
    call.on('error', this.error);

    // long poll the call to see when it's opened
    var check = window.setInterval(() => {
      if (call.open) {
        this.setState({
          loading: false,
        });
        window.clearInterval(check);
      }
    }, 300);

    stream.onended = this.disconnect;

    this.setState({
      call: call,
      stream: stream,
    });
  }

  componentWillUnmount() {
    // Destroy peer stuff
    if (this.state.call && this.state.call.open) {
      console.log('closing call...');
      this.state.call.close();
    }

    if (this.state.stream) {
      this.state.stream.stop();
    }
  }

  disconnect() {
    this.context.router.transitionTo('client/error', {error: 'this isn\'t actually an error'});
  }

  error(err) {
    console.log(err);
    // this.context.router.transitionTo('client/error', {error: err.type}, {backTo: '/'});
  }

  render() {
    return (
      <div styles={[full, styles.container]}>

        {
          this.state.loading ?
          <CircularProgress innerStyle={{margin: 0}} mode="indeterminate"/> :
          <div>
            <h1 styles={[styles.title]}>You're Connected</h1>
            <p> to {this.props.location.query.room}</p>
          </div>
        }

        <FlatButton styles={[styles.button]} onClick={this.disconnect}>{this.state.loading ? 'Cancel' : 'Disconnect'}</FlatButton>

      </div>
    );
  }
}

Streaming.contextTypes = {
  router: React.PropTypes.object,
};

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '20px',
  },
});
