'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

$(document).ready(function() {


  var App = React.createClass({
    render: function() {
      return (
        <div>
          <img id="logo" src="images/logo.png"></img>
          <h1 className="diamond">diamond</h1>

          <form style="margin-bottom:20px;">
            <div>
              <label for="room"><h2 style="margin-bottom:6px;">Event</h2></label>

              <input value="Hack the Planet" type="text" id="room" name="room">
            </div>
            <div>
              <label for="title"><h2 style="margin-bottom:6px;">Project Title</h2></label>
              <input type="text" id="title" name="title">
            </div>
            <div>
              <label for="tagline"><h2 style="margin-bottom:6px;">Project Tagline</h2></label>
              <textarea rows="2" cols="18" type="text" id="tagline" name="tagline"></textarea>
            </div>
          </form>
          <button class="submit-button" type="button" ><h2 style="margin-top:5px;">Step up!</h2></button>
        </div>
      );
    };
  });

  var peer = new Peer({key: PEER_API_KEY});

  $('.submit-button').on('click', function() {
    connectToHost($('#room').val(), {
      title: $('#title').val(),
      tagline: $('#tagline').val()
    });
  })


  function connectToHost(host, metadata) {
    console.log(host, metadata);
    chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], function(id) {
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

        var t = setTimeout(function() {
          if (call.open) {
            clearInterval(t);
            // TODO(shrugs) - YOU'RE CONNECTED, CONGRATS, GOOD LUCK, ETC
          }
        }, 1000);
      }, function(e) {
        // ERROR
        console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
      });
    });
  }
});
