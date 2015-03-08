window.onload = function () {
	chrome.extension.sendMessage({
		Type : 'create',
		Link : 'none'
	});
}

document.addEventListener('mousedown', function (event) {
	if (event.button !== 2) {
		return false;
	}

	if (event.button === 2) {
		var Url;
		var imgUrl = event.srcElement.style.backgroundImage.replace('url(', '').replace(')', '');
		var videoUrl = event.srcElement.parentElement.getAttribute('src');

		if (videoUrl === null) {
			Url = imgUrl;
		} else {
			Url = videoUrl;
		}

		if (Url.indexOf('n.jpg') > 0) {
			chrome.extension.sendMessage({
				Type : 'image',
				Link : Url
			});
		} else if (Url.indexOf('n.mp4') > 0) {
			chrome.extension.sendMessage({
				Type : 'video',
				Link : Url
			});
		} else {
			chrome.extension.sendMessage({
				Type : 'none',
				Link : 'none'
			});
		}
	}
});

document.addEventListener('mousewheel', function (event) {
	if ((document.URL.indexOf('instagram.com/p/') > 0)
		 && (event.srcElement.className == 'iImage')
		 || (event.srcElement.className == 'vCoverLayer')) {
		try {
			if ((event.wheelDelta || -event.detail) == 120) {
				document.getElementsByClassName('mmRightArrow')[0].click();
			} else {
				document.getElementsByClassName('mmLeftArrow')[0].click();
			}
		} catch (event) {}
	}
});
