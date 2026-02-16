const CACHE_NAME = 'max-reality-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/clean-poster.PNG',
  '/azul-tactical.png',
  '/mochkil-idle.png',
  '/mochkil-yes.png',
  '/a-sunny-day.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
