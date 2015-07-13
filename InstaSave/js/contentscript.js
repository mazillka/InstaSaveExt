// window.onload = function () {
	// chrome.extension.sendMessage({
		// Type : "create",
		// Link : "none"
	// });
// }

function SendMessage(type, link) {
	chrome.extension.sendMessage({
		Type : type,
		Link : link
	});
}

function GetUrl(element) {
	var Url;
	var imgUrl = element.style.backgroundImage.replace("url(", "").replace(")", "");
	var videoUrl = element.parentElement.getAttribute("src");

	if (videoUrl === null) {
		Url = imgUrl;
	} else {
		Url = videoUrl;
	}

	return Url;
}

document.addEventListener("mousedown", function (event) {
	if (event.button === 2) {
		var url = GetUrl(event.srcElement);

		if (url.indexOf("n.jpg") > 0) {
			SendMessage("image", url);
		} else if (url.indexOf("n.mp4") > 0) {
			SendMessage("video", url);
		} else {
			SendMessage("none", "none");
		}
	}
});

function GetElementUnderCursor() {
	var x = document.querySelector(":hover");
	while (x) {
		var xxx = x;
		x = xxx.querySelector(":hover");
	}
	return xxx;
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.method == "getUrl") {
		var url = GetUrl(GetElementUnderCursor());

		if (url.indexOf("n.jpg") > 0 || url.indexOf("n.mp4") > 0) {
			sendResponse({
				url : url
			});
		} else {
			sendResponse({
				url : "none"
			});
		}
	}
});
