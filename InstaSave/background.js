var Url;
chrome.extension.onMessage.addListener(function(request) {
	Url = request.Link;
	switch(request.Type)
	{
		case "image":
		chrome.contextMenus.update('subMenu',{
			'title': 'Save image as...', 
			'enabled': true
		});
		break;
		case "video":
		chrome.contextMenus.update('subMenu',{
			'title': 'Save video as...', 
			'enabled': true
		});		
		break;
		case "none":
		chrome.contextMenus.update('subMenu',{
			'enabled': false, 
			'title': "nothin to save"
		});
		break;	    
	}
});

//TODO: need some rework
chrome.contextMenus.create({
	'id': "subMenu",
	'enabled': false, 
	'title': "nothin to save", 
	'contexts': ["all"], 
	'documentUrlPatterns': ["http://instagram.com/*"]
});

chrome.contextMenus.onClicked.addListener(Save);

function Save(){
	var a = document.createElement('a');
	a.href = Url;
	a.download = "temp.*";
	a.click();
	a.remove();
};
