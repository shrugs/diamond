'use strict';

import React from 'react/addons';
var { CSSTransitionGroup } = React.addons;

class PresentationWrapper extends React.Component {
  render() {
    var key = this.props.location.pathname;
    console.log(key);
    return (
      <CSSTransitionGroup component="div" transitionName="fade" transitionAppear={true}>
        {React.cloneElement(this.props.children || <div/>, { key: key })}
      </CSSTransitionGroup>
    );
  }
}

// PresentationWrapper.contextTypes = {
//   router: React.PropTypes.func.isRequired,
// };

export default PresentationWrapper;
