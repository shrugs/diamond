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

import { Link } from 'react-router';

import { full } from './styles/base';
import Banner from './Banner';
import LinkButton from './LinkButton';


class ClientIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.syncToState = this.syncToState.bind(this);

    this.state = {
      room: '',
      title: '',
      tagline: '',
    };
  }

  componentDidMount() {
    this.refs.room.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    // var metadata = {
    //   room: this.refs.room.getValue(),
    //   title: this.refs.title.getValue(),
    //   tagline: this.refs.tagline.getValue(),
    // };
    // console.log(metadata);
    this.context.router.transitionTo('error', {error: 'lsjfadsfjsf'}, {backTo: '/'});
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
                       this.state.tagline.length > 0;
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
          <FlatButton
            style={styles.submit}
            onClick={this.onSubmit}
            primary={true}
            disabled={!allowConnect}>Connect</FlatButton>
        </div>
        <div styles={[styles.footer]}>
          <LinkButton to="host">Become a Host</LinkButton>
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
  footer: {
    height: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ClientIndex;
