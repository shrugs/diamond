'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  PRESENTING: 1,
  WAITING_FOR_CALL: 2,
}

var CALLS = {};
console.log('k');
$(document).ready(function() {

  key('ctrl+tab', function() {
    // @TODO(shrugs) - show list of friends
    console.log('k');
  });


  var App = React.createClass({

    getInitialState: function() {
      return {
        state: STATE.INITIAL,
        room: 'Hack the Planet'
      };
    },

    answerCall: function(call) {
      call.answer();
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        var v = this.refs.video;
        this.setState({
          videoSrc: window.URL.createObjectURL(remoteStream)
        });
        v.play();
      });
    },

    createRoom: function(e) {

      var peer = new Peer(this.state.room, {key: PEER_API_KEY});

      peer.on('call', call => {

        console.log('WHAT THJE FUCK');
        // add to pending calls
        CALLS[call.peer] = call;

        this.setState({
          state: STATE.PRESENTING
        });
        this.answerCall(call);

        call.on('close', function() {
          // remove from pending calls
          delete CALLS[call.peer];
        });
      });

      this.setState({
        state: STATE.WAITING_FOR_CALL
      });
    },

    inputChange: function(newValue) {
      this.setState({
        room: newValue
      });
    },

    render: function() {

      if (this.state.state === STATE.INITIAL) {

        return (
          <div>
            <img id="logo" src="images/logo.png"></img>
            <h1 className="diamond">diamond</h1>

            <form>
              <div>
                <label htmlFor="room">
                  <h2 style={{marginBottom: '6px'}}>Event</h2>
                </label>
                <input
                  type="text"
                  defaultValue="Hack the Planet"
                  onChange={this.inputChange}
                  ref="room"
                  name="room">
                </input>
              </div>
            </form>
            <button href="#" className="submit-button" type="button" onClick={this.createRoom}>
              <h2 style={{marginTop: '5px'}}>
                Step up!
              </h2>
            </button>
          </div>
        );
      } else if (this.state.state === STATE.WAITING_FOR_CALL) {
        return (
          <div>
            WAITING @TODO(shrugs) - Make this be like "Join room {this.state.room}"
          </div>
        );
      } else if (this.state.state === STATE.PRESENTING) {
        return (
          <div>
            <video ref="video" src={this.state.videoSrc}></video>
          </div>
        );
      }
    }

  });

  React.render(<App></App>, document.getElementById('main'));
});