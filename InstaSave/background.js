var Url;
chrome.extension.onMessage.addListener(
	function(request, sender, send_response) {
		Url = request.Url;
	}
);

chrome.runtime.onInstalled.addListener(function() {
	var context = "all";
	var title = "Save";
	var showForPages = ["http://instagram.com/*"];
	var id = chrome.contextMenus.create({
		"title": title, 
		"contexts":[context], 
		"id": "context" + context,
		"documentUrlPatterns": showForPages
	});  
});

chrome.contextMenus.onClicked.addListener(Save);

function Save() {
	if((Url.indexOf("n.jpg") >= 0) || (Url.indexOf("n.mp4") >= 0)){
		var a = document.createElement('a');
		a.href = Url;
		a.download = "temp.*"
		a.click();
		a.remove();
	}
	else{
		alert("Nothin to save!");
	}
};
