(function() {
    document.body.innerHTML = '';
    chrome.storage.local.set({ open: decodeURI(window.location.href) }, function() {
        window.close();
        chrome.runtime.sendMessage(decodeURI(window.location.href));
    });
}());
