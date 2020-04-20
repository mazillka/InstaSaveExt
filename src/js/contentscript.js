const IsNotNull = (obj) => obj !== undefined && obj !== "none" && obj !== null;

const RemoveEventFromElement = (element) => {
    var old_element = element
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
};

const SendMessage = (type, link) => {
    chrome.extension.sendMessage({
        Type: type,
        Link: link
    });
};

document.addEventListener("mousedown", (event) => {
    if (event.button === 2 /* right mouse button */ ) {
        var parentNode = event.srcElement.parentNode.parentNode;

        // Unlock context menu for IGTV and Stories
        RemoveEventFromElement(parentNode);

        // Stories
        var source = parentNode.getElementsByTagName("source");
        if(source.length == 2 && IsNotNull(source[0])){
            SendMessage("media", source[0].src);
            return;
        }

        // Videos
        var video = parentNode.getElementsByTagName("video");
        if (video.length == 1 && IsNotNull(video[0])) {
            SendMessage("media", video[0].src);
            return;
        }

        // Photos
        var image = parentNode.getElementsByTagName("img");
        if (image.length == 1 && IsNotNull(image[0])) {
            SendMessage("media", image[0].src);
            return;
        }

        SendMessage("none", "none");
    }
});
