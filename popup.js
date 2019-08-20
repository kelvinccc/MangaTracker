'use strict';

/*// saves URL to storage and adds to display lits
save.onclick = function() {
    $( "#pic" ).load( "https://manganelo.com/manga/kxqh9261558062112 div.manga-info-pic img" );
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        chrome.storage.sync.set({[url]: url}, function() { // stores web page on load
            console.log("stored url: " + url);
            makeLink(url);
        });
    });
}*/

$("#library").click(function() {
    chrome.tabs.create({ url: chrome.runtime.getURL("mangaLibrary.html") });
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getHref"}, function(href) {
         console.log(href.href);
         console.log('manga : ' + href.manga);
        $( "#pic" ).load( href.href + " div.manga-info-pic img" );
        $("#pic").click(function() {
            chrome.tabs.create({ url: href.href });
        });
        $("#title").text(href.manga);
        $("#chapter").text(href.chapter);
    });
});