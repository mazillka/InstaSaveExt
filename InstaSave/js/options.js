document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("showSaveDialogCheckBox").addEventListener('change', function(){
		var checkedSaveDialog = document.getElementById("showSaveDialogCheckBox").checked;

		chrome.storage.local.set({
			"showDialog" : checkedSaveDialog,
		});
	});

	chrome.storage.local.get({
		"showDialog" : false,
	}, function (items) {
		if (items.showDialog != null) {
			document.getElementById("showSaveDialogCheckBox").checked = items.showDialog;
		}
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});
