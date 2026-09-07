/* Offline demo shell only — this app never contacts PDS, Aadhaar, or any government system. */
/* Bump CACHE on every meaningful deploy so old caches are dropped automatically. */
const CACHE='anna-setu-demo-v3'
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['/', '/index.html', '/manifest.webmanifest'])))
  self.skipWaiting()
})
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
))
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const isNavigationOrAsset = event.request.mode === 'navigate' || event.request.destination === 'script' || event.request.destination === 'style'
  if (isNavigationOrAsset) {
    /* network-first for the app shell + JS/CSS so updates show up immediately;
       falls back to cache only when fully offline. */
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone()
        caches.open(CACHE).then(cache => cache.put(event.request, copy))
        return response
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match('/')))
    )
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy=response.clone()
      caches.open(CACHE).then(cache => cache.put(event.request, copy))
      return response
    }).catch(() => caches.match('/'))))
  }
})
