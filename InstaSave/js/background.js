var Url;

function CreateContextMenu() {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: "menu",
        enabled: true,
        title: "Save as...",
        contexts: ["all"],
        documentUrlPatterns: ["*://*.instagram.com/*"]
    });
}

chrome.extension.onMessage.addListener(function (request) {
    Url = request.Link;

    switch (request.Type) {
        case "media":
            CreateContextMenu();
            break;

        default:
            chrome.contextMenus.removeAll();
            break;
    }
});

chrome.contextMenus.onClicked.addListener(function () {
    chrome.storage.local.get({
        "showDialog": false,
    }, function (items) {
        chrome.downloads.download({
            url: Url,
            saveAs: items.showDialog
        });
    });
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({
        'url': chrome.extension.getURL('html/options.html')
    });
});