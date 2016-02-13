// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.windows.create({
//         url: chrome.runtime.getURL("index.html"),
//         type: 'panel'
//     });
// });
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 1024,
            'height': 600
        }
    });
});

chrome.app.window.create(
    'sandbox.html', {
        'outerBounds': {
            'width': 1024,
            'height': 600
        }
    });
