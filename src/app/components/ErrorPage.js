'use strict';

import React from 'react';
import { full } from './styles/base';
import StyleSheet from 'react-style';
import LinkButton from './LinkButton';

console.log(full);

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div styles={[full, styles.container]}>
        <div>
          Hi, this is an error page!
          {this.props.params.error}
        </div>
        <LinkButton to={this.props.query.backTo || '/'}>Back</LinkButton>
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
