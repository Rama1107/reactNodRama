import React from 'react';
require("firebase/firestore");
require("firebase/functions");

var firebase = require ( "firebase" ); 
var firebaseConfig = {
    apiKey: "AIzaSyDUmwgzoccWY0iXS1VoLwlvOXZzMp7VprM",
    authDomain: "nodeproject-1d5eb.firebaseapp.com",
    databaseURL: "https://nodeproject-1d5eb.firebaseio.com",
    projectId: "nodeproject-1d5eb",
    storageBucket: "gs://nodeproject-1d5eb.appspot.com/",
    messagingSenderId: "980136433306",
    appId: "1:980136433306:web:c5468e99b1fa542bb13123"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const functions = firebase.functions();

export default firebase;