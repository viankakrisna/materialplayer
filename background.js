chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('sandbox.html', {
    id: 'MaterialPlayer',
    bounds: {
      width: 800,
      height: 600,
      left: 100,
      top: 100
    },
    minWidth: 320,
    minHeight: 480
  });
});
