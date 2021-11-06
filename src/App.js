import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation'; //Navbar 
import LogoutNav from './components/LogoutNav'; 
import Login from './components/Login';     
import ResetPw from './components/ResetPw';     
import Logout from './components/Logout';     
import Register from './components/Register'; 
import Terms from './components/Terms'; 
import Home from './components/Home'; 
import UserPage from './components/UserPage'; 
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="">
  
      {loggedIn ? <LogoutNav setLoggedIn={setLoggedIn} /> : <Navigation /> }

      <Switch>
          <Route exact path="/" component={Home}  />
            
          {!loggedIn ? <Route path="/login">
            <Login setLoggedIn={setLoggedIn} /> 
          </Route> : ''}

          {!loggedIn ? <Route path="/register">
            <Register />
          </Route> : ''}

         {/*  {loggedIn ? <Route path="/user" component={UserPage} /> : ''} */}

          {loggedIn ? <Route path="/user">
            <UserPage setLoggedIn={setLoggedIn} /> 
          </Route> : ''}

          {!loggedIn ? <Route path="/resetPassword" component={ResetPw} /> : ''}

          <Route path="/terms" component={Terms} />
         
         <Route path="/logout" component={Logout} />
      </Switch>

    </div>
  );
}

export default App;
