import React from 'react';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Welcome from './components/Welcome/Welcome';

import Login from './components/Auth/Login';
import User from './components/User/User';
import Admin from './components/Admin/Admin'


function onAuthRequired({ history }) {
  history.push('/login');
}


function App() {
  return (
    <Router basename={window.location.pathname || ''}>
      <Security Security issuer='https://dev-421319.okta.com/oauth2/default'
        clientId='0oa2de4uv9SXNxF4Z4x6'
        redirectUri={window.location.origin + '/implicit/callback'}
        onAuthRequired={onAuthRequired}
        pkce={true} >
        {/* <div className="App"> */}
          <SecureRoute basename="/" exact={true} component={Welcome}></SecureRoute>
          <Route basename='/login' render={() => <Login baseUrl='https://dev-421319.okta.com' />} />
          <Route basename='/implicit/callback' component={ImplicitCallback} />
          <Route basename='/user' component={User}></Route>
          <Route basename='/admin' component={Admin}></Route>
        {/* </div> */}
      </Security>
    </Router>

  );
}

export default App;
