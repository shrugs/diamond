'use strict';

/*
  HostIndex.js

  Shows the host room creating form (with unique name and "create" button)
  Offers a link to / to turn the computer into a client
*/

import React from 'react';
import StyleSheet from 'react-style';

export default class HostIndex extends React.Component {
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
