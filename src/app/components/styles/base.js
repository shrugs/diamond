'use strict';

import StyleSheet from 'react-style';

export default StyleSheet.create({
  full: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
  },
  button: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  screen: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
