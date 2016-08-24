function log(str) {
	console.log('[SW]', str);
}
this.addEventListener('install', event => {
	log('Service worker installed');
	
	// Add to cache a file. The file will be GETed by the sw
	event.waitUntil(caches.open('v1').then(cache => {
		return cache.addAll([
			'/',
			'style.css',
			"material.min.css",
			"material.min.js",
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
	log('Intercepted a fetch request', event.request);

	// This code responds with a cached response if the request
	// has "https://cached.com/" as url
	// ```js
	// if(event.request.url === "https://cached.com/") {
	// 	log( 'requesting a cached information');
	// 	let res = caches.match('file.json');
	// 	event.respondWith(res);
	// } else {
	// 	log( 'requesting an uncached information, fetching it');
	// 	event.respondWith(fetch(event.request));
	// }
	// ```
	event.respondWith(
		caches.match(event.request).then(resp => {
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