import React, {Component} from 'react'
import Options from './options'
import Categorize from './categorize'
import { getFirebase } from './firebaseConfig';

const credentials = {
    installed: {
      client_id: process.env.REACT_APP_CLIETNT_ID,
      project_id: process.env.REACT_APP_PROJECT_ID,
      auth_id: process.env.REACT_APP_AUTH_URI,
      token_uri: process.env.REACT_APP_TOKEN_URI,
      auth_provider_url: process.env.REACT_APP_AUTH_PROVIDER_URL,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uris: process.env.REACT_APP_REDIRECT_URIS
    }

  }




var user = getFirebase().auth().currentUser;
const userSide = {
  //access_token: user.accessToken,
  //refresh_token: user.refreshToken,
  //api_key: user.apiKey,
  //expiration_time: user.expirationTime
}





class UserChoice extends Component{
  constructor(){
    super();
    this.state = {c: false};
    this.click = this.click.bind(this);
  }

  loadingGmailApi(){
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    script.onload = () => {
     window.gapi.load('client', () => {
       window.gapi.client.setApiKey(user.apiKey);
       window.gapi.client.load('gmail', 'v3', () => {
         this.setState({ gapiReady: true });
       });
     });
   };
   //document.body.appendChild(script);
  }

  componentDidMount(){
    var TOKEN_PATH = "";
      getFirebase().auth().onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(idToken) {
            console.log("The user api key: ", idToken);
          });
        }
      });
    this.loadingGmailApi();


  }


  click(){
    this.setState({c: !this.state.c});
  }

  render(){
    return(
      <div onClick = {this.click} id = "container">
        {this.state.c ? <Categorize/> : <Options/>}
      </div>


    )
  }
}

export default UserChoice;
