'use strict';

import React from 'react';
import { full, button } from './styles/base';
import StyleSheet from 'react-style';
import { Link } from 'react-router';

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div styles={[full, styles.container]}>
        Hi, this is an error page!
        {this.props.params.error}
        <Link styles={[button]} to={this.props.query.backTo || '/'}>Back to Safety</Link>
      </div>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
