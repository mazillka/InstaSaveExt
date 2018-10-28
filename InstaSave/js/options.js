document.addEventListener('DOMContentLoaded', function () {
    var checkBox = document.getElementById("showSaveDialogCheckBox");

    checkBox.addEventListener('change', function () {
        chrome.storage.local.set({
            "showDialog": checkBox.checked,
        });
    });

    chrome.storage.local.get({
        "showDialog": false,
    }, function (items) {
        if (items.showDialog) {
            checkBox.checked = items.showDialog;
        }
    });
});

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});