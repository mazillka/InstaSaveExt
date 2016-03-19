var Url;

function CreateContextMenu(titleValue) {
	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
		id : "menu",
		enabled : true,
		title : titleValue,
		contexts : ["all"],
		documentUrlPatterns : ["*://*.instagram.com/*"]
	});
}

chrome.extension.onMessage.addListener(function (request) {
	Url = request.Link;

	switch (request.Type) {
		case "create":
			CreateContextMenu("Save as...");
			break;

		case "image":
			CreateContextMenu("Save as...");
			// CreateContextMenu("Save image as...");
			break;

		case "video":
			CreateContextMenu("Save as...");
			// CreateContextMenu("Save video as...");
			break;

		default:
			chrome.contextMenus.removeAll();
			break;
	}
});

function DownloadMedia(mediaUrl) {
	chrome.storage.local.get({
		"showDialog" : false,
	}, function (items) {
		if (items.showDialog != null) {
			chrome.downloads.download({
				url : mediaUrl,
				saveAs : items.showDialog
			});
		}
	});
}

chrome.contextMenus.onClicked.addListener(function (info) {
	DownloadMedia(Url);
});

chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		chrome.tabs.create({
			'url' : chrome.extension.getURL('html/options.html')
		});
	} else if (details.reason === "update") {
		chrome.tabs.create({
			'url' : chrome.extension.getURL('html/options.html')
		});
	}
});
