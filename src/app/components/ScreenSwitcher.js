'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class ScreenSwitcher extends React.Component {
  propTypes: {
    screens: React.PropTypes.array, // array of Screen Types that support .screenshot() & .metadata()
    focusedScreen: React.PropTypes.number, // index of focused screen, must be in bounds
  }

  render() {
    return (
      <div>SCREEN PICKER YAY {this.props.focusedScreen}</div>
    );
  }
}

var styles = StyleSheet.create({

});
