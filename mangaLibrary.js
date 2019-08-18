var manga;

chrome.storage.sync.get("manga", function(callback){
    a = JSON.stringify(callback);
    console.log(a);
    $('#manga').text(a);
});