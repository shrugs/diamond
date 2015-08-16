'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  WAITING: 1,
  PRESENTING: 2
}

$(document).ready(function() {


  var App = React.createClass({

    getInitialState: function() {
      return {
        state: STATE.INITIAL,
        room: 'Hack the Planet'
      }
    },

    onSubmit: function() {
      this.connectToHost(this.state.room, {
        title: this.state.title,
        tagline: this.state.tagline
      });
    },

    connectToHost: function(host, metadata) {
      var that = this;
      var peer = new Peer({key: PEER_API_KEY});

      chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], function(id) {
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
        }, function(stream) {
          var call = peer.call(host, stream, { metadata: metadata || {} });

          call.on('error', console.log.bind(console));
          call.on('close', console.log.bind(console));
          that.setState({
            state: STATE.WAITING,
            call: call
          });

          var t = setInterval(function() {
            console.log(call.open);
            if (call.open) {
              clearInterval(t);
              that.setState({
                state: STATE.PRESENTING
              });
            }
          }, 1000);
        }, function(e) {
          that.setState({
            state: STATE.INITIAL
          });
          // ERROR
          console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
        });
      });
    },

    disconnect: function() {
      // @TODO(shrugs) - send a message to close the window
      this.state.call.close();
      this.setState({
        state: STATE.INITIAL,
        call: undefined
      });
    },

    componentDidUpdate: function(prevProps, prevState) {
      if (prevState.state !== STATE.PRESENTING && this.state.state === STATE.PRESENTING) {
        // @TODO(shrugs) - send a message to minimize window
      }
    },

    updateState: function(k) {
      var that = this;
      return function(e) {
        var s = {}
        s[k] = e.target.value;
        that.setState(s);
      };
    },

    render: function() {
      if (this.state.state === STATE.INITIAL) {
        return (
          <div>
            <img className="logo" src="images/logo.png"></img>
            <h1 className="diamond">diamond</h1>

            <form>
              <div>
                <label htmlFor="room"><h2>Event</h2></label>
                <input value={this.state.room} onChange={this.updateState('room')} type="text" name="room"></input>
              </div>
              <div>
                <label htmlFor="title"><h2>Project Title</h2></label>
                <input type="text" name="title" value={this.state.title} onChange={this.updateState('title')}></input>
              </div>
              <div>
                <label htmlFor="tagline"><h2 >Project Tagline</h2></label>
                <textarea rows="2" cols="18" type="text" name="tagline" maxLength="140" value={this.state.tagline} onChange={this.updateState('tagline')}></textarea>
              </div>
            </form>

            <button className="submit-button" onClick={this.onSubmit}><h2>Step up!</h2></button>
          </div>
        );
      } else if (this.state.state === STATE.WAITING) {
        return (
          <div style={{textAlign: 'center', fontSize: '6vw'}}>
            <h3>Connected</h3>
            <h1>You're on deck.</h1>
          </div>
        );
      } else if (this.state.state === STATE.PRESENTING) {
        return (
          <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignContent: 'flex-start',
            alignItems: 'center'
          }}>
            <button className="submit-button" onClick={this.disconnect}>Disconnect</button>
          </div>
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

  React.render(<App></App>, document.getElementById('main'));
});
