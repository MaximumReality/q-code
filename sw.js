const CACHE_NAME = 'qcode-pyramid-v1.3';
const ASSETS = [
  '/',
  '/index.html',
  '/sw.js',
  '/clean-poster.PNG',
  '/bad-guy.png',
  '/a-sunny-day.mp3',
  '/azul-tactical.png',
  '/mochkil-idle.png',
  '/mochkil-yes.png'
];

// Install event – cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate event – clean up old caches if any
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch event – respond with cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
