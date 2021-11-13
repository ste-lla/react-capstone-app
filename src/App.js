import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation'; //Navbar 
import LogoutNav from './components/LogoutNav'; 
import Login from './components/Login';     
import Logout from './components/Logout';     
import Register from './components/Register'; 
import Home from './components/Home'; 
import UserPage from './components/UserPage'; 
import Interested from './components/Interested'; 
import { useState } from 'react';
import ResetPw from './components/ResetPw';     
//import Terms from './components/Terms'; 

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

          
          {!loggedIn ? <Route path="/register" component={Register} /> : ''}
          {/* {!loggedIn ? <Route path="/register">
            <Register />
          </Route> : ''} */}


          {loggedIn ? <Route path="/user" component={UserPage} /> : ''}
          {/* {loggedIn ? <Route path="/user">
            <UserPage /> 
          </Route> : ''} */}


          {loggedIn ? <Route path="/interested" component={Interested} /> : ''}
          {/* {loggedIn ? <Route path="/interested">
            <Interested />
          </Route> : ''} */}


          <Route path="/resetPassword" component={ResetPw} />

          {/* <Route path="/terms" component={Terms} /> */}
         
         <Route path="/logout" component={Logout} />
      </Switch>

    </div>
  );
}

export default App;
