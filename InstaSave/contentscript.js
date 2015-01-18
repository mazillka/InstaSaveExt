document.body.addEventListener("contextmenu", function(event) {
	var imgUrl = event.srcElement.style.backgroundImage.replace('url(','').replace(')','');
	var videoUrl = event.srcElement.parentElement.getAttribute("src");

	if(videoUrl === null){
	    var Url = imgUrl;
	}
	else{
	    var Url = videoUrl;
	}
	
	if(Url.indexOf("n.jpg") > 0){ 
	    chrome.extension.sendMessage({Type: "image", Link: Url});
	}	
	else if(Url.indexOf("n.mp4") > 0){
	    chrome.extension.sendMessage({Type: "video", Link: Url});
	}
	else{	    
	    chrome.extension.sendMessage({Type: "none", Link: "none"});
	}
});