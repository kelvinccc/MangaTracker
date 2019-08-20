var manga = [];
var mangaKeys = [];
chrome.storage.sync.get("manga", function(callback){
    var a = JSON.stringify(callback);
    console.log(a);
    var mangas = callback.manga;
    console.log(mangas);
    //console.log('hi');

    //add each img of each manga into array manga
    var i = 0;
    mangaKeys = Object.keys(mangas);
    for (var m in mangas) {
    	console.log(m);
    	manga.push(mangas[m]);
		(function(index, name) {
			var len = manga[i].chapters.length;
			var arr = manga[i].chapters.sort();
			$("#manga").append(('<figure id ="pic' + i + '" class = "col-sm figure"></figure>'));
			$('#pic' + i).load(manga[i].img, function() {
			//$(this).clone().appendTo("#manga").remove();
				$('<figcaption class="figure-caption">' + name + " : " + arr[len - 1] + '</figcaption>').appendTo(this);
			});
		})(i, m);
		i++;
	}


	/*for (i = 0; i < manga.length; i++) {
		(function(index) {
			var len = manga[i].chapters.length;
			var arr = manga[i].chapters.sort();
			$("#manga").append(('<figure id ="pic' + i + '" class = "col-sm figure"></figure>'));
			$('#pic' + i).load(manga[i].img, function() {
			//$(this).clone().appendTo("#manga").remove();
				$('<figcaption class="figure-caption">' + mangaKeys[i] + " : " + arr[len - 1] + '</figcaption>').appendTo(this);
			});
		})(i);
	}*/
});

// display each manga onto the screen
function runImages() {
	//$('img').load("https://manganelo.com/manga/read_one_piece_manga_online_free4 div.manga-info-pic img");




	/*var $image = $("img").first();
	var $downloadingImage = $("<img>");
	$downloadingImage.load(function(){
  		$image.attr("src", $(this).attr("src"));	
	});
	$downloadingImage.attr("src", "http://an.image/to/aynchrounously/download.jpg");*/
}