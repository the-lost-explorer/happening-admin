//Firebase authentication
var serviceAccount = require("./../project-keys/serviceAccountKey.json");
const admin = require('firebase-admin');
const firebase = require('firebase');
var config = {
    apiKey: "process.env.HAPPENING_API_KEY", // process.env.HAPPENING_API_KEY, //Add "HAPPENING_API_KEY" to environment variables.
    authDomain: "happening-semicolon-labs.firebaseapp.com",
    databaseURL: "https://happening-semicolon-labs.firebaseio.com",
    projectId: "happening-semicolon-labs",
    storageBucket: "happening-semicolon-labs.appspot.com",
    messagingSenderId: "110374457782"
  };

//Initialize Firebase Client and Admin SDK
firebase.initializeApp(config);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://happening-semicolon-labs.firebaseio.com"
  });

//Signup function
exports.createUser = function(res, email, password){
    //Create user
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        console.log("User created!");
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
                //Get current signed in user
                var user = firebase.auth().currentUser;
                var uid;
                if (user != null){
                uid = user.uid; 
                }else{
                    console.log("User not found!");
                }

                //Set admin role
                admin.auth().setCustomUserClaims(uid, {admin: true})
                .then(()=>{

                    //Get idToken of current user
                    firebase.auth().currentUser.getIdToken(true).then(function(idToken){
                        admin.auth().verifyIdToken(idToken).then((claims) => {
                            if (claims.admin === true) {
                                res.status(200).send("User created with admin permissions!");
                            }
                          })
                        .catch(()=>{
                            res.status(403).send("User denied admin permissions!");
                        });    
                    })
                    .catch(function(error) {
                        res.status(403).send("User denied admin permissions!");
                    });
                })
                .catch(function(){
                    res.status(403).send("User denied admin permission!");
                });
        })
        .catch(function(error){
            res.status(403).send("Email/Password Invalid!");
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    })
    .catch(function(error){
        res.status(403).send("There already exists an account with this email address!");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

//Login
exports.login = function(res, email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        res.status(200).send("Successfully logged in.");
    })
    .catch(function(){
        res.status(403).send("Failed to login. Email or Password might be incorrect.")
    });
}

//Logout
exports.logout = function(res,username){
    firebase.auth().signOut().then(function() {
        res.status(200).send("Logged out!");
      }, function(error) {
        res.status(403).send("Error logging out! Try again!");
      });
}