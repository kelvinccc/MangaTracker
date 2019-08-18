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


var title = $('title')[0].innerText;
console.log(title);
var manga = $('[itemprop="title"]');
var href = $('[itemprop="url"]')[2].href;
var chapterPageMatch = new RegExp('.*manganelo.com\/chapter\/.*');
// If this is a chapter page
if (href.match(chapterPageMatch)[0] != null) {
  //check if chapter exists
  checkChapterExist(href, manga);
}

console.log(manga[1].innerText);
})

function checkChapterExist(href, manga) {
  chrome.storage.sync.get("manga", function(obj) { // stores web page on load
    var chapterNum = new RegExp ('(?<=\/chapter_).*$');
    console.log('here is obj');
    console.log(obj);
    var m = manga[1].innerText
    console.log(JSON.stringify(obj));
    if (!obj.manga.hasOwnProperty(m)) {

      var urlPath = href.match(new RegExp('.*\/chapter_'));

      // Initialize manganelo hostinfo
      obj[m] = {
          "chapters" : [],
          "url" : urlPath
      };

      chrome.storage.sync.set({'manga' : obj}, function() {
        //allow send to popup different host pages available in build
        //console.log(manga);
        console.log('added ' + manga[1].innerText + ' to library');
      });
      console.log('3');
    } else {
      console.log('4');
      var chapterIndex = obj.manga[m].chapters.indexOf(href.match(chapterNum)); //idexOf returns -1 if not found

      //if din't previously read this chapter, record it in JSON
      if (chapterIndex == -1) {
        console.log(obj.manga[m].chapters.push(href.match(chapterNum)));
        chrome.storage.sync.set({'manga' : obj}, function() {
          //allow send to popup different host pages available in build
          //console.log(manga);
          console.log('added ' + href.match(chapterNum) + ' to library');
        });
        console.log(obj);
      }

    }
console.log('5');
    /*
  var hostInfo = url["manganelo.com"];
  var titleForm = hostInfo["titleFormat"];
  // chapter num regex = (?<=\/chapter_).*$
  //console.log(hostInfo);
  //console.log(titleForm);
  //console.log(chapter);
  var OP = new RegExp(titleForm);
  var chap = new RegExp(hostInfo.chapterPath);
  chapter = title.match(chap)[0];
  console.log(title.match(OP)[0]);
  console.log("Chapter : " + title.match(chap)[0]);
  */
});
}

/*
// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);
    }
  }
); */

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