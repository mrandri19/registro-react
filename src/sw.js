function log(str) {
	console.log('[SW]', str);
}
this.addEventListener('install', event => {
	log('Service worker installed');
	
	// Add to cache a file. The file will be GETed by the sw
	event.waitUntil(caches.open('v1').then(cache => {
		return cache.addAll([
			'index.html',
			'bundle.js',
			'style.css',
			"material.min.css",
			"material.min.js",
			'react-dom.min.js',
			'react.min.js'
		]);
	}));

	// This will skip the waiting for the other service workers to close
	// and jump directly to the activation stage
	// this.skipWaiting();
});

this.addEventListener('activate', event => {
	// When a sw is upgraded the activate event is fired,
	// we can then claim the other clients which are still controlled
	// by the other workers
	log('SW is now active');
});

this.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(resp => {
			if (event.request.url === "http://localhost:8080/login") {
				return caches.match("http://localhost:8080/");
			}
			return resp || fetch(event.request)
				.then(r => {
					log(event.request.url);
					log('wasn\'t found in the cache so thus fetched');
					return r;
				})
				.catch(e => {
					log('Error:', e);
				});
		})
	);
});