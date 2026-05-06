// LuxePOS Service Worker v5.14.2
// v5.14.2 — Plus de prefetch CDN opaque (cassait Tailwind/Lucide en WebView2).
// Tailwind & Lucide sont self-hosted dans vendor/. Le runtime fetch handler
// met en cache CORS-mode au premier hit naturel.

const CACHE = 'luxepos-v5-14-2';
const APP_SHELL = [
    './',
    './luxepos-final.html'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(APP_SHELL).catch(() => {}))
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
