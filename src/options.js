import "./options.scss";
import extensionizer  from "extensionizer";

document.addEventListener("DOMContentLoaded", () => {
    var checkBox = document.querySelector("#showSaveDialogCheckBox");

    checkBox.addEventListener("change", () => {
        extensionizer.storage.local.set({
            showDialog: checkBox.checked
        });
    });

    extensionizer.storage.local.get({
        showDialog: false
    }, (items) => {
        if (items.showDialog) {
            checkBox.checked = items.showDialog;
        }
    });
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
