import React, {Component} from 'react'
import './options.css'
import { getFirebase } from './firebaseConfig';
import Categorize from './categorize';

const Greeting = (props) => {
    return(
      <h1>W E L C O M E &nbsp;&nbsp; | &nbsp;&nbsp; {props.name}</h1>
    )
}

class Options extends Component{
  constructor(){
    super();
    this.state = {n: null, e:null, p:null, showC: false, showJ: false};
  }
  logOut() {
    getFirebase().auth().signOut();
  }

  componentDidMount(){
    var client = getFirebase().auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (client != null) {
      name = client.displayName;
      email = client.email;
      photoUrl = client.photoURL;
      emailVerified = client.emailVerified;
      uid = client.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if

    }
    this.setState({name, email, photoUrl});
    getFirebase().auth().onAuthStateChanged(function(client) {
      if (client) {
        client.getIdToken().then(function(idToken) {
          console.log(idToken);
        });
      }
    });
    console.log("This is the access token:", name);
  }


  render(){
    return(
      <div id = "container">
        <Greeting name = {this.state.name}/>
        <div id = "signOut">
          <h4 onClick = {this.logOut}>S I G N &nbsp; O U T</h4>
        </div>
        <div id = "signBox2">
          <div id = "left">
            <h3>JUNK MAILS</h3>
          </div>

          <div id = "right">

          <h3>CATEGORIZE</h3>
          </div>
        </div>

      </div>



    )
  }
}

export default Options;
