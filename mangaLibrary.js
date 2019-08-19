var manga = [];

chrome.storage.sync.get("manga", function(callback){
    var a = JSON.stringify(callback);
    console.log(a);
    $('#manga').text(a);
    var mangas = callback.manga;
    console.log(mangas);
    //console.log('hi');


    for (var m in mangas) {
    	console.log(mangas[m].img);
    	manga.push(mangas[m].img);
		//$( "#img" ).load( mangas[m].img + " div.manga-info-pic img" );
	}

    
});

$(function() {
	manga.forEach(function(m) {
		console.log(m);
		$( "#img" ).load(m);
	});
})

