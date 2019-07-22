'use strict';

let address = document.getElementById('url');
let button = document.getElementById('show');
let nipple = document.getElementById('nipple');
let save = document.getElementById('save');
let get = document.getElementById('get');


button.onclick = function() {
    nipple.style.display = "inline";
}

save.onclick = function() {
    //var url = $(location).attr('href');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        chrome.storage.sync.set({url: url}, function() { // stores web page on load
            console.log("stored url: " + url);
        });
    });
}

get.onclick = function() {
    chrome.storage.sync.get('url', function(data) {
        address.innerText = data.url;
    });
}