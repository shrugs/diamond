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


class ClientIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    return(
      <div styles={[full]}>
        <Banner styles={[styles.banner]} />
        <div styles={[styles.form]}>
          <TextField
            ref="room"
            hintText="my-event"
            floatingLabelText="Room" />
          <TextField
            ref="title"
            hintText="My Presentation"
            floatingLabelText="Title" />
          <TextField
            ref="tagline"
            hintText="A quick summary..."
            floatingLabelText="Tagline" />
          <FlatButton style={styles.submit} onClick={this.onSubmit} primary={true}>Connect</FlatButton>
        </div>
        <div styles={[styles.footer]}>
          <LinkButton to="host">Become a Host</LinkButton>
        </div>
      </div>
    );
  }
}

ClientIndex.contextTypes = {
  router: React.PropTypes.func.isRequired,
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
