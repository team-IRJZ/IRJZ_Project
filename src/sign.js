import React, {Component} from 'react'
import './sign.css';
import { getFirebase } from './firebaseConfig';
import firebase from "firebase"

const sig = () => {
  getFirebase();

  var provider = new firebase.auth.GoogleAuthProvider();
  getFirebase().auth().signInWithPopup(provider).then(function(result){
    console.log(result);
  })


  /*firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    var a = firebase.auth();
    a.signInWithCredential(result.credential)
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});*/
}

class Sign extends Component{

  render(){
    return(
      <div className = "container">
      <div id = "signBox">
        <h2 id = "message">H E L L O, &nbsp;L O G I N</h2>


        <div id = "btn">
          <img onClick = {sig} id = "b" src = "/g.png" alt = "hi"/>
        </div>

      </div>
      </div>


    )
  }

}


export default Sign;
