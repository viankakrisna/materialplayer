// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.windows.create({
//         url: chrome.runtime.getURL("index.html"),
//         type: 'panel'
//     });
// });
chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 480,
            'height': 640
        }
    });
});

