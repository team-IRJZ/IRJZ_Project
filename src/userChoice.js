import React, {Component} from 'react'
import Options from './options'
import Categorize from './categorize'
import { getFirebase } from './firebaseConfig';
import Async from 'react-async';

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


  // Load the API and make an API call.  Display the results on the screen.
  /*function makeApiCall() {
    gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    }).then(function(resp) {
      var p = document.createElement('p');
      var name = resp.result.names[0].givenName;
      console.log(name);
    });
  }*/


  const loadJson = () =>
    fetch("https://apis.google.com/js/api.js")
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())



class UserChoice extends Component{
  constructor(){
    super();
    this.state = {c: false};
    this.click = this.click.bind(this);
  }

  loadGmailApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    var user = getFirebase().auth().currentUser;
    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(user.apiKey)
        window.gapi.client.setClientId(process.env.REACT_APP_CLIETNT_ID)
        window.gapi.client.setDiscoveryDocs('https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest')
        window.gapi.client.setScope('https://www.googleapis.com/auth/gmail.readonly')
        window.gapi.client.load('client:auth2', 'v1', () => {
          console.log("gapi is ready")
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadGmailApi();
  }

  handleClientLoad() {
      // Load the API client and auth2 library
    //  gapi.load('client:auth2', this.initClient());
    }

/*  initClient() {
    var user = getFirebase().auth().currentUser;
      gapi.client.init({
        apiKey: user.apiKey,
        clientId: process.env.REACT_APP_CLIETNT_ID,
        discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
        scope: 'https://www.googleapis.com/auth/gmail.readonly'
      }).then(function () {

      }, function(error) {

      });
    }*/

    componentDidMount(){
      var user = getFirebase().auth().currentUser;
      this.handleClientLoad();
    }



  click(){
    this.setState({c: !this.state.c});
  }

  render(){
    return(
     <Async promiseFn={loadJson}>
      <div onClick = {this.click} id = "container">
        {this.state.c ? <Categorize/> : <Options/>}
      </div>
      </Async>


    )
  }
}

export default UserChoice;
