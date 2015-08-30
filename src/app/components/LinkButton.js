'use strict';
import React from 'react';
import { Link } from 'react-router';
import assign from 'react/lib/Object.assign';
import { FlatButton } from 'material-ui';

export default class LinkButton extends Link {
  render() {

    var { router } = this.context;
    var { to, query } = this.props;

    var props = assign({}, this.props, {
      href: router.makeHref(to, query),
      onClick: this.handleClick,
    });

    // ignore if rendered outside of the context of a router, simplifies unit testing
    if (router && router.isActive(to, query)) {
      if (props.activeClassName)
        props.className += props.className !== '' ? ` ${props.activeClassName}` : props.activeClassName;
    }

    props.style = assign({}, props.style, props.activeStyle || {}, {
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'center',
    });


    return (
      <FlatButton linkButton={true} secondary={true} {...props}>
        {props.children}
      </FlatButton>
    );
  }
}
