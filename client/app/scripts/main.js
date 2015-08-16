'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {

  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: {
      width: 300,
      height: 600,
      top: Math.floor(screen.availHeight / 2),
      left: Math.floor(screen.availWidth / 2)
    }
  });

});
