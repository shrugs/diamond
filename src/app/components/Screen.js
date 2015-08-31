'use strict';

import React from 'react';

export default class Screen extends React.Component {

  constructor() {
    super();

    this.screenshot = this.screenshot.bind(this);
  }

  componentDidMount() {
    var video = this.refs.video;

    video.addEventListener('loadedmetadata', () => {
      var ratio = video.videoWidth / video.videoHeight;
      var w = video.videoWidth - 100;
      var h = parseInt(w / ratio, 10);
      this.setState({
        width: w,
        height: h,
      });
    }, false);
  }

  screenshot(ctx) {
    ctx.fillRect(0, 0, this.state.width, this.state.height);
    ctx.drawImage(this.refs.video, 0, 0, this.state.width, this.state.height);
  }

  metadata() {
    /*
      {return} metadata about the video
      i.e. {title: '', tagline: ''}
    */
  }

  render() {
    return (
      <div>
        <video ref="video">

        </video>
      </div>
    );
  }
}
