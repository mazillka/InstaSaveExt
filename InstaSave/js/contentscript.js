function SendMessage(type, link) {
	chrome.extension.sendMessage({
		Type : type,
		Link : link
	});
}

function GetUrl(element) {
	var Url;
	try {
		var imgUrl = element.parentElement.getAttribute("src");
		var videoUrl = element.previousSibling.firstChild.getAttribute("src");
	} catch (e) {}

	// console.log("Image: " + imgUrl);
	// console.log("Video: " + videoUrl);

	if (videoUrl === undefined) {
		return imgUrl;
	}

	if (imgUrl === null) {
		return videoUrl;
	}

	return null;
}

document.addEventListener("mousedown", function (event) {
	if (event.button === 2) {
		var url = GetUrl(event.srcElement);

		//console.log("Url: " + url);

		if (url === null) {
			SendMessage("none", "none");
			return;
		}

		if (url.indexOf("n.jpg") > 0) {
			SendMessage("image", url);
			return;
		}
		if (url.indexOf("n.mp4") > 0) {
			SendMessage("video", url);
			return;
		}
	}
});

function GetElementUnderCursor() {
	var x = document.querySelector(":hover");
	while (x) {
		var element = x;
		x = element.querySelector(":hover");
	}
	return element;
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.method == "getUrl") {
		var url = GetUrl(GetElementUnderCursor());

		if (url === null) {
			sendResponse({
				url : "none"
			});
			return;
		}

		if (url.indexOf("n.jpg") > 0 || url.indexOf("n.mp4") > 0) {
			sendResponse({
				url : url
			});
		}
	}
});
