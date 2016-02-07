/**!
 * Google Drive File Picker Example
 * By Daniel Lo Nigro (http://dan.cx/)
 */
(function () {
    /**
     * Initialise a Google Driver file picker
     */
    var FilePicker = window.FilePicker = function (options) {
        // Elements
        this.buttonEl = options.buttonEl;
        // Events
        this.onSelect = options.onSelect;
        this.buttonEl.addEventListener('click', this.open.bind(this));
        // Disable the button until the API loads, as it won't work properly until then.
        this.buttonEl.disabled = true;
        // Load the drive API
        gapi.client.load('drive', 'v2', this.driveApiLoaded.bind(this));
        google.load('picker', '1', {
            callback: this.pickerApiLoaded.bind(this)
        });
    };
    FilePicker.prototype = {
        /**
         * Open the file picker.
         */
        open: function () {
            // Check if the user has already authenticated
            chrome.identity.getAuthToken({
                'interactive': false
            }, function (token) {
                // Use the token.
                if (token) {
                    this.showPicker();
                } else {
                    // The user has not yet authenticated with Google
                    // We need to do the authentication before displaying the Drive picker.
                    this.doAuth(false, function () {
                        this.showPicker();
                    }.bind(this));
                }
            }.bind(this));
        },
        /**
         * Show the file picker once authentication has been done.
         * @private
         */
        showPicker: function () {
            chrome.identity.getAuthToken({
                interactive: false
            }, function (accessToken) {
                this.picker = new google.picker.PickerBuilder()
                    .addView(google.picker.ViewId.FOLDERS)
                    .setAppId(this.clientId)
                    .setOAuthToken(accessToken)
                    .enableFeature(google.picker.Feature.MULTISELECTENABLED)
                    .setCallback(this.pickerCallback.bind(this))
                    .build()
                    .setVisible(true);
            }.bind(this));
        },
        /**
         * Called when a file has been selected in the Google Drive file picker.
         * @private
         */
        pickerCallback: function (data) {
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                var files = data.docs;
                this.fileGetCallback(files);
            }
        },
        /**
         * Called when file details have been retrieved from Google Drive.
         * @private
         */
        fileGetCallback: function (file) {
            if (this.onSelect) {
                this.onSelect(file);
            }
        },
        /**
         * Called when the Google Drive file picker API has finished loading.
         * @private
         */
        pickerApiLoaded: function () {
            this.buttonEl.disabled = false;
        },
        /**
         * Called when the Google Drive API has finished loading.
         * @private
         */
        driveApiLoaded: function () {
            this.doAuth(true);
        },
        /**
         * Authenticate with Google Drive via the Google JavaScript API.
         * @private
         */
        doAuth: function (interactive, callback) {
            chrome.identity.getAuthToken({
                interactive: interactive
            }, callback);
        },
        verifytoken: function (accessToken) {}
    };
}());

