const CACHE_NAME = 'modificaciones-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/styles/style.css',
    '/src/js/app.js',
    '/src/img/resource/IconsRS/iconoCompany.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});