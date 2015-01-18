document.addEventListener("mousedown", function(event){
    if (event.button !== 2) {
        return false;
    }
	
	if(event.button == 2){
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
			return true;
		}
		
		else if(Url.indexOf("n.mp4") > 0){
			chrome.extension.sendMessage({Type: "video", Link: Url});
			return true;
		}
		else{	    
			chrome.extension.sendMessage({Type: "none", Link: "none"});
			return true;
		}	
	}
}, false);