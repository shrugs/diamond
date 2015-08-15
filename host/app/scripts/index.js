'use strict';
var PEER_API_KEY = 'qfsyx0jzn7xbhuxr';

var CALLS = {};

$(document).ready(function() {

  key('command+k, ctrl+k', function() {
    // @TODO(shrugs) - show list of friends
    console.log('k');
  });

  $('#create-room').on('click', function() {

    var peer = new Peer($('#room-name').val(), {key: PEER_API_KEY});

    peer.on('call', function(call) {

      // add to pending calls
      CALLS[call.peer] = call;

      answerCall(call);

      call.on('close', function() {
        // remove from pending calls
        delete CALLS[call.peer];
      });

    });
  });

  function answerCall(call) {
    call.answer();
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      var v = $('#video').get(0);
      v.src = window.URL.createObjectURL(remoteStream);
      v.play();
    });
  }

});

