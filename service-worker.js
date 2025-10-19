const CACHE_NAME = "bioglass-cache-v1";
const urlsToCache = [
  "/",
  "index.html",
  "logo.png",
  "manifest.json",
  "css/style.css",
  "js/main.js",
  "js/opencv.js",
  "model/yolov8n.onnx",
  "model/nms-yolov8.onnx",
  "model/yolov8n_quant.onnx"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("Caching files...");
      try {
        await cache.addAll(urlsToCache);
        console.log("All files cached successfully!");
      } catch (err) {
        console.warn("Some files failed to cache:", err);
      }
    })
  );
});

// Обработка запросов (fetch)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch((err) => {
          console.warn("Fetch failed:", err);
          return new Response("Offline mode — resource not available.", {
            status: 503,
            statusText: "Service Unavailable",
          });
        })
      );
    })
  );
});
