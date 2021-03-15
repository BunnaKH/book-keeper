import React, { Fragment } from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import BookState from './context/contact/bookState';
import AuthState from './context/contact/auth/AuthState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alert from './Components/Layout/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './Components/routing/PrivateRoute';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <BookState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />

                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </BookState>
    </AuthState>

  );
}

export default App;
