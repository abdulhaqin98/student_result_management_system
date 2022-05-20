  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAG8xS5WcV7x0DoRl4xy5qg_v825PaCU2I",
    authDomain: "srms-d0991.firebaseapp.com",
    databaseURL: "https://srms-d0991.firebaseio.com",
    projectId: "srms-d0991",
    storageBucket: "srms-d0991.appspot.com",
    messagingSenderId: "688292972828",
    appId: "1:688292972828:web:037f75dbc713916fc352d9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var auth = firebase.auth();

  // update firestore settings
  // database.settings({ timestampsInSnapshots: true });

//