import React, {Component} from 'react'
import Options from './options'
import Categorize from './categorize'
import { getFirebase } from './firebaseConfig';




class UserChoice extends Component{
  constructor(){
    super();
    this.state = {c: false};
    this.click = this.click.bind(this);
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
