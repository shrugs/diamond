'use strict';

/*
  HostIndex.js

  Shows the host room creating form (with unique name and "create" button)
  Offers a link to / to turn the computer into a client
*/

import React from 'react';
import StyleSheet from 'react-style';

import {
  FlatButton,
  TextField,
} from 'material-ui';

import { full, button } from './styles/base';
import Banner from './Banner';
import LinkButton from './LinkButton';
import ImagePicker from './ImagePicker';


class HostIndex extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onImage = this.onImage.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);

    this.state = {
      validImg: false,
      validRoom: false,
    };
  }

  componentDidMount() {
    this.refs.room.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    this.context.router.transitionTo('host/present', {defaultScreen: this.state.img, room: this.state.room});
  }

  onImage(img) {
    this.setState({
      validImg: img !== undefined,
      img: img,
    });
  }

  onRoomChange() {
    // validate room name
    var room = this.refs.room.getValue();
    this.setState({
      validRoom: room.length > 1,
      room: this.refs.room.getValue(),
    });
  }

  render() {
    return(
      <div styles={[full]}>
        <Banner styles={[styles.banner]} />
        <div styles={[styles.form]}>
          <TextField
            ref="room"
            onChange={this.onRoomChange}
            hintText="my-event"
            floatingLabelText="Room" />
          <ImagePicker styles={[styles.picker]} onImage={this.onImage}>Choose a Default Image</ImagePicker>

          <FlatButton
            styles={[button, styles.submit]}
            onClick={this.onSubmit}
            secondary={true}
            disabled={!(this.state.validImg && this.state.validRoom)}>Begin Hosting</FlatButton>
        </div>
        <div styles={[styles.footer]}>
          <LinkButton to="/" primary={true}>Become a Client</LinkButton>
        </div>
      </div>
    );
  }
}

HostIndex.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
  banner: {
    height: '30vh',
  },
  form: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    marginTop: '10px',
  },
  submit: {
    marginTop: '30px',
  },
  footer: {
    height: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default HostIndex;
