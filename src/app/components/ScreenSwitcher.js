'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import { Paper } from 'material-ui';

const MARGINS = 20;
const MAX_SCREEN_WIDTH = 30;

export default class ScreenSwitcher extends React.Component {
  propTypes: {
    screens: React.PropTypes.array, // array of Screen Types that supports .content()
    focusedScreen: React.PropTypes.number, // index of focused screen, must be in bounds
  }

  constructor(props) {
    super(props);

    this.getScreenPreviewContent = this.getScreenPreviewContent.bind(this);

    this.state = {content: this.getScreenPreviewContent()};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screens !== nextProps.screens) {
      this.setState({
        content: this.getScreenPreviewContent(),
      });
    }
  }

  getScreenPreviewContent() {
    // return this.props.screens.map((s) => {
    //   var screen = React.render(s, document.getElementById('hidden'));
    //   return screen.content();
    // });

    return this.props.screens.map(() => {
      return (<div></div>);
    });
  }

  render() {

    var width = Math.min((100-MARGINS)/this.props.screens.length, MAX_SCREEN_WIDTH) + '%';

    var screens = this.props.screens.map((s, i) => {
      return (
        <Paper
          key={i}
          zDepth={this.props.focusedScreen === i ? 5 : 1}
          styles={[styles.screen, {width: width}]}>

          {this.state.content[i]}
        </Paper>
      );
    });

    return (
      <div styles={[this.props.styles, styles.container]}>
        {screens}
      </div>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(207, 216, 220, 0.7)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  screen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    transition: 'width .5s ease-in-out, box-shadow .2s ease-in-out',
    height: '80%',
  },
});
