'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

$(document).ready(function() {

  var peer = new Peer({key: PEER_API_KEY});

  connectToHost('htp', {
    team: 'Team Kickass',
    title: 'My Super Duper Cool Hack'
  });

  /*
    FNs
  */


  function connectToHost(host, metadata) {
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

