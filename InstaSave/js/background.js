var Url;
chrome.extension.onMessage.addListener(function (request) {
	Url = request.Link;

	switch (request.Type) {
	case 'create':
		chrome.contextMenus.create({
			id : 'menu',
			enabled : false,
			title : 'Save as...',
			contexts : ['all'],
			documentUrlPatterns : ['*://instagram.com/*']			
		});
		break;
	case 'image':
		chrome.contextMenus.update('menu', {
			title : 'Save image as...',
			enabled : true
		});
		break;
	case 'video':
		chrome.contextMenus.update('menu', {
			title : 'Save video as...',
			enabled : true
		});
		break;
	case 'none':
		chrome.contextMenus.update('menu', {
			title : 'nothin to save',
			enabled : false
		});
		break;
	}
});

chrome.contextMenus.onClicked.addListener(function (info) {
	chrome.downloads.download({
		url : Url
	});
});

chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == 'install') {
		chrome.tabs.create({
			url : chrome.extension.getURL('html/donate.html')
		});
	} else if (details.reason == 'update') {
		chrome.tabs.create({
			url : chrome.extension.getURL('html/donate.html')
		});			
	}
});