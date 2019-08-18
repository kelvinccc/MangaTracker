'use strict';

let address = document.getElementById('url');
let button = document.getElementById('show');
let nipple = document.getElementById('nipple');
let save = document.getElementById('save');
let clear = document.getElementById('clear');

window.onload = function() {
}

// saves URL to storage and adds to display lits
save.onclick = function() {
    $( "#pic" ).load( "https://manganelo.com/manga/kxqh9261558062112 div.manga-info-pic img" );
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        chrome.storage.sync.set({[url]: url}, function() { // stores web page on load
            console.log("stored url: " + url);
            makeLink(url);
        });
    });
}

$("#library").click(function() {
    console.log('hello');
    chrome.tabs.create({ url: chrome.runtime.getURL("mangaLibrary.html") });
});


// takes key and makes link and adds to list
function makeLink(key) {
    let node = document.createElement("li");
    let link = document.createElement("a");
    link.href = key;
    link.innerText = key;
    node.appendChild(link);
    document.getElementById("links").appendChild(node);
}
/*
// clears all stored info
clear.onclick = function() { // clears all stored information
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
        var myNode = document.getElementById("links");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    });
}*/

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getHref"}, function(href) {
         console.log(href.chapter);
        $( "#pic" ).load( href.href + " div.manga-info-pic img" );
        $("#title").text(href.manga);
        $("#chapter").text(href.chapter);
    });
});