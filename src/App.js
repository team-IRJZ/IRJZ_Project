import React from 'react';
import { getUsers } from './FirebaseService';
import { getUsersFromAxios } from './AxiosService';
import './App.css';

const getUsersFromFirebaseService = () => {
    getUsers().then(users =>{
        console.log('Users from SDK:\n', users);
    });
}

const getUsersFromAxiosService = () => {
    getUsersFromAxios().then(users => {
        console.log('Users from Axios:\n', users);
    });
};

function App() {
  return(
      <div className="App">
        <header className="button-header">
            <button onClick={getUsersFromFirebaseService}>
                Get users using SDK
            </button>
            <button onClick={getUsersFromAxiosService}>
                Get users using Axios
            </button>
        </header>
      </div>
  );
}

export default App;
