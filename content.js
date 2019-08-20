//Grab title of each webpage
$(document).ready(function() {
  //console.log('host : ' + window.location.host); // can also use hostname
  //console.log('pathname : ' + window.location.pathname);
  console.log("running");
  structInit();

  // Grab different parameters from DOM
  var title = $('title')[0].innerText;
  console.log('title : ' + title);
  var manga = $('[itemprop="title"]')[1].innerText;
  var href = $(location).attr('href');
  var chapterPageMatch = new RegExp('.*manganelo.com\/chapter\/.*');
  // If this is a chapter page
  if (href.match(chapterPageMatch)[0] != null) {
    // format guarantee : manganelo.com/chapter/...
    //check if chapter exists
    checkChapterExist(href, manga);
  }
})

function structInit() {
  chrome.storage.sync.get("structInit", function(url) { // stores web page on load
    //console.log(url.structInit);
    if (url.structInit != true) {
      console.log("Struct initialization error, check structInit()");
    }
  });
}

var chapter;
function checkChapterExist(href, manga) {
  var img = $('[itemprop="url"]')[1].href + " div.manga-info-pic img";
  chrome.storage.sync.get("manga", function(obj) { // stores web page on load
    chapter = parseInt(href.match(new RegExp ('(?<=\/chapter_).*$'))[0]); // Get chapter number
    console.log('here is obj');
    console.log(obj);
    console.log(JSON.stringify(obj));
    if (!obj.manga.hasOwnProperty(manga)) {

      var urlPath = href.match(new RegExp('.*\/chapter_'))[0];

      // Initialize manganelo hostinfo
      obj.manga[manga] = {
          "chapters" : [chapter],
          "url" : urlPath,
          "img" : img
      };

      console.log(obj);
      
      var objMan = obj.manga;
      console.log(objMan);

      chrome.storage.sync.set({'manga' : objMan}, function() {
        //allow send to popup different host pages available in build
        //console.log(manga);
        console.log('added ' + manga + ' to library');
      });
    } else {
      var chapterIndex = obj.manga[manga].chapters.indexOf(chapter); //idexOf returns -1 if not found

      //if din't previously read this chapter, record it in JSON
      if (chapterIndex == -1) {
        console.log(obj.manga[manga].chapters);
        console.log(obj.manga[manga].chapters.push(chapter));
        chrome.storage.sync.set({'manga' : obj.manga}, function() {
          //allow send to popup different host pages available in build
          //console.log(manga);
          console.log('added ' + chapter + ' to library');
        });
        console.log(obj);
      }

    }
});
}


//var chapter;
/*chrome.storage.sync.get("manganelo.com", function(url) { // stores web page on load
  var hostInfo = url["manganelo.com"];
  var titleForm = hostInfo["titleFormat"];
  //chapter = title.match(new RegExp(hostInfo.chapterPath))[0];
  //console.log(title.match(new RegExp(titleForm))[0]);
  console.log("Chapter : " + title.match(chap)[0]);
});*/


chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
      switch(message.type) {
          //when popup is clicked, send information to popup
          case "getHref":
              sendResponse({"href" : $('[itemprop="url"]')[1].href, "chapter" : chapter, "manga" : $('[itemprop="title"]')[1].innerText});
              break;
          default:
              console.error("Unrecognised message: ", message);
      }
  }
);