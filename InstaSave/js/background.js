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

chrome.extension.onMessage.addListener(function(request) {
    Url = request.Link;

    switch (request.Type) {
        case "create":
        case "image":
        case "video":
            CreateContextMenu();
            break;

        default:
            chrome.contextMenus.removeAll();
            break;
    }
});

function DownloadMedia(mediaUrl) {
    chrome.storage.local.get({
        "showDialog": false,
    }, function(items) {
        if (items.showDialog) {
            chrome.downloads.download({
                url: mediaUrl,
                saveAs: items.showDialog
            });
        }
    });
}

chrome.contextMenus.onClicked.addListener(function(info) {
    DownloadMedia(Url);
});

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('html/options.html')
    });
});