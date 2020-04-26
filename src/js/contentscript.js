const IsNotNull = (obj) => obj !== undefined && obj !== "none" && obj !== null;

const RemoveEventFromElement = (element) => {
    var oldElement = element;
    var newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
};

const SendMessage = (type, link) => {
    chrome.extension.sendMessage({
        Type: type,
        Link: link
    });
};

document.addEventListener("mousedown", (event) => {
    if (event.button === 2 /* right mouse button */) {

        if (location.href.indexOf("stories") > -1) {
            const node = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode;

            // Unlock context menu
            RemoveEventFromElement(event.srcElement.parentNode.parentNode);

            const source = node.getElementsByTagName("source");
            if (source.length == 2 && IsNotNull(source[0])) {
                SendMessage("media", source[0].src);
                return;
            }

            const video = node.getElementsByTagName("video");
            if (video.length == 1 && IsNotNull(video[0])) {
                SendMessage("media", video[0].src);
                return;
            }

            const image = node.getElementsByTagName("img");
            if (image.length == 1 && IsNotNull(image[0])) {
                SendMessage("media", image[0].src);
                return;
            }
        } else if (location.href.indexOf("tv") > -1) {
            const node = event.srcElement.parentNode.parentNode;

            // Unlock context menu
            RemoveEventFromElement(event.srcElement.parentNode.parentNode);

            const video = node.getElementsByTagName("video");
            if (video.length == 1 && IsNotNull(video[0])) {
                SendMessage("media", video[0].src);
                return;
            }
        } else {
            const node = event.srcElement.parentNode.parentNode;

            // Videos
            const video = node.getElementsByTagName("video");
            if (video.length == 1 && IsNotNull(video[0])) {
                SendMessage("media", video[0].src);
                return;
            }

            // Photos
            const image = node.getElementsByTagName("img");
            if (image.length == 1 && IsNotNull(image[0])) {
                SendMessage("media", image[0].src);
                return;
            }
        }

        SendMessage("none", "none");
    }
});
