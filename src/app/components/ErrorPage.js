'use strict';

import React from 'react';
import { full } from './styles/base';
import StyleSheet from 'react-style';
import LinkButton from './LinkButton';

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div styles={[full, styles.container]}>
        <div>
          <div>Hi, this is an error page!</div>
          <div>{this.props.location.query.error}</div>
        </div>
        <LinkButton to={this.props.location.state.backTo || '/'}>Back</LinkButton>
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
