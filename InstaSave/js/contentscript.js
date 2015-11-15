Array.prototype.find = function (id) {
	for (var i in this) {
		if (this[i].id === id) {
			return this[i];
		}
	}
};

window.onload = function () {
	chrome.extension.sendMessage({
		Type : "create",
		Link : "none"
	});
};

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
			// console.log("video: " + video);
			SendMessage("video", video);
		}catch (e){
			try {
				var image = event.srcElement.previousSibling.firstChild.src;
				if(image === undefined || image == 'none')
				{
					throw(e);
				}
				// console.log("image: " + image);
				SendMessage("image", image);
			} catch (e) {
				// console.log("none");
				SendMessage("none", "none");
			}
		}
	}
});
