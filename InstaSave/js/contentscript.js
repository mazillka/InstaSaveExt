var debug = false;

function SendMessage(type, link) {
    chrome.extension.sendMessage({
        Type: type,
        Link: link
    });
}

document.addEventListener("mousedown", function(event) {
    if (event.button === 2) {
        try {
            var video = event.srcElement.previousSibling.previousSibling.firstChild.firstChild.firstChild.src;
            if(debug){
                console.log("video: " + video);
            }
            SendMessage("video", video);
        } catch (e) {
            try {
                var image = event.srcElement.previousSibling.firstChild.src;
                if (image === undefined || image == 'none') {
                    if(debug){
                        console.log("image: " + event.srcElement.previousSibling.firstChild.src);
                    }
                    throw (e);
                }
                if(debug){
                    console.log("image: " + image);
                }
                SendMessage("image", image);
            } catch (e) {
                if(debug){
                    console.log("none");
                }
                SendMessage("none", "none");
            }
        }
    }
});