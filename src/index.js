import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sign from './sign';

import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render() {
    return (
      <div>
      <div id = "title">
        <h2>CL_UNK</h2>
      </div>

        <Sign />

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
