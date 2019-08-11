//var firstHref = $("a[href^='http']").eq(0).attr("href");
//console.log(firstHref);

//Grab title of each webpage
$(function() {
  var url = $(location).attr('href');
  console.log(url);
  console.log(window.location.host); // can also use hostname
  console.log(window.location.pathname);
  chrome.storage.sync.get("structInit", function(url) { // stores web page on load
    //console.log(url.structInit);
    if (url.structInit != true) {
      console.log("debug message");
    }
  });

})
// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);
    }
  }
); 

var title = $('title')[0].innerText;
console.log(title);
var manga = $('[itemprop="title"]');
console.log($('[itemprop="url"]')[1].href);
console.log(manga[1].innerText);

var chapter;
chrome.storage.sync.get("manganelo.com", function(url) { // stores web page on load
  var hostInfo = url["manganelo.com"];
  var titleForm = hostInfo["titleFormat"];
  //console.log(hostInfo);
  //console.log(titleForm);
  //console.log(chapter);
  var OP = new RegExp(titleForm);
  var chap = new RegExp(hostInfo.chapterPath);
  chapter = title.match(chap)[0];
  console.log(title.match(OP)[0]);
  console.log("Chapter : " + title.match(chap)[0]);
});

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
      switch(message.type) {
          case "getHref":
              sendResponse({"href" : $('[itemprop="url"]')[1].href, "chapter" : chapter, "manga" : manga[1].innerText});
              break;
          default:
              console.error("Unrecognised message: ", message);
      }
  }
);