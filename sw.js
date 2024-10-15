self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                'index.html',
                'cotizacion.html',
                'css/styles.css',
                'js/scripts.js',
                'assets/icon.png' // Asegúrate de tener un ícono en la carpeta de assets
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
