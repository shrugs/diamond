'use strict';
import React from 'react';
import { Link } from 'react-router';
import assign from 'react/lib/Object.assign';
import { FlatButton } from 'material-ui';

export default class LinkButton extends Link {
  render() {
    var props = assign({}, this.props, {
      href: this.getHref(),
      className: this.getClassName(),
      onClick: this.handleClick.bind(this),
    });

    if (props.activeStyle && this.getActiveState()) {
      props.style = props.activeStyle;
    }
    props.style = assign({}, props.style, {
      textAlign: 'center',
      paddingLeft: '10px',
      paddingRight: '10px',
    });

    return (
      <FlatButton linkButton={true} secondary={true} {...props}>
        {this.props.children}
      </FlatButton>
    );
  }
}
