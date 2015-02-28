var Url;
chrome.extension.onMessage.addListener(function (request) {
	Url = request.Link;

	switch (request.Type) {
	case 'create':
		chrome.contextMenus.create({
			id : 'subMenu',
			enabled : false,
			title : 'Save as...',
			contexts : ['all'],
			documentUrlPatterns : ['*://instagram.com/*']
		});
		break;
	case 'image':
		chrome.contextMenus.update('subMenu', {
			title : 'Save image as...',
			enabled : true
		});
		break;
	case 'video':
		chrome.contextMenus.update('subMenu', {
			title : 'Save video as...',
			enabled : true
		});
		break;
	case 'none':
		chrome.contextMenus.update('subMenu', {
			enabled : false,
			title : 'nothin to save'
		});
		break;
	}
});

function Save() {
	var a = document.createElement('a');
	a.href = Url;
	a.download = 'temp.*';
	a.click();
	a.remove();
}

chrome.contextMenus.onClicked.addListener(Save);

chrome.runtime.onInstalled.addListener(function () {
	chrome.tabs.create({
		'url' : chrome.extension.getURL('html/donate.html')
	});
});

chrome.runtime.onUpdateAvailable.addListener(function() {
	chrome.tabs.create({'url': chrome.extension.getURL('html/donate.html')});
	chrome.runtime.reload();
});