const CACHE="ppx-80adc188a4";
const FILES=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable.png", "apple-touch-icon.png"];
const SCENES=["scenes/autumn-1.webp", "scenes/autumn-2.webp", "scenes/autumn-3.webp", "scenes/autumn-4.webp", "scenes/autumn-5.webp", "scenes/christmas-1.webp", "scenes/christmas-2.webp", "scenes/christmas-3.webp", "scenes/christmas-4.webp", "scenes/christmas-5.webp", "scenes/easter-1.webp", "scenes/easter-2.webp", "scenes/easter-3.webp", "scenes/easter-4.webp", "scenes/easter-5.webp", "scenes/spring-1.webp", "scenes/spring-2.webp", "scenes/spring-3.webp", "scenes/spring-4.webp", "scenes/spring-5.webp", "scenes/summer-1.webp", "scenes/summer-2.webp", "scenes/summer-3.webp", "scenes/summer-4.webp", "scenes/summer-5.webp", "scenes/valentine-1.webp", "scenes/valentine-2.webp", "scenes/valentine-3.webp", "scenes/valentine-4.webp", "scenes/valentine-5.webp", "scenes/winter-1.webp", "scenes/winter-2.webp", "scenes/winter-3.webp", "scenes/winter-4.webp", "scenes/winter-5.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).then(()=>Promise.all(SCENES.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x.indexOf("ppx-")===0).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin&&u.pathname.indexOf("/scenes/")>-1){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return n;})));
    return;
  }
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));
});
