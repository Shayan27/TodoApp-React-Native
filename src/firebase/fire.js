import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdbWcodrG73QbpzW-ao3MPrQyCj5B2Tvw",
    authDomain: "todoapp-26777.firebaseapp.com",
    databaseURL: "https://todoapp-26777.firebaseio.com",
    projectId: "todoapp-26777",
    storageBucket: "todoapp-26777.appspot.com",
    messagingSenderId: "390125381199"
  };
  
  const firebaseApp = firebase.initializeApp(config);

  export default firebaseApp ;