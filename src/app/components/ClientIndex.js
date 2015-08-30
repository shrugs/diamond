'use strict';

/*
  ClientIndex.js

  Shows the client connection form (with title, tagline, and "connect" button)
  Offers a link to /host to turn the computer into a host computer
*/

import React from 'react';
import StyleSheet from 'react-style';
import { Link } from 'react-router';
import { full, button } from './styles/base';
import Banner from './Banner';

class ClientIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var metadata = {
      name: React.findDOMNode(this.refs.name).value,
      tagline: React.findDOMNode(this.refs.tagline).value,
    };
    console.log(metadata);
    this.context.router.transitionTo('error', {error: 'lsjfadsfjsf'}, {backTo: '/'});
  }

  render() {
    return(
      <div styles={[full]}>
        <Banner styles={[styles.banner]} />
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="name" />
          <input type="text" ref="tagline" />
          <button type="submit">Submit</button>
        </form>
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
});


export default ClientIndex;
