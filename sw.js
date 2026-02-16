const CACHE_NAME = 'qcode-pyramid-v1.7'; // Bump this when you change assets!
const ASSETS = [
  './',
  './index.html',
  './clean-poster.PNG',
  './clean-poster1.png',
  './bad-guy.png',
  './azul-tactical.png',
  './mochkil-idle.png',
  './mochkil-yes.png',
  './a-sunny-day.mp3'
];

// 1. Install - Fast cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Mainframe Caching: Success');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); 
});

// 2. Activate - Deep Clean (Prevents clogging)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Purging Corrupted Logic:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch - Smart Strategy
self.addEventListener('fetch', event => {
  // Skip cross-origin requests (like p5.js CDN) to keep your cache clean
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return the cached asset, but also check for an update in the background
        // (This is why it won't get clogged next time you upload!)
        fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
        }).catch(() => {}); 
        
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
