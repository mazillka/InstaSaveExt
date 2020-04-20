let Url;

chrome.extension.onMessage.addListener((request) => {
    Url = request.Link;

    switch (request.Type) {
        case "media":
            chrome.storage.local.get({
                showDialog: false,
            }, (items) => {
                chrome.contextMenus.removeAll();
                chrome.contextMenus.create({
                    id: "menu",
                    enabled: true,
                    title: items.showDialog ? "Save as..." : "Save",
                    contexts: ["all"],
                    documentUrlPatterns: ["*://*.instagram.com/*"]
                });
            });
            break;

        default:
            chrome.contextMenus.removeAll();
            break;
    }
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.storage.local.get({
        showDialog: false,
    }, (items) => {
        chrome.downloads.download({
            url: Url,
            saveAs: items.showDialog
        });
    });
});
