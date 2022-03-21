/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-c93b7e5';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./ladeni_002.html","./ladeni_006.html","./ladeni_007.html","./ladeni_008.html","./ladeni_009.html","./ladeni_010.html","./ladeni_011.html","./ladeni_012.html","./ladeni_013.html","./ladeni_014.html","./ladeni_015.html","./ladeni_016.html","./ladeni_017.html","./ladeni_018.html","./ladeni_019.html","./ladeni_020.html","./ladeni_021.html","./ladeni_022.html","./ladeni_023.html","./ladeni_024.html","./ladeni_025.html","./ladeni_026.html","./ladeni_027.html","./ladeni_028.html","./ladeni_029.html","./ladeni_030.html","./ladeni_031.html","./ladeni_032.html","./ladeni_033.html","./ladeni_034.html","./ladeni_035.html","./ladeni_036.html","./ladeni_037.html","./ladeni_038.html","./ladeni_039.html","./ladeni_040.html","./ladeni_041.html","./ladeni_042.html","./ladeni_043.html","./ladeni_044.html","./ladeni_045.html","./ladeni_046.html","./ladeni_047.html","./ladeni_048.html","./ladeni_049.html","./ladeni_050.html","./ladeni_051.html","./ladeni_052.html","./ladeni_053.html","./ladeni_054.html","./ladeni_055.html","./ladeni_056.html","./ladeni_057.html","./ladeni_058.html","./ladeni_059.html","./ladeni_060.html","./ladeni_061.html","./ladeni_062.html","./ladeni_063.html","./ladeni_064.html","./ladeni_065.html","./ladeni_066.html","./ladeni_067.html","./ladeni_068.html","./ladeni_069.html","./ladeni_070.html","./ladeni_071.html","./ladeni_072.html","./ladeni_073.html","./ladeni_074.html","./ladeni_075.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image003_fmt.jpeg","./resources/image004_fmt.jpeg","./resources/obalka_ladeni_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
