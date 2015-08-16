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
      var _this = this;

      call.answer();
      call.on('stream', function (remoteStream) {
        _this.setState({
          state: STATE.PRESENTING
        });
        var v = $('#video').get(0);
        v.src = window.URL.createObjectURL(remoteStream);
        v.play();
      });
      call.on('close', function () {
        // remove from pending calls
        delete CALLS[call.peer];
      });
    },

    createRoom: function createRoom(e) {
      var _this2 = this;

      console.log(this.state.room);
      var peer = new Peer(this.state.room, { key: PEER_API_KEY });

      peer.on('call', function (call) {

        // add to pending calls
        CALLS[call.peer] = call;
        _this2.answerCall(call);
      });

      this.setState({
        state: STATE.WAITING_FOR_CALL
      });
    },

    roomChange: function roomChange(event) {
      this.setState({
        room: event.target.value
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
                onChange: this.roomChange,
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
          { style: { textAlign: 'center', fontSize: '6vw' } },
          React.createElement(
            'h3',
            null,
            'Join Room'
          ),
          React.createElement(
            'h1',
            null,
            this.state.room
          )
        );
      } else if (this.state.state === STATE.PRESENTING) {
        return React.createElement('div', null);
      }
    }

  });

  React.render(React.createElement(App, null), document.getElementById('main'));
});
//# sourceMappingURL=index.js.map
