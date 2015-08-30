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

import {
  full,
  input,
} from './styles/base';
import Banner from './Banner';

class ClientIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.refs.title.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    var metadata = {
      title: this.refs.title.getValue(),
      tagline: this.refs.tagline.getValue(),
    };
    console.log(metadata);
    // this.context.router.transitionTo('error', {error: 'lsjfadsfjsf'}, {backTo: '/'});
  }

  render() {
    return(
      <div styles={[full]}>
        <Banner styles={[styles.banner]} />
        <div styles={[styles.form]}>
          <TextField
            ref="title"
            floatingLabelText="Title" />
          <TextField
            ref="tagline"
            floatingLabelText="Tagline" />
          <FlatButton style={styles.submit} onClick={this.onSubmit} primary={true}>Submit</FlatButton>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    marginTop: '20px',
  },
});


export default ClientIndex;
