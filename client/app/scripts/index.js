'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

$(document).ready(function() {

  var peer = new Peer({key: PEER_API_KEY});

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
      // SUCCESS
      var call = peer.call('htp', stream);
    }, function(e) {
      // ERROR
      console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
    });
  });
});

