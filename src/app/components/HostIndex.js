'use strict';

/*
  HostIndex.js

  Shows the host room creating form (with unique name and "create" button)
  Offers a link to / to turn the computer into a client
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


class HostIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.refs.room.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    var room = this.refs.room.getValue();
    console.log(room);
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
          <FlatButton style={styles.submit} onClick={this.onSubmit} primary={true}>Begin Hosting</FlatButton>
        </div>
        <div styles={[styles.footer]}>
          <LinkButton to="/">Become a Client</LinkButton>
        </div>
      </div>
    );
  }
}

HostIndex.contextTypes = {
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


export default HostIndex;
