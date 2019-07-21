<<<<<<< HEAD
//var firstHref = $("a[href^='http']").eq(0).attr("href");
//console.log(firstHref);
//alert(document.title);
// content.js
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);
      console.log(sender);
    }
  }
);*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
=======
var firstHref = $("a[href^='http']").eq(0).attr("href");
console.log(firstHref);
>>>>>>> parent of 754bfeb... Added background script
