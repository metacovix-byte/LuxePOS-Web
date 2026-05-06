// LuxePOS Service Worker v4.7
// Stratégie : Cache-First pour CDN + app shell, Network-First pour les données

const CACHE = 'luxepos-v4-7';
const APP_SHELL = [
    './',
    './luxepos-final.html'
];
const CDN_CACHE = [
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(c => {
            // Mise en cache de l'app shell (obligatoire pour offline)
            return c.addAll(APP_SHELL).then(() => {
                // Mise en cache best-effort des CDN (ne bloque pas l'install si un CDN est down)
                return Promise.allSettled(
                    CDN_CACHE.map(url => fetch(url, { mode: 'no-cors' }).then(res => c.put(url, res)).catch(() => {}))
                );
            });
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(Promise.all([
        self.clients.claim(),
        caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE).map(k => caches.delete(k))
        ))
    ]));
});

self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Firebase : toujours network-first (données en temps réel)
    if (/firestore\.googleapis|firebaseio/.test(url.hostname)) {
        return; // laisse le navigateur gérer
    }

    // CDN : cache-first avec fallback network + mise en cache
    const isCDN = /cdn\.tailwindcss|unpkg\.com|gstatic\.com|jsdelivr\.net|fonts\.googleapis|fonts\.gstatic/.test(url.hostname);
    if (isCDN) {
        e.respondWith(
            caches.match(req).then(cached => {
                if (cached) return cached;
                return fetch(req).then(res => {
                    const clone = res.clone();
                    caches.open(CACHE).then(c => c.put(req, clone)).catch(() => {});
                    return res;
                }).catch(() => caches.match(req));
            })
        );
        return;
    }

    // App shell et ressources locales : network-first avec fallback cache
    e.respondWith(
        fetch(req).then(res => {
            if (res && res.ok && (res.type === 'basic' || res.type === 'default')) {
                const clone = res.clone();
                caches.open(CACHE).then(c => c.put(req, clone)).catch(() => {});
            }
            return res;
        }).catch(() => caches.match(req).then(cached => {
            if (cached) return cached;
            // Fallback ultime : page d'accueil en cache
            if (req.mode === 'navigate') {
                return caches.match('./luxepos-final.html') || caches.match('./');
            }
            return new Response('Hors ligne', { status: 503, statusText: 'Offline' });
        }))
    );
});

// Permet de forcer le refresh depuis l'app (ex: après update manuel)
self.addEventListener('message', event => {
    if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
