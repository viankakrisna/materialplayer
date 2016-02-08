(function () {
    var fileId;
    var gapiLib;

    function fileInserted(file) {
        fileId = file.id;
        console.log(file);
    }
    window.addEventListener('message', function (event) {
        var command = event.data.command;
        switch (command) {
        case 'token':
            var dta = event.data.context;
            break;
        case 'gapi':
            console.log('Message Received');
            gapi.load("auth:client,drive-realtime,drive-share", function () {
                console.log(gapi);
                var message = {
                    command: 'load',
                    context: {
                        loaded: true
                    }
                };
                gapi.load("picker", function () {
                    var picker = new FilePicker({
                        apiKey: 'AIzaSyBMDM4v6cjmt3k00QO7PAZn2MGg8hRvSv4',
                        clientId: '1868175267',
                        buttonEl: document.getElementById('authorize'),
                        onSelect: function (fileList) {
                            console.log(fileList);
                        }
                    });
                });
                event.source.postMessage(message, event.origin);
            });
            break;
        }
    });
})();

