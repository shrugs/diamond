'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class Index extends React.Component {
  render() {
    return(
      <div styles={[styles.foo]}>HI IM AN INDEX</div>
    );
  }
}

var styles = StyleSheet.create({
  foo: {
    color: 'blue',
  },
});
