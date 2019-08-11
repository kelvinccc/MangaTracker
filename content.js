//var firstHref = $("a[href^='http']").eq(0).attr("href");
//console.log(firstHref);

//Grab title of each webpage
$(function() {
  var title = $('title')[0].innerText;
  var url = $(location).attr('href');
  console.log(title);
  console.log(url);
  console.log(window.location.host); // can also use hostname
  console.log(window.location.pathname);
  chrome.storage.sync.get("structInit", function(url) { // stores web page on load
    //console.log(url.structInit);
    if (url.structInit != true) {
      console.log("debug message");
    }
  });
  chrome.storage.sync.get("manganelo.com", function(url) { // stores web page on load
    var hostInfo = url["manganelo.com"];
    var titleForm = hostInfo["titleFormat"];
    var chapter = hostInfo.chapterPath;
    //console.log(hostInfo);
    //console.log(titleForm);
    //console.log(chapter);
    var OP = new RegExp(titleForm);
    var chap = new RegExp(chapter);
    console.log(title.match(OP)[0]);
    console.log("Chapter : " + title.match(chap)[0]);
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