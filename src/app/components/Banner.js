'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class Banner extends React.Component {

  render() {
    return (
      <div styles={[styles.container].concat(this.props.styles, this.props.style)}>
        <img src="images/icon-240.png" styles={[styles.img]} />
        <h1 styles={[styles.title]}>Diamond</h1>
      </div>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '70%',
  },
  title: {
    margin: '0',
  },
});
