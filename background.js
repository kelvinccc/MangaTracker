// background.js

/*
url structure is for if we potentially want to support more domains in the future. Right now we only support manganelo
We currently don't even use this structure actually...
URL STRUCTURE:
{
   "hosts": [
      "manganelo.com" : {
         "url":"https://manganelo.com/",           --the url
         "titleFormat": ".+?(?= Chapter \\d+ )",
         "chapterPath": "(?<= Chapter ).\\d+",
      }
   ]
}
*/

// Set up initial JSON state
chrome.runtime.onInstalled.addListener(function() {
  //chrome.storage.sync.clear(function() {}); for testing
  chrome.storage.sync.get("structInit", function(bool) { // stores web page on load
    // uncomment below if u want to reset json to empty for testing purposes
    //bool = false;
    if (bool != true) {
      chrome.storage.sync.clear(fn => {});
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
        //POSSIBLE ADDITION: allow send to popup different host pages available in build
      });

      //Set up empty manga array
      chrome.storage.sync.set({'manga' : {}}, function() {});
    }
  });
});

// Called when the user clicks on the browser action. (the icon)
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
}); 