var url = false;
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: 'panel'
    });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var url = sender.url;
    if (url.indexOf('.mp3') === url.length - 4) {
        chrome.tabs.query({
            url: chrome.extension.getURL('index.html')
        }, function(tabs) {
            if (tabs.length === 0) {
                chrome.windows.create({
                    url: chrome.runtime.getURL("index.html"),
                    type: 'panel'
                });
            } else {
                chrome.windows.update(tabs[0].windowId, { focused: true });
            }
        });
    }
});
// chrome.app.runtime.onLaunched.addListener(function() {
//     chrome.app.window.create('index.html', {
//         'outerBounds': {
//             'width': 1024,
//             'height': 600
//         }
//     });
// });

// chrome.app.window.create(
//     'sandbox.html', {
//         'outerBounds': {
//             'width': 1024,
//             'height': 600
//         }
//     });
