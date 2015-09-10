'use strict';

import React from 'react';
import { full, button } from './styles/base';
import StyleSheet from 'react-style';
import LinkButton from './LinkButton';
import { FontIcon } from 'material-ui';

export default class DonePage extends React.Component {
  render() {
    return (
      <div styles={[full, styles.container]}>
        <h2 styles={[styles.header]}>
          <span>Done Presenting</span>
          <FontIcon style={styles.icon} className="material-icons">check</FontIcon>
        </h2>
        <LinkButton styles={[button, styles.button]} to={'/'}>Back to Home</LinkButton>
      </div>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: '10px',
  },
  button: {
    marginTop: '20px',
  },
});
