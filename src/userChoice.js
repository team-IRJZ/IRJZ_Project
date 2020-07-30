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


const userSide ={
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
    var user = getFirebase().auth().currentUser;
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
   document.body.appendChild(script);
  }



  componentDidMount(){
    var client = getFirebase().auth().currentUser;
    var TOKEN_PATH = "";
      getFirebase().auth().onAuthStateChanged(function(user) {
        if (client) {
          client.getIdToken().then(function(idToken) {
            console.log("The user api key: ", idToken);
          });
        }
      });
    this.loadingGmailApi();

    var getPageOfMessages = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.messages);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = window.gapi.client.gmail.users.messages.list({
          'userId': client.email,
          'pageToken': nextPageToken,
        });
        getPageOfMessages(request, result);
      }
    });
  };
  var initialRequest = window.gapi.client.gmail.users.messages.list({
    'client': client.email,

  });
  getPageOfMessages(initialRequest, []);

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
