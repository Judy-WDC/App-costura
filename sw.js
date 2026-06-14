// Service Worker per a Nuska
// No cal modificar aquest fitxer mai més.
// L'index.html sempre es descarrega fresc de la xarxa,
// així cada actualització a GitHub arriba automàticament.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  // L'index.html (navegació) → sempre de la xarxa
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // La resta de recursos → caché si hi és, si no xarxa
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
