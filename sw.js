var styleNames = ['dialog-polyfill.css',
    'icon.css',
    'icons.woff2',
    'material.amber-blue.min.css',
    'material.amber-cyan.min.css',
    'material.amber-deep_orange.min.css',
    'material.amber-deep_purple.min.css',
    'material.amber-green.min.css',
    'material.amber-indigo.min.css',
    'material.amber-light_blue.min.css',
    'material.amber-light_green.min.css',
    'material.amber-lime.min.css',
    'material.amber-orange.min.css',
    'material.amber-pink.min.css',
    'material.amber-purple.min.css',
    'material.amber-red.min.css',
    'material.amber-teal.min.css',
    'material.amber-yellow.min.css',
    'material.blue_grey-amber.min.css',
    'material.blue_grey-blue.min.css',
    'material.blue_grey-cyan.min.css',
    'material.blue_grey-deep_orange.min.css',
    'material.blue_grey-deep_purple.min.css',
    'material.blue_grey-green.min.css',
    'material.blue_grey-indigo.min.css',
    'material.blue_grey-light_blue.min.css',
    'material.blue_grey-light_green.min.css',
    'material.blue_grey-lime.min.css',
    'material.blue_grey-orange.min.css',
    'material.blue_grey-pink.min.css',
    'material.blue_grey-purple.min.css',
    'material.blue_grey-red.min.css',
    'material.blue_grey-teal.min.css',
    'material.blue_grey-yellow.min.css',
    'material.blue-amber.min.css',
    'material.blue-cyan.min.css',
    'material.blue-deep_orange.min.css',
    'material.blue-deep_purple.min.css',
    'material.blue-green.min.css',
    'material.blue-indigo.min.css',
    'material.blue-light_blue.min.css',
    'material.blue-light_green.min.css',
    'material.blue-lime.min.css',
    'material.blue-orange.min.css',
    'material.blue-pink.min.css',
    'material.blue-purple.min.css',
    'material.blue-red.min.css',
    'material.blue-teal.min.css',
    'material.blue-yellow.min.css',
    'material.brown-amber.min.css',
    'material.brown-blue.min.css',
    'material.brown-cyan.min.css',
    'material.brown-deep_orange.min.css',
    'material.brown-deep_purple.min.css',
    'material.brown-green.min.css',
    'material.brown-indigo.min.css',
    'material.brown-light_blue.min.css',
    'material.brown-light_green.min.css',
    'material.brown-lime.min.css',
    'material.brown-orange.min.css',
    'material.brown-pink.min.css',
    'material.brown-purple.min.css',
    'material.brown-red.min.css',
    'material.brown-teal.min.css',
    'material.brown-yellow.min.css',
    'material.css',
    'material.cyan-amber.min.css',
    'material.cyan-blue.min.css',
    'material.cyan-deep_orange.min.css',
    'material.cyan-deep_purple.min.css',
    'material.cyan-green.min.css',
    'material.cyan-indigo.min.css',
    'material.cyan-light_blue.min.css',
    'material.cyan-light_green.min.css',
    'material.cyan-lime.min.css',
    'material.cyan-orange.min.css',
    'material.cyan-pink.min.css',
    'material.cyan-purple.min.css',
    'material.cyan-red.min.css',
    'material.cyan-teal.min.css',
    'material.cyan-yellow.min.css',
    'material.deep_orange-amber.min.css',
    'material.deep_orange-blue.min.css',
    'material.deep_orange-cyan.min.css',
    'material.deep_orange-deep_purple.min.css',
    'material.deep_orange-green.min.css',
    'material.deep_orange-indigo.min.css',
    'material.deep_orange-light_blue.min.css',
    'material.deep_orange-light_green.min.css',
    'material.deep_orange-lime.min.css',
    'material.deep_orange-orange.min.css',
    'material.deep_orange-pink.min.css',
    'material.deep_orange-purple.min.css',
    'material.deep_orange-red.min.css',
    'material.deep_orange-teal.min.css',
    'material.deep_orange-yellow.min.css',
    'material.deep_purple-amber.min.css',
    'material.deep_purple-blue.min.css',
    'material.deep_purple-cyan.min.css',
    'material.deep_purple-deep_orange.min.css',
    'material.deep_purple-green.min.css',
    'material.deep_purple-indigo.min.css',
    'material.deep_purple-light_blue.min.css',
    'material.deep_purple-light_green.min.css',
    'material.deep_purple-lime.min.css',
    'material.deep_purple-orange.min.css',
    'material.deep_purple-pink.min.css',
    'material.deep_purple-purple.min.css',
    'material.deep_purple-red.min.css',
    'material.deep_purple-teal.min.css',
    'material.deep_purple-yellow.min.css',
    'material.green-amber.min.css',
    'material.green-blue.min.css',
    'material.green-cyan.min.css',
    'material.green-deep_orange.min.css',
    'material.green-deep_purple.min.css',
    'material.green-indigo.min.css',
    'material.green-light_blue.min.css',
    'material.green-light_green.min.css',
    'material.green-lime.min.css',
    'material.green-orange.min.css',
    'material.green-pink.min.css',
    'material.green-purple.min.css',
    'material.green-red.min.css',
    'material.green-teal.min.css',
    'material.green-yellow.min.css',
    'material.grey-amber.min.css',
    'material.grey-blue.min.css',
    'material.grey-cyan.min.css',
    'material.grey-deep_orange.min.css',
    'material.grey-deep_purple.min.css',
    'material.grey-green.min.css',
    'material.grey-indigo.min.css',
    'material.grey-light_blue.min.css',
    'material.grey-light_green.min.css',
    'material.grey-lime.min.css',
    'material.grey-orange.min.css',
    'material.grey-pink.min.css',
    'material.grey-purple.min.css',
    'material.grey-red.min.css',
    'material.grey-teal.min.css',
    'material.grey-yellow.min.css',
    'material.indigo-amber.min.css',
    'material.indigo-blue.min.css',
    'material.indigo-cyan.min.css',
    'material.indigo-deep_orange.min.css',
    'material.indigo-deep_purple.min.css',
    'material.indigo-green.min.css',
    'material.indigo-light_blue.min.css',
    'material.indigo-light_green.min.css',
    'material.indigo-lime.min.css',
    'material.indigo-orange.min.css',
    'material.indigo-pink.min.css',
    'material.indigo-purple.min.css',
    'material.indigo-red.min.css',
    'material.indigo-teal.min.css',
    'material.indigo-yellow.min.css',
    'material.light_blue-amber.min.css',
    'material.light_blue-blue.min.css',
    'material.light_blue-cyan.min.css',
    'material.light_blue-deep_orange.min.css',
    'material.light_blue-deep_purple.min.css',
    'material.light_blue-green.min.css',
    'material.light_blue-indigo.min.css',
    'material.light_blue-light_green.min.css',
    'material.light_blue-lime.min.css',
    'material.light_blue-orange.min.css',
    'material.light_blue-pink.min.css',
    'material.light_blue-purple.min.css',
    'material.light_blue-red.min.css',
    'material.light_blue-teal.min.css',
    'material.light_blue-yellow.min.css',
    'material.light_green-amber.min.css',
    'material.light_green-blue.min.css',
    'material.light_green-cyan.min.css',
    'material.light_green-deep_orange.min.css',
    'material.light_green-deep_purple.min.css',
    'material.light_green-green.min.css',
    'material.light_green-indigo.min.css',
    'material.light_green-light_blue.min.css',
    'material.light_green-lime.min.css',
    'material.light_green-orange.min.css',
    'material.light_green-pink.min.css',
    'material.light_green-purple.min.css',
    'material.light_green-red.min.css',
    'material.light_green-teal.min.css',
    'material.light_green-yellow.min.css',
    'material.lime-amber.min.css',
    'material.lime-blue.min.css',
    'material.lime-cyan.min.css',
    'material.lime-deep_orange.min.css',
    'material.lime-deep_purple.min.css',
    'material.lime-green.min.css',
    'material.lime-indigo.min.css',
    'material.lime-light_blue.min.css',
    'material.lime-light_green.min.css',
    'material.lime-orange.min.css',
    'material.lime-pink.min.css',
    'material.lime-purple.min.css',
    'material.lime-red.min.css',
    'material.lime-teal.min.css',
    'material.lime-yellow.min.css',
    'material.min.css',
    'material.orange-amber.min.css',
    'material.orange-blue.min.css',
    'material.orange-cyan.min.css',
    'material.orange-deep_orange.min.css',
    'material.orange-deep_purple.min.css',
    'material.orange-green.min.css',
    'material.orange-indigo.min.css',
    'material.orange-light_blue.min.css',
    'material.orange-light_green.min.css',
    'material.orange-lime.min.css',
    'material.orange-pink.min.css',
    'material.orange-purple.min.css',
    'material.orange-red.min.css',
    'material.orange-teal.min.css',
    'material.orange-yellow.min.css',
    'material.pink-amber.min.css',
    'material.pink-blue.min.css',
    'material.pink-cyan.min.css',
    'material.pink-deep_orange.min.css',
    'material.pink-deep_purple.min.css',
    'material.pink-green.min.css',
    'material.pink-indigo.min.css',
    'material.pink-light_blue.min.css',
    'material.pink-light_green.min.css',
    'material.pink-lime.min.css',
    'material.pink-orange.min.css',
    'material.pink-purple.min.css',
    'material.pink-red.min.css',
    'material.pink-teal.min.css',
    'material.pink-yellow.min.css',
    'material.purple-amber.min.css',
    'material.purple-blue.min.css',
    'material.purple-cyan.min.css',
    'material.purple-deep_orange.min.css',
    'material.purple-deep_purple.min.css',
    'material.purple-green.min.css',
    'material.purple-indigo.min.css',
    'material.purple-light_blue.min.css',
    'material.purple-light_green.min.css',
    'material.purple-lime.min.css',
    'material.purple-orange.min.css',
    'material.purple-pink.min.css',
    'material.purple-red.min.css',
    'material.purple-teal.min.css',
    'material.purple-yellow.min.css',
    'material.red-amber.min.css',
    'material.red-blue.min.css',
    'material.red-cyan.min.css',
    'material.red-deep_orange.min.css',
    'material.red-deep_purple.min.css',
    'material.red-green.min.css',
    'material.red-indigo.min.css',
    'material.red-light_blue.min.css',
    'material.red-light_green.min.css',
    'material.red-lime.min.css',
    'material.red-orange.min.css',
    'material.red-pink.min.css',
    'material.red-purple.min.css',
    'material.red-teal.min.css',
    'material.red-yellow.min.css',
    'material.teal-amber.min.css',
    'material.teal-blue.min.css',
    'material.teal-cyan.min.css',
    'material.teal-deep_orange.min.css',
    'material.teal-deep_purple.min.css',
    'material.teal-green.min.css',
    'material.teal-indigo.min.css',
    'material.teal-light_blue.min.css',
    'material.teal-light_green.min.css',
    'material.teal-lime.min.css',
    'material.teal-orange.min.css',
    'material.teal-pink.min.css',
    'material.teal-purple.min.css',
    'material.teal-red.min.css',
    'material.teal-yellow.min.css',
    'material.yellow-amber.min.css',
    'material.yellow-blue.min.css',
    'material.yellow-cyan.min.css',
    'material.yellow-deep_orange.min.css',
    'material.yellow-deep_purple.min.css',
    'material.yellow-green.min.css',
    'material.yellow-indigo.min.css',
    'material.yellow-light_blue.min.css',
    'material.yellow-light_green.min.css',
    'material.yellow-lime.min.css',
    'material.yellow-orange.min.css',
    'material.yellow-pink.min.css',
    'material.yellow-purple.min.css',
    'material.yellow-red.min.css',
    'material.yellow-teal.min.css',
    'MaterialIcons-Regular.ttf',
    'style.css',
    'visualizer.css'
];
var scriptNames = ['angular.min.js',
    'client.js',
    'Dexie.min.js',
    'dialog-polyfill.js',
    'filepicker.js',
    'gapi-chrome-apps.js',
    'id3-minimized.js',
    'jquery.dataTables.min.js',
    'jquery.min.js',
    'jquery.srt.js',
    'jsapi.js',
    'LargeLocalStorage.min.js',
    'loader.js',
    'material.min.js',
    'mp.artwork.js',
    'mp.contextmenu.js',
    'mp.customizer.js',
    'mp.db.js',
    'mp.dialog.js',
    'mp.drive.js',
    'mp.hash.js',
    'mp.init.js',
    'mp.log.js',
    'mp.player.js',
    'mp.playlist.js',
    'mp.settings.js',
    'mp.storage.js',
    'mp.visualizer.js',
    'videosub-0.9.9.js',
];
var stylesPath = '/materialplayer/assets/css/';
var scriptsPath = '/materialplayer/assets/js/';
var styles = styleNames.map(function(style) {
    return stylesPath + style;
});
var scripts = styleNames.map(function(script) {
    return stylesPath + script;
});


