'use strict';

import React from 'react';

import { screen } from './styles/base';

export default class DefaultScreen extends React.Component {
  render() {
    return (
      <div {...this.props} styles={[screen].concat(this.props.styles)}>
        <img style={{maxWidth: '100%', maxHeight: '100%'}} src={this.props.src}></img>
      </div>
    );
  }
}
