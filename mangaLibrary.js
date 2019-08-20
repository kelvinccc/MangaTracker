var manga = [];
var mangaKeys = [];
chrome.storage.sync.get("manga", function(callback){
    var a = JSON.stringify(callback);
    console.log(a);
    var mangas = callback.manga;
    console.log(mangas);
    //console.log('hi');

    //add each img of each manga into array manga
    mangaKeys = Object.keys(mangas);
    for (var m in mangas) {
    	console.log(mangas[m]);
    	manga.push(mangas[m]);
	}

    
});

// display each manga onto the screen
$(function() {
	//$('img').load("https://manganelo.com/manga/read_one_piece_manga_online_free4 div.manga-info-pic img");

	for (i = 0; i < manga.length; i++) {
		$("#manga").append(('<div id ="pic' + i + '"></div>'));
		var len = manga[i].chapters.length;
		var arr = manga[i].chapters.sort();
		$("#manga").append('<p>' + mangaKeys[i] + " : " + manga[i].chapters[len - 1] + '</p>');
		$('#pic' + i).load(manga[i].img);

		$("#manga" + i).text(manga[i].chapters[len - 1]);
	}

	/*var $image = $("img").first();
	var $downloadingImage = $("<img>");
	$downloadingImage.load(function(){
  		$image.attr("src", $(this).attr("src"));	
	});
	$downloadingImage.attr("src", "http://an.image/to/aynchrounously/download.jpg");*/
});

function loadImage(path, target) {
    $(path).load(function() {
      $(this).appendTo(target);
    });
}