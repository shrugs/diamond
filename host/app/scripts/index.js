'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

$(document).ready(function() {

  $('#create-room').on('click', function() {

    var peer = new Peer($('#room-name').val(), {key: PEER_API_KEY});

    peer.on('call', function(call) {
      call.answer();
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        var v = $('#video').get(0);
        v.src = window.URL.createObjectURL(remoteStream);
        v.play();
      });
    });
  });

});

