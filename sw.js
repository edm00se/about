importScripts('/sw-toolbox.js');

const config = {
  offlinePage: '/offline.html'
}

const IGNORED_URLS = []

config.filesToCache = [
    '/',
    '/index.html',
    'stylesheets/styles.min.css',
    'https://fonts.googleapis.com/css?family=Lato:300,300italic,700,700italic',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    '/sw-toolbox.js',
    '/manifest.json',
    config.offlinePage,
    '/images/favicon.ico',
    'https://secure.gravatar.com/avatar/397da8c5ae99b2f89a207d9beda6984d?size=160',
    '/images/tbrun1.png',
    'images/ibm_champion.png'
];

/**
 * Generates a placeholder SVG image of the given size.
 */
function offlineImage(name, width, height) {
  return `<?xml version="1.0"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" fill-rule="evenodd"><path fill="#F8BBD0" d="M0 0h${width}v${height}H0z"/></g>
  <text text-anchor="middle" x="${Math.floor(width / 2)}" y="${Math.floor(height / 2)}">image offline (${name})</text>
<style><![CDATA[
text{
  font: 48px Roboto,Verdana, Helvetica, Arial, sans-serif;
}
]]></style>
</svg>`;
}
/**
 * Returns true if the Accept header contains the given content type string.
 */
function requestAccepts(request, contentType) {
  return request.headers.get('Accept').indexOf(contentType) != -1;
}

function shouldNotCache(request) {
  return IGNORED_URLS.some(url => request.url.indexOf(url) != -1);
}

toolbox.options.debug = true;
toolbox.router.default = toolbox.networkOnly;
// cache first google fonts
toolbox.router.get('/(.+)', toolbox.cacheFirst, {origin: /https?:\/\/fonts.+/});

toolbox.precache(config.filesToCache);

// Cache the page registering the service worker. Without this, the
// "first" page the user visits is only cached on the second visit,
// since the first load is uncontrolled.
toolbox.precache(
  clients.matchAll({includeUncontrolled: true}).then(l => {
    return l.map(c => c.url);
  })
);

// Claim clients so that the very first page load is controlled by a service
// worker. (Important for responding correctly in offline state.)
self.addEventListener('activate', () => self.clients.claim());

// Make sure the SW the page we register() is the service we use.
self.addEventListener('install', () => self.skipWaiting());
