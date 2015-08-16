'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  WAITING: 1,
  PRESENTING: 2
};

$(document).ready(function () {

  var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
      return {
        state: STATE.INITIAL,
        room: 'Hack the Planet'
      };
    },

    onSubmit: function onSubmit() {
      this.connectToHost(this.state.room, {
        title: this.state.title,
        tagline: this.state.tagline
      });
    },

    connectToHost: function connectToHost(host, metadata) {
      var that = this;
      var peer = new Peer({ key: PEER_API_KEY });

      chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], function (id) {
        if (!id) {
          console.log('REJECTED');
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
              maxHeight: 720
            }
          }
        }, function (stream) {
          var call = peer.call(host, stream, { metadata: metadata || {} });

          call.on('error', console.log.bind(console));
          call.on('close', console.log.bind(console));
          that.setState({
            state: STATE.WAITING,
            call: call
          });

          var t = setInterval(function () {
            console.log(call.open);
            if (call.open) {
              clearInterval(t);
              that.setState({
                state: STATE.PRESENTING
              });
            }
          }, 1000);
        }, function (e) {
          that.setState({
            state: STATE.INITIAL
          });
          // ERROR
          console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
        });
      });
    },

    disconnect: function disconnect() {
      // @TODO(shrugs) - send a message to close the window
      this.state.call.close();
      this.setState({
        state: STATE.INITIAL,
        call: undefined
      });
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
      if (prevState.state !== STATE.PRESENTING && this.state.state === STATE.PRESENTING) {
        // @TODO(shrugs) - send a message to minimize window
      }
    },

    updateState: function updateState(k) {
      var that = this;
      return function (e) {
        var s = {};
        s[k] = e.target.value;
        that.setState(s);
      };
    },

    render: function render() {
      if (this.state.state === STATE.INITIAL) {
        var shouldShowSubmitButton = this.state.title !== undefined && this.state.title.length && (this.state.tagline !== undefined && this.state.tagline.length);
        debugger;
        return React.createElement(
          'div',
          null,
          React.createElement('img', { className: 'logo', src: 'images/logo.png' }),
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
                  null,
                  'Event'
                )
              ),
              React.createElement('input', { value: this.state.room, onChange: this.updateState('room'), type: 'text', name: 'room' })
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'label',
                { htmlFor: 'title' },
                React.createElement(
                  'h2',
                  null,
                  'Project Title'
                )
              ),
              React.createElement('input', { type: 'text', name: 'title', value: this.state.title, onChange: this.updateState('title') })
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'label',
                { htmlFor: 'tagline' },
                React.createElement(
                  'h2',
                  null,
                  'Project Tagline'
                )
              ),
              React.createElement('textarea', { rows: '2', cols: '18', type: 'text', name: 'tagline', maxLength: '140', value: this.state.tagline, onChange: this.updateState('tagline') })
            )
          ),
          React.createElement(
            'button',
            { className: 'submit-button', onClick: this.onSubmit, disabled: !shouldShowSubmitButton },
            React.createElement(
              'h2',
              null,
              'Step up!'
            )
          )
        );
      } else if (this.state.state === STATE.WAITING) {
        return React.createElement(
          'div',
          { style: { textAlign: 'center', fontSize: '6vw' } },
          React.createElement(
            'h3',
            null,
            'Connected'
          ),
          React.createElement(
            'h1',
            null,
            'You\'re on deck.'
          )
        );
      } else if (this.state.state === STATE.PRESENTING) {
        return React.createElement(
          'div',
          { style: {
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignContent: 'flex-start',
              alignItems: 'center'
            } },
          React.createElement(
            'button',
            { className: 'submit-button', onClick: this.disconnect },
            'Disconnect'
          )
        );
      }
    }
  });

  // $('.submit-button').on('click', function() {
  //   connectToHost($('#room').val(), {
  //     title: $('#title').val(),
  //     tagline: $('#tagline').val()
  //   });
  // })

  React.render(React.createElement(App, null), document.getElementById('main'));
});
//# sourceMappingURL=index.js.map
