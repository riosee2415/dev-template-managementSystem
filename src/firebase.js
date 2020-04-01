const firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDvGk7awuufvdrirqjL1jy3RHBWDUbKhy4",
  authDomain: "systemof4leaf.firebaseapp.com",
  databaseURL: "https://systemof4leaf.firebaseio.com",
  projectId: "systemof4leaf",
  storageBucket: "systemof4leaf.appspot.com",
  messagingSenderId: "128013314530",
  appId: "1:128013314530:web:80a6437ce9f22db14231bb",
  measurementId: "G-6HHMHMEL1D"
};

firebase.initializeApp(config);

const firestore = new firebase.firestore();

module.exports = firestore;
