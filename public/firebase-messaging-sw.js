importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDYpBkB0nj2QAXdkvQQ5lXytn1XOBtk_3U",
    authDomain: "sam-tv-ebd2b.firebaseapp.com",
    projectId: "sam-tv-ebd2b",
    storageBucket: "sam-tv-ebd2b.appspot.com",
    messagingSenderId: "300037909449",
    appId: "1:300037909449:web:91e9afd2d7330471911618",
    measurementId: "G-L38Q39G37D"
  };




firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()