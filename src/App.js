import React from 'react';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Welcome from './components/Welcome/Welcome';

import Login from './components/Auth/Login';
import User from './components/User/User';
import Admin from './components/Admin/Admin'

require('dotenv').config()



function onAuthRequired({ history }) {
  history.push('/login');
}


function App() {
  return (
    <Router>
      <Security 
        issuer={process.env.REACT_APP_ISSUER}
        clientId={process.env.REACT_APP_TOKEN}
        redirectUri={window.location.origin + '/implicit/callback'}
        onAuthRequired={onAuthRequired}
        pkce={true} >
        {/* <div className="App"> */}
          <SecureRoute path="/" exact={true} component={Welcome}></SecureRoute>
          <Route path='/login' render={() => <Login baseUrl={process.env.REACT_APP_URL} />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <Route path='/user' component={User}></Route>
          <Route path='/admin' component={Admin}></Route>
        {/* </div> */}
      </Security>
    </Router>

  );
}

export default App;
