document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"showDialog" : false,
	}, function (items) {
		if (items.showDialog != null) {
			document.getElementById("showSaveDialogOption").checked = items.showDialog;
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("saveButton").addEventListener("click", function () {
		var checkedSaveDialog = document.getElementById("showSaveDialogOption").checked;

		chrome.storage.local.set({
			"showDialog" : checkedSaveDialog,
		}, function () {
			var status = document.getElementById('saveButton');
			status.value = "Options saved...";
			setTimeout(function () {
				status.value = "Save";
			}, 750);
		});
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});
