'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  PRESENTING: 1,
  WAITING_FOR_CALL: 2
};

var CALLS = {};
console.log('k');
$(document).ready(function () {

  key('ctrl+tab', function () {
    // @TODO(shrugs) - show list of friends
    console.log('k');
  });

  var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
      return {
        state: STATE.INITIAL,
        room: 'Hack the Planet'
      };
    },

    answerCall: function answerCall(call) {
      call.answer();
      call.on('stream', function (remoteStream) {
        // Show stream in some video/canvas element.
        var v = this.refs.video;
        this.setState({
          videoSrc: window.URL.createObjectURL(remoteStream)
        });
        v.play();
      });
    },

    createRoom: function createRoom(e) {
      var _this = this;

      var peer = new Peer(this.state.room, { key: PEER_API_KEY });

      peer.on('call', function (call) {

        console.log('WHAT THJE FUCK');
        // add to pending calls
        CALLS[call.peer] = call;

        _this.setState({
          state: STATE.PRESENTING
        });
        _this.answerCall(call);

        call.on('close', function () {
          // remove from pending calls
          delete CALLS[call.peer];
        });
      });

      this.setState({
        state: STATE.WAITING_FOR_CALL
      });
    },

    inputChange: function inputChange(newValue) {
      this.setState({
        room: newValue
      });
    },

    render: function render() {

      if (this.state.state === STATE.INITIAL) {

        return React.createElement(
          'div',
          null,
          React.createElement('img', { id: 'logo', src: 'images/logo.png' }),
          React.createElement(
            'h1',
            { className: 'diamond' },
            'diamond'
          ),
          React.createElement(
            'form',
            null,
            React.createElement(
              'div',
              null,
              React.createElement(
                'label',
                { htmlFor: 'room' },
                React.createElement(
                  'h2',
                  { style: { marginBottom: '6px' } },
                  'Event'
                )
              ),
              React.createElement('input', {
                type: 'text',
                defaultValue: 'Hack the Planet',
                onChange: this.inputChange,
                ref: 'room',
                name: 'room' })
            )
          ),
          React.createElement(
            'button',
            { href: '#', className: 'submit-button', type: 'button', onClick: this.createRoom },
            React.createElement(
              'h2',
              { style: { marginTop: '5px' } },
              'Step up!'
            )
          )
        );
      } else if (this.state.state === STATE.WAITING_FOR_CALL) {
        return React.createElement(
          'div',
          null,
          'WAITING @TODO(shrugs) - Make this be like "Join room ',
          this.state.room,
          '"'
        );
      } else if (this.state.state === STATE.PRESENTING) {
        return React.createElement(
          'div',
          null,
          React.createElement('video', { ref: 'video', src: this.state.videoSrc })
        );
      }
    }

  });

  React.render(React.createElement(App, null), document.getElementById('main'));
});
//# sourceMappingURL=index.js.map
