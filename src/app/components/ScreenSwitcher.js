'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class ScreenSwitcher extends React.Component {
  propTypes: {
    screens: React.PropTypes.array, // array of Screen Types that support .screenshot() & .metadata()
    focusedScreen: React.PropTypes.number, // index of focused screen, must be in bounds
  }

  render() {

    var screens = this.props.screens.map((s, i) => {
      var metadata = s.metadata();

      return (
        <div key={i}>
          <canvas ref={(c) => {
            console.log(this, c);
          }}></canvas>
          <h4>{metadata.title}</h4>
          <p>{metadata.tagline}</p>
        </div>
      );
    });

    return (
      <div styles={[this.props.styles]}>
        {screens}
      </div>
    );
  }
}

var styles = StyleSheet.create({

});
