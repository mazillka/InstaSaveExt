function SendMessage(type, link) {
	chrome.extension.sendMessage({
		Type : type,
		Link : link
	});
}

document.addEventListener("mousedown", function (event) {
	if (event.button === 2) {
		try{
			var video = event.srcElement.previousSibling.firstChild.firstChild.src;
			console.log("video: " + video);
			SendMessage("video", video);
		}catch (e){
			try {
				var image = event.srcElement.previousSibling.previousSibling.firstChild.src;
				if(image === undefined || image == 'none')
				{
					console.log("image: " + event.srcElement.previousSibling.firstChild.src);
					throw(e);
				}
				console.log("image: " + image);
				SendMessage("image", image);
			} catch (e) {
				console.log("none");
				SendMessage("none", "none");
			}
		}
	}
});
