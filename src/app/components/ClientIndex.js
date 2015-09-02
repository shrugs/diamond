'use strict';

/*
  ClientIndex.js

  Shows the client connection form (with title, tagline, and "connect" button)
  Offers a link to /host to turn the computer into a host computer
*/

import React from 'react';
import StyleSheet from 'react-style';

import {
  FlatButton,
  TextField,
} from 'material-ui';

import { full } from './styles/base';
import Banner from './Banner';
import LinkButton from './LinkButton';
import StreamPicker from './StreamPicker';


class ClientIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.syncToState = this.syncToState.bind(this);

    this.state = {
      room: '',
      title: '',
      tagline: '',
      stream: undefined,
    };
  }

  componentDidMount() {
    this.refs.room.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    this.context.router.transitionTo('client/stream', this.state, {stream: this.state.stream});
  }

  syncToState(k) {
    return (e) => {
      var s = {};
      s[k] = e.target.value;
      this.setState(s);
    };
  }

  render() {
    var allowConnect = this.state.room.length > 0 &&
                       this.state.title.length > 0 &&
                       this.state.tagline.length > 0 &&
                       this.state.stream !== undefined;
    return(
      <div styles={[full]}>
        <Banner styles={[styles.banner]} />
        <div styles={[styles.form]}>
          <TextField
            ref="room"
            onChange={this.syncToState('room')}
            hintText="my-event"
            floatingLabelText="Room" />
          <TextField
            ref="title"
            onChange={this.syncToState('title')}
            hintText="My Presentation"
            floatingLabelText="Title" />
          <TextField
            ref="tagline"
            onChange={this.syncToState('tagline')}
            hintText="A quick summary..."
            floatingLabelText="Tagline" />
          <StreamPicker styles={[styles.streamPicker]} onStream={(s) => { this.setState({stream: s}); }}>
            Choose a Screen
          </StreamPicker>
          <FlatButton
            style={styles.submit}
            onClick={this.onSubmit}
            secondary={true}
            disabled={!allowConnect}>Connect</FlatButton>
        </div>
        <div styles={[styles.footer]}>
          <LinkButton to="host" primary={true}>Become a Host</LinkButton>
        </div>
      </div>
    );
  }
}

ClientIndex.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
  banner: {
    height: '30vh',
  },
  form: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    marginTop: '20px',
  },
  streamPicker: {
    marginTop: '10px',
  },
  footer: {
    height: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ClientIndex;
