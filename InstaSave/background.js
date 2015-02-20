var Url;
var menu;
chrome.extension.onMessage.addListener(function(request) {
	Url = request.Link;
	if(menu == null){
		switch(request.Type){
			case "image":
				menu = chrome.contextMenus.create({
					'id': "subMenu",
					'enabled': true, 
					'title': "Save as...", 
					'contexts': ["all"], 
					'documentUrlPatterns': ["*://instagram.com/*"]
				});		
			break;
			case "video":
				menu = chrome.contextMenus.create({
					'id': "subMenu",
					'enabled': true, 
					'title': "Save as...", 
					'contexts': ["all"], 
					'documentUrlPatterns': ["*://instagram.com/*"]
				});		
			break;
			case "none":
				menu = chrome.contextMenus.create({
					'id': "subMenu",
					'enabled': false, 
					'title': "nothin to save", 
					'contexts': ["all"], 
					'documentUrlPatterns': ["*://instagram.com/*"]
				});				
			break;
		}	
	}
	else{
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
	}
});

chrome.contextMenus.onClicked.addListener(Save);

function Save(){
	var a = document.createElement('a');
	a.href = Url;
	a.download = "temp.*";
	a.click();
	a.remove();
};
