'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import { FlatButton } from 'material-ui';
import { button } from './styles/base';

export default class ImagePicker extends React.Component {

  propTypes: {
    onImage: React.PropTypes.func,
  }

  constructor() {
    super();

    this.getImage = this.getImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.state = {imageURL: undefined};
  }

  getImage() {
    return this.state.imageURL;
  }

  chooseImage() {
    chrome.fileSystem.chooseEntry({
      accepts:[
        {
          extensions: ['png', 'jpg', 'jpeg'],
        },
      ],
    }, (img) => {
      if (img === undefined) {
        if (this.props.onImage) {
          this.props.onImage(img);
        }
        return;
      }
      img.file((file) => {
        var url = window.URL.createObjectURL(file);
        this.setState({
          imageURL: url,
        });
        if (this.props.onImage) {
          this.props.onImage(url);
        }
      });
    });
  }

  render() {
    return (
      <div styles={[styles.container]}>
        <FlatButton styles={[button, styles.imageButton]} onClick={this.chooseImage} primary={true}>
          {this.props.children}
        </FlatButton>
        {/* @TODO(shrugs) - add an "?" icon or whatever inside the empty image */}
        {this.state.imageURL ? <img src={this.state.imageURL} styles={[styles.img]}></img> : <div styles={[styles.img, styles.empty]}></div>}
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
  imageButton: {
    marginTop: '10px',
  },
  img: {
    marginLeft: '20px',
    height: '36px',
    width: '36px',
    borderRadius: '5px',
  },
  empty: {
    backgroundColor: '#EEEEEE',
  },
});
