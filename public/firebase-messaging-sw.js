// Firebase Cloud Messaging Service Worker

importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyAW81ZfJkTg8qDvg6-BapnFbFLMQH7gkOU",
  authDomain: "dmcc-community.firebaseapp.com",
  projectId: "dmcc-community",
  storageBucket: "dmcc-community.firebasestorage.app",
  messagingSenderId: "587053997027", 
  appId: "1:587053997027:web:e1a7aaac9bf62bb7525ed6"
});

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
