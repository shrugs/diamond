'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var STATE = {
  INITIAL: 0,
  PRESENTING: 1,
  WAITING_FOR_CALL: 2,
}

$(document).ready(function() {

  var TabSwitcher = React.createClass({
    propTypes: {
      tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        src: React.PropTypes.string,
        tagline: React.PropTypes.string
      })),
      tabIndex: React.PropTypes.number
    },
    render: function() {
      var tabs = this.props.tabs.map((tab, i) => {
        // @TODO(shrugs) - autoPlay on this video or no?
        return (
          <div style={{
            margin: '20px',
            height: '30vh',
            maxWidth: '34%',
            textAlign: 'center',
            flexGrow: '1',
            position: 'relative'
          }} key={i}>
            <video src={tab.src} style={{
              width: '75%',
              borderRadius: '5px',
              border: this.props.tabIndex === i ? '4px solid white' : 'none'
            }}></video>
            <h1 style={{
              marginTop: this.props.tabIndex === i ? '1px' : '4px',
              marginBottom: '2px'
            }}>{tab.title}</h1>
            <p style={{
              marginTop: '5px',
              marginBottom: '0'
            }}>{tab.tagline}</p>
          </div>
        );
      });
      return (
        <div style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignContent: 'flex-start',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100vw',
            height: '40vh',
            backgroundColor: 'rgb(41, 174, 255)',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignContent: 'flex-start',
            borderRadius: '5px',
            alignItems: 'center'
          }}>
            {tabs}
          </div>
        </div>
      );
    }
  });

  var App = React.createClass({

    getInitialState: function() {

      key('ctrl+tab', () => {
        // @TODO(shrugs) - show list of friends
        if (this.state.tabTimer !== undefined) {
          // increment the thing and reset the timer
          clearTimeout(this.state.tabTimer);
          this.startTabTimer();
          this.setState({
            tabIndex: (this.state.tabIndex + 1) % this.state.CALLS.length
          });
        } else {
          this.startTabTimer();
          this.setState({
            tabIndex: this.state.CALLS.length > 1 ? (this.state.tabIndex + 1) % this.state.CALLS.length : 0
          });
        }
      });

      return {
        state: STATE.INITIAL,
        tabTimer: undefined,
        tabIndex: 0,
        activeStream: undefined,
        room: 'Hack the Planet',
        CALLS: [
          // {
          //   url: 'test',
          //   metadata: {title: 'My Title', tagline: 'My tagline'},
          //   call: {}
          // },
          // {
          //   url: 'test',
          //   metadata: {title: 'Project 2', tagline: 'My tagline'},
          //   call: {}
          // }
        ]
      };
    },

    /*
      TAB TIMER
    */
    startTabTimer: function() {
      this.setState({
        tabTimer: setTimeout(this.onTabTimerEnd, 600)
      });
    },

    onTabTimerEnd: function() {
      clearTimeout(this.state.tabTimer);
      this.setState({
        tabTimer: undefined,
        activeStream: this.state.tabIndex
      });
    },


    /*
      ROOM HANDLING
    */
    createRoom: function(e) {
      this.setState({
        state: STATE.WAITING_FOR_CALL
      });

      var peer = new Peer(this.state.room, {key: PEER_API_KEY});

      peer.on('call', (call) => {
        // immediately answer call
        call.answer();
        call.on('stream', (remoteStream) => {
          // store the stream url in CALLS, along with metadata
          this.setState({
            state: STATE.PRESENTING,
            CALLS: this.state.CALLS.concat({
              url: window.URL.createObjectURL(remoteStream),
              metadata: call.metadata,
              call: call
            }),
            activeStream: !this.state.CALLS.length ? 0 : this.state.activeStream
          });

        }, function(e) {
          debugger;
        });
        call.on('close', () => {
          console.log('CONNECTION CLOSED');
          // remove from CALLS
          this.setState({
            CALLS: this.state.CALLS.filter((c) => {
              return c.call.peer !== call.peer;
            })
          });

          if (!this.state.CALLS.length) {
            this.setState({
              state: STATE.WAITING_FOR_CALL
            });
          }
        });
      });
    },

    onRoomChange: function(e) {
      this.setState({
        room: e.target.value
      });
    },

    render: function() {
      var r = [];

      if (this.state.state === STATE.INITIAL) {

        r.push (
          <div key="initial">
            <img className="logo" src="images/logo.png"></img>
            <h1 className="diamond">diamond</h1>

            <form>
              <div>
                <label htmlFor="room">
                  <h2 style={{marginBottom: '6px'}}>Event</h2>
                </label>
                <input onChange={this.onRoomChange} value={this.state.room} defaultValue="Hack the Planet" type="text" name="room"></input>
              </div>
            </form>
            <button className="submit-button" onClick={this.createRoom}>
              <h2 style={{marginTop: '5px'}}>Step up!</h2>
            </button>
          </div>
        );
      } else if (this.state.state === STATE.WAITING_FOR_CALL) {
        r.push (
          <div key="waiting" style={{textAlign: 'center', fontSize: '6vw'}}>
            <h3>Join Room</h3>
            <h1>{this.state.room}</h1>
          </div>
        );
      } else if (this.state.state === STATE.PRESENTING) {

        if (this.state.tabTimer !== undefined) {
          var tabs = this.state.CALLS.map((c) => {
            return {
              title: c.metadata.title,
              src: c.url,
              tagline: c.metadata.tagline
            };
          })
          r.push(<TabSwitcher key="tabSwitcher" tabIndex={this.state.tabIndex} tabs={tabs}></TabSwitcher>);
        }

        var src = this.state.CALLS[this.state.activeStream].url;
        r.push (
          <div key="presenting" style={{
            backgroundColor: '#000',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignContent: 'flex-start',
            alignItems: 'center'
          }}>
            <video className="video" src={src} autoPlay></video>
          </div>
        );
      }

      return (
        <div>{r}</div>
      );
    }

  });

  React.render(<App></App>, document.getElementById('main'));
});
