console.log("start service workers");

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDofNnzot9Xd5qVOjjOdVR8WveI_RwI0-o",
  authDomain: "prove-davide-sbalzer.firebaseapp.com",
  projectId: "prove-davide-sbalzer",
  storageBucket: "prove-davide-sbalzer.appspot.com",
  messagingSenderId: "537192795757",
  appId: "1:537192795757:web:c7d229b73f49d39fbc7964",
  measurementId: "G-RGL0T0BTGQ"
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

  