console.log('WORKER: executing.');

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v1::';

/* These resources will be downloaded and cached by the service worker
   during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/
var offlineFundamentals = scripts + styles + ['/materialplayer/index.html'];

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function(event) {
    console.log('WORKER: install event in progress.');
    /* Using event.waitUntil(p) blocks the installation process on the provided
       promise. If the promise is rejected, the service worker won't be installed.
    */
    event.waitUntil(
        /* The caches built-in is a promise-based API that helps you cache responses,
           as well as finding and deleting them.
        */
        caches
        /* You can open a cache by name, and this method returns a promise. We use
           a versioned cache name here so that we can remove old cache entries in
           one fell swoop later, when phasing out an older service worker.
        */
        .open(version + 'fundamentals')
        .then(function(cache) {
            /* After the cache is opened, we can fill it with the offline fundamentals.
               The method below will add all resources in `offlineFundamentals` to the
               cache, after making requests for them.
            */
            return cache.addAll(offlineFundamentals);
        })
        .then(function() {
            console.log('WORKER: install completed');
        })
    );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", function(event) {
    console.log('WORKER: fetch event in progress.');

    /* We should only cache GET requests, and deal with the rest of method in the
       client-side, by handling failed POST,PUT,PATCH,etc. requests.
    */
    if (event.request.method !== 'GET') {
        /* If we don't block the event as shown below, then the request will go to
           the network as usual.
        */
        console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
        return;
    }
    /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
       Fulfillment result will be used as the response, and rejection will end in a
       HTTP response indicating failure.
    */
    event.respondWith(
        caches
        /* This method returns a promise that resolves to a cache entry matching
           the request. Once the promise is settled, we can then provide a response
           to the fetch request.
        */
        .match(event.request)
        .then(function(cached) {
            /* Even if the response is in our cache, we go to the network as well.
               This pattern is known for producing "eventually fresh" responses,
               where we return cached responses immediately, and meanwhile pull
               a network response and store that in the cache.
               Read more:
               https://ponyfoo.com/articles/progressive-networking-serviceworker
            */
            var networked = fetch(event.request)
                // We handle the network request with success and failure scenarios.
                .then(fetchedFromNetwork, unableToResolve)
                // We should catch errors on the fetchedFromNetwork handler as well.
                .catch(unableToResolve);

            /* We return the cached response immediately if there is one, and fall
               back to waiting on the network as usual.
            */
            console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;

            function fetchedFromNetwork(response) {
                /* We copy the response before replying to the network request.
                   This is the response that will be stored on the ServiceWorker cache.
                */
                var cacheCopy = response.clone();

                console.log('WORKER: fetch response from network.', event.request.url);

                caches
                // We open a cache to store the response for this request.
                    .open(version + 'pages')
                    .then(function add(cache) {
                        /* We store the response for this request. It'll later become
                           available to caches.match(event.request) calls, when looking
                           for cached responses.
                        */
                        cache.put(event.request, cacheCopy);
                    })
                    .then(function() {
                        console.log('WORKER: fetch response stored in cache.', event.request.url);
                    });

                // Return the response so that the promise is settled in fulfillment.
                return response;
            }

            /* When this method is called, it means we were unable to produce a response
               from either the cache or the network. This is our opportunity to produce
               a meaningful response even when all else fails. It's the last chance, so
               you probably want to display a "Service Unavailable" view or a generic
               error response.
            */
            function unableToResolve() {
                /* There's a couple of things we can do here.
                   - Test the Accept header and then return one of the `offlineFundamentals`
                     e.g: `return caches.match('/some/cached/image.png')`
                   - You should also consider the origin. It's easier to decide what
                     "unavailable" means for requests against your origins than for requests
                     against a third party, such as an ad provider.
                   - Generate a Response programmaticaly, as shown below, and return that.
                */

                console.log('WORKER: fetch request failed in both cache and network.');

                /* Here we're creating a response programmatically. The first parameter is the
                   response body, and the second one defines the options for the response.
                */
                return new Response('<h1>Service Unavailable</h1>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }
        })
    );
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", function(event) {
    /* Just like with the install event, event.waitUntil blocks activate on a promise.
       Activation will fail unless the promise is fulfilled.
    */
    console.log('WORKER: activate event in progress.');

    event.waitUntil(
        caches
        /* This method returns a promise which will resolve to an array of available
           cache keys.
        */
        .keys()
        .then(function(keys) {
            // We return a promise that settles when all outdated caches are deleted.
            return Promise.all(
                keys
                .filter(function(key) {
                    // Filter by keys that don't start with the latest version prefix.
                    return !key.startsWith(version);
                })
                .map(function(key) {
                    /* Return a promise that's fulfilled
                       when each outdated cache is deleted.
                    */
                    return caches.delete(key);
                })
            );
        })
        .then(function() {
            console.log('WORKER: activate completed.');
        })
    );
});
