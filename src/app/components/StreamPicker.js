'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {
  FlatButton,
  FontIcon,
  Avatar,
  CircularProgress,
} from 'material-ui';
import { button } from './styles/base';
import { palette } from './styles/constants';

export default class StreamPicker extends React.Component {

  propTypes: {
    onStream: React.PropTypes.func,
  }

  constructor() {
    super();

    this.getImage = this.getImage.bind(this);
    this.chooseStream = this.chooseStream.bind(this);
    this.state = {stream: undefined, loading: false};
  }

  getImage() {
    return this.state.stream;
  }

  chooseStream() {
    this.setState({loading: true});
    chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], (id) => {
      if (!id) {
        console.log('REJECTED');
        this.setState({
          stream: undefined,
          loading: false,
        });
        this.props.onStream(undefined);
        return;
      }

      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      }, (stream) => {
        this.setState({
          stream: stream,
          loading: false,
        });
        this.props.onStream(stream);
      }, (e) => {
        this.setState({
          stream: undefined,
        });
        this.props.onStream(undefined);
        // ERROR
        console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
      });
    });
  }

  render() {
    var r = [];
    if (this.props.children) {
      r.push(
        <FlatButton key="button" styles={[button]} onClick={this.chooseStream} primary={true}>
          {this.props.children}
        </FlatButton>
      );
    }

    r.push(
      <Avatar
        key="placeholder"
        styles={[styles.img, styles.empty]}
        onClick={this.chooseStream}>
        {
          this.state.loading ?
          <CircularProgress innerStyle={{margin: '0'}} mode="indeterminate" size={0.5} /> :
          <FontIcon
            className="material-icons"
            color={palette.accent3Color}>

            {this.state.stream !== undefined ? 'check' : 'add'}
          </FontIcon>
        }
      </Avatar>
    );

    return (
      <div styles={[styles.container].concat(this.props.styles)}>
        {r}
      </div>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginLeft: '10px',
    marginRight: '10px',
    height: '36px',
    width: '36px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
});
