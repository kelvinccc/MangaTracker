'use strict';

let address = document.getElementById('url');
let button = document.getElementById('show');
let nipple = document.getElementById('nipple');
let save = document.getElementById('save');
let clear = document.getElementById('clear');

window.onload = function() {

    loadLinks();
}

// shows nipple
button.onclick = function() {
    nipple.style.display = "inline";
}

// saves URL to storage and adds to display lits
save.onclick = function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        chrome.storage.sync.set({[url]: url}, function() { // stores web page on load
            console.log("stored url: " + url);
            makeLink(url);
        });
    });
}

// loads all keys and makes them links
function loadLinks() {
    chrome.storage.sync.get(null, function(items) {
        let keys = Object.keys(items);
        keys.forEach(function(key) {
            makeLink(key);
        });
    });
}

// takes key and makes link and adds to list
function makeLink(key) {
    let node = document.createElement("li");
    let link = document.createElement("a");
    link.href = key;
    link.innerText = key;
    node.appendChild(link);
    document.getElementById("links").appendChild(node);
}

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
}