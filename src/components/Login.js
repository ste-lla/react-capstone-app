import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useHistory } from "react-router-dom";
import React, {useState} from "react";
import { Col } from 'react-bootstrap';


const Login = (props) => {
  const setLoggedIn = props.setLoggedIn;
  const history = useHistory();
  const [error, setError] = useState('')
  
  let _verifyLogin = (user_email, user_password) => {
    
    //The Heroku URL to Use: https://express-capstone-app.herokuapp.com/api/login
    //Production: http://localhost:3001/api/login
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user_email,
        password: user_password
      })
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      if (data.login) {             //See myNotes.js file for explanation of this line
        setLoggedIn(data.user);     //Blue word data is from .then(data) on/around line 26. .user is from the white word (user) in server.js file from res.json() I set upon a successful login
        //setLoggedIn(true); 
        //console.log(data.user.fname);
        //localStorage.setItem("userFirstName", data.user.fname);
        history.push("/user") //This redirects the user to the userPage component
    } else {
        setError(data.message);
        console.log(setLoggedIn);
      }
    })
  }

  let _handleLogin = (e) => {
    e.preventDefault();
    _verifyLogin(e.target.email.value, e.target.password.value)
  }

 /*  if(){
      return(
          <Redirect to="/user" />
      )
  } */

  return (
    <div>

        <Row className="justify-content-center">Login</Row>

        <Form onSubmit={_handleLogin}>
            <Col xs={10} sm={6} md={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Enter Email" />
                </Form.Group>
            </Col>

            <Col xs={10} sm={6} md={4}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" placeholder="Enter Password" />
                </Form.Group>
            </Col>

            <div className="mb-3"><a href="/resetPassword">Forgot Password</a></div>


            <Button variant="primary" type="submit">Login</Button>
        </Form>

        <p className="errorMsg">{error}</p>
    </div>
  );
}

export default Login;
