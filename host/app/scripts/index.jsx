'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  PRESENTING: 1,
  WAITING_FOR_CALL: 2,
}

var CALLS = {};

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
      call.on('stream', (remoteStream) => {
        this.setState({
          state: STATE.PRESENTING
        })
        var v = $('#video').get(0);
        v.src = window.URL.createObjectURL(remoteStream);
        v.play();
      });
      call.on('close', function() {
        // remove from pending calls
        delete CALLS[call.peer];
      });
    },

    createRoom: function(e) {

      console.log(this.state.room);
      var peer = new Peer(this.state.room, {key: PEER_API_KEY});

      peer.on('call', call => {

        // add to pending calls
        CALLS[call.peer] = call;
        this.answerCall(call);
      });

      this.setState({
        state: STATE.WAITING_FOR_CALL
      });
    },

    roomChange: function(event) {
      this.setState({
        room: event.target.value
      });
    },

    render: function() {

      if (this.state.state === STATE.INITIAL) {

        return (
          <div>
            <img className="logo" src="images/logo.png"></img>
            <h1 className="diamond">diamond</h1>

            <form>
              <div>
                <label htmlFor="room">
                  <h2 style={{marginBottom: '6px'}}>Event</h2>
                </label>
                <input
                  type="text"
                  defaultValue="Hack the Planet"
                  onChange={this.roomChange}
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
          <div style={{textAlign: 'center', fontSize: '6vw'}}>
            <h3>Join Room</h3>
            <h1>{this.state.room}</h1>
          </div>
        );
      } else if (this.state.state === STATE.PRESENTING) {
        return (
          <div></div>
        );
      }
    }

  });

  React.render(<App></App>, document.getElementById('main'));
});