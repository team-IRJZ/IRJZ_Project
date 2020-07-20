import React, {Component} from 'react'
import './options.css'
import { getFirebase } from './firebaseConfig';


class Options extends Component{
  logOut() {
    getFirebase().auth().signOut();
  }
  render(){
    return(
      <div id = "container">

        <div id = "signBox2">
          <div id = "signOut">
            <h4 onClick = {this.logOut}>S I G N &nbsp; O U T</h4>
          </div>
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
