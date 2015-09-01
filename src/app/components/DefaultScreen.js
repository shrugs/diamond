'use strict';

import React from 'react';

import { screen } from './styles/base';

export default class DefaultScreen extends React.Component {

  constructor() {
    super();

    this.screenshot = this.screenshot.bind(this);
  }

  metadata() {
    return {
      title: 'Default Screen',
      tagline: 'I\'m the default. _Nice_. ',
    };
  }

  screenshot(ctx) {
    ctx.fillRect(0, 0, 100, 100);
    var img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 100, 100);
    };
    img.src = this.props.src;
  }

  render() {
    return (
      <div {...this.props} styles={[screen].concat(this.props.styles)}>
        <img style={{maxWidth: '100%', maxHeight: '100%'}} src={this.props.src}></img>
      </div>
    );
  }
}
