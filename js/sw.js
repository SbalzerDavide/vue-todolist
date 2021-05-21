console.log("service worker caricati");
let n = 0;
setInterval(() =>{
    n++
    console.log(n)
}, 3000);
self.addEventListener('activate', function(event) {
    console.log("activate");
});
