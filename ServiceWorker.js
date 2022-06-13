// https://github.com/marcushellberg/bad-news/blob/master/sw.js
const CACHE_VERSION = 'v1.00.03';
const CACHE_FILES = [
    '/',
    '/manifest.json',
    '/src/css/main-styles.css',
    '/src/css/login-styles.css',
    '/src/images/152-bitcoin.png',
    '/src/images/192-bitcoin.png',
    '/src/images/512-bitcoin.png',
    '/src/images/favicon.ico',
    '/src/javascript/Main.js',
];

const OFFLINE_URL = "offline.html";

self.addEventListener('install', async e => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(CACHE_FILES);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(CACHE_VERSION);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        return await cache.match(req);
    }
}