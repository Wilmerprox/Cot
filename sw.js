self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                'index.html',
                'cotizacion.html',
                'css/styles.css',
                'js/scripts.js',
                'assets/logo.png', // Tu logo original
                'assets/icon.png',  // Nuevo icono de 192x192px
                'manifest.json', // Archivo de manifiesto
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
