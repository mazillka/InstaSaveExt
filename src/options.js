import "./options.scss";

document.addEventListener("DOMContentLoaded", () => {
    var checkBox = document.querySelector("#showSaveDialogCheckBox");

    checkBox.addEventListener("change", () => {
        chrome.storage.local.set({
            showDialog: checkBox.checked,
        });
    });

    chrome.storage.local.get({
        showDialog: false,
    }, (items) => {
        if (items.showDialog) {
            checkBox.checked = items.showDialog;
        }
    });
});

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});
