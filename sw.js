// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

//credits: https://developers.google.com/web/fundamentals/primers/service-workers
//         https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim

//Register a service worker 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

//Install a service worker
  self.addEventListener('install', function(event) {
    // Perform install steps
    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      './index.html',
      './style.css',
      './scripts/script.js',
      './scripts/router.js',
      './components/entry-page.js',
      './components/journal-entry.js',
      'https://cse110lab6.herokuapp.com/entries'

    ];
    
    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });
  });

  //Cache and return requests
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

  //Event listener to update the service worker 
  self.addEventListener('activate', event => {
      event.waitUntil(clients.claim());
  })