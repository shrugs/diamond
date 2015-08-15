'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  var width = 500;
  var height = 300;

  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: {
      width: width,
      height: height,
      left: Math.round((screen.availWidth - width) / 2),
      top: Math.round((screen.availHeight - height)/2)
    }
  });

});

chrome.app.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'TEST THING', // title
    id: 'test', // call.peer
    documentUrlPatterns: ["*"],
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener(function(itemData) {
  console.log(itemData);
  // if (itemData.menuItemId == "launcher0")
  //   chrome.app.window.create('a.html', {id: 'a', outerBounds:{top: 0, left: 0, width: 300, height: 300}});
});