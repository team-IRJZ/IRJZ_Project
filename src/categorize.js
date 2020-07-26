import React, {Component} from 'react'
import './categorize.css'
import './options.css'
import { getFirebase } from './firebaseConfig';

const Greeting = (props) => {
    return(
      <h1>W E L C O M E &nbsp;&nbsp; | &nbsp;&nbsp; {props.name}</h1>
    )
}

class Categorize extends Component{
  constructor(){
    super();
    this.state = {n: null, e:null, p:null};
  }
  logOut() {
    getFirebase().auth().signOut();
  }

  componentDidMount(){
    var user = getFirebase().auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if

    }
    this.setState({name, email, photoUrl});
    console.log("This is the name:", name);
  }
  render(){
    return(
      <div id = "container">
      <Greeting name = {this.state.name}/>
      <div id = "signOut">
        <h4 onClick = {this.logOut}>S I G N &nbsp; O U T</h4>
      </div>
        <div id = "signBox3">


          </div>


      </div>



    )
  }
}


export default Categorize
