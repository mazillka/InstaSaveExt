document.body.addEventListener("contextmenu", function(event) {
	var imgUrl = event.srcElement.style.backgroundImage.replace('url(','').replace(')','');
	// var videoUrl = event.srcElement.previousElementSibling.firstChild.src;
	var videoUrl = event.srcElement.parentElement.getAttribute("src");
	
	if(videoUrl == null){
		var Url = imgUrl;
	}
	else{
		var Url = videoUrl;
	}
	
	chrome.extension.sendMessage({Url: Url}, function(response) {});
});
