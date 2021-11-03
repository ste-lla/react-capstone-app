import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation'; //Navbar 
import Home from './components/Home';  
import Login from './components/Login';  
import UserPage from './components/UserPage';  
import Logout from './components/Logout';  
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

 /*  function _handleLogout() {
    setLoggedIn(false)
  } */

  return (
    <div className="">
  
      {loggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <Navigation /> }

      <Switch>
          <Route exact path="/" component={Home}  />
            
          {!loggedIn ? <Route exact path="/login">
            <Login setLoggedIn={setLoggedIn} /> 
          </Route> : ''}

          {loggedIn ? <Route exact path="/user" component={UserPage} /> : ''}

          {loggedIn ? <Redirect to="/user" /> : ''}
      </Switch>

    </div>
  );
}

export default App;
