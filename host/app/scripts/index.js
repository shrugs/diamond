'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  PRESENTING: 1,
  WAITING_FOR_CALL: 2
};

var CALLS = [];

$(document).ready(function () {

  var TabSwitcher = React.createClass({
    displayName: 'TabSwitcher',

    propTypes: {
      tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        src: React.PropTypes.string,
        tagline: React.PropTypes.string
      })),
      tabIndex: React.PropTypes.number
    },
    render: function render() {
      var _this = this;

      var tabs = this.props.tabs.map(function (tab, i) {
        // @TODO(shrugs) - autoPlay on this video or no?
        return React.createElement(
          'div',
          { style: {
              margin: '20px',
              height: '30vh',
              maxWidth: '34%',
              textAlign: 'center',
              flexGrow: '1',
              position: 'relative',
              border: '1px solid red',
              backgroundColor: _this.props.tabIndex === i ? '#E8E8E8' : 'transparent'
            }, key: i },
          React.createElement(
            'h3',
            { style: {
                marginTop: '5px',
                marginBottom: '2px'
              } },
            tab.title
          ),
          React.createElement('video', { src: tab.src, style: {
              width: '75%'
            } }),
          React.createElement(
            'p',
            { style: {
                marginTop: '5px',
                marginBottom: '0'
              } },
            tab.tagline
          )
        );
      });
      return React.createElement(
        'div',
        { style: {
            position: 'absolute',
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
          'div',
          { style: {
              width: '100vw',
              height: '40vh',
              backgroundColor: 'rgba(156, 156, 156, 0.4)',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignContent: 'flex-start',
              alignItems: 'center'
            } },
          tabs
        )
      );
    }
  });

  var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
      var _this2 = this;

      key('ctrl+tab', function () {
        // @TODO(shrugs) - show list of friends
        if (_this2.state.tabTimer !== undefined) {
          // increment the thing and reset the timer
          clearTimeout(_this2.state.tabTimer);
          _this2.startTabTimer();
          _this2.setState({
            tabIndex: (_this2.state.tabIndex + 1) % CALLS.length
          });
        } else {
          _this2.startTabTimer();
          _this2.setState({
            tabIndex: 0
          });
        }
      });

      return {
        state: STATE.INITIAL,
        tabTimer: undefined,
        activeStream: undefined,
        room: 'Hack the Planet'
      };
    },

    /*
      TAB TIMER
    */
    startTabTimer: function startTabTimer() {
      this.setState({
        tabTimer: setTimeout(this.onTabTimerEnd, 600)
      });
    },

    onTabTimerEnd: function onTabTimerEnd() {
      clearTimeout(this.state.tabTimer);
      this.setState({
        tabTimer: undefined,
        activeStream: this.state.tabIndex
      });
    },

    /*
      ROOM HANDLING
    */
    createRoom: function createRoom(e) {
      var _this3 = this;

      this.setState({
        state: STATE.WAITING_FOR_CALL
      });

      var peer = new Peer(this.state.room, { key: PEER_API_KEY });

      peer.on('call', function (call) {
        // immediately answer call
        call.answer();
        call.on('stream', function (remoteStream) {
          // store the stream url in CALLS, along with metadata
          CALLS.push({
            url: window.URL.createObjectURL(remoteStream),
            metadata: call.metadata,
            call: call
          });
          _this3.setState({
            state: STATE.PRESENTING,
            activeStream: CALLS.length === 1 ? 0 : _this3.state.activeStream
          });
        }, function (e) {
          debugger;
        });
        call.on('close', function () {
          console.log('CONNECTION CLOSED');
          // remove from CALLS
          CALLS = CALLS.filter(function (c) {
            return c.call.peer !== call.peer;
          });

          if (!CALLS.length) {
            this.setState({
              state: STATE.WAITING_FOR_CALL
            });
          }
        });
      });
    },

    onRoomChange: function onRoomChange(e) {
      this.setState({
        room: e.target.value
      });
    },

    render: function render() {
      var r = [];

      if (this.state.state === STATE.INITIAL) {

        r.push(React.createElement(
          'div',
          { key: 'initial' },
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
                  { style: { marginBottom: '6px' } },
                  'Event'
                )
              ),
              React.createElement('input', { onChange: this.onRoomChange, value: this.state.room, defaultValue: 'Hack the Planet', type: 'text', name: 'room' })
            )
          ),
          React.createElement(
            'button',
            { className: 'submit-button', onClick: this.createRoom },
            React.createElement(
              'h2',
              { style: { marginTop: '5px' } },
              'Step up!'
            )
          )
        ));
      } else if (this.state.state === STATE.WAITING_FOR_CALL) {
        r.push(React.createElement(
          'div',
          { key: 'waiting', style: { textAlign: 'center', fontSize: '6vw' } },
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
        ));
      } else if (this.state.state === STATE.PRESENTING) {

        if (this.state.tabTimer !== undefined) {
          var tabs = CALLS.map(function (c) {
            return {
              title: c.metadata.title,
              src: c.url,
              tagline: c.metadata.tagline
            };
          });
          r.push(React.createElement(TabSwitcher, { key: 'tabSwitcher', tabIndex: this.state.tabIndex, tabs: tabs }));
        }

        var src = CALLS[this.state.activeStream].url;
        r.push(React.createElement('video', { id: 'video', key: 'presenting', src: src, autoPlay: true }));
      }

      return React.createElement(
        'div',
        null,
        r
      );
    }

  });

  React.render(React.createElement(App, null), document.getElementById('main'));
});
//# sourceMappingURL=index.js.map
