// background.js


// Set up initial JSON state
chrome.runtime.onInstalled.addListener(function() {
  //chrome.storage.sync.clear(function() {}); for testing
  chrome.storage.sync.get("structInit", function(bool) { // stores web page on load
    if (bool != true) {
      // Set flag to indicate that initial structure is set.
      chrome.storage.sync.set({'structInit' : true}, function() {
        console.log("First initialization complete")
      });

      // Initialize manganelo hostinfo
      var urlJson = {
        "url": "https://manganelo.com/",
        "titleFormat": ".+?(?= Chapter \\d+ )",
        "chapterPath": "(?<= Chapter )\\d+"
      };
      chrome.storage.sync.set({'manganelo.com' : urlJson}, function() {
        //allow send to popup different host pages available in build
      });

      //Set up empty manga array
      chrome.storage.sync.set({'manga' : {}}, function() {});
    }
  });
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
}); 