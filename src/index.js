import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sign from './sign';
import Options from './options'
import Categorize from './categorize'
import UserChoice from './userChoice'
import { getFirebase } from './firebaseConfig';
import * as serviceWorker from './serviceWorker';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {user:null};

  }

  //this.authListener = this.authListener.bind(this);
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    getFirebase().auth().onAuthStateChanged((client) => {
      if(client){
        console.log(client);
         this.setState({client});
      }else{
        this.setState({client:null});
      }
    })
  }


  render() {
    return (
      <div>
      <div id = "title">
        <h2>CL_UNK</h2>
      </div>

        {this.state.user ? (<UserChoice/>) : (<Sign/>)}

      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));

/*ReactDOM.render(
  <React.StrictMode>
  <sign />
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
