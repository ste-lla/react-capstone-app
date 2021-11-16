import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useHistory } from "react-router-dom";
import React, {useState} from "react";
import { Col } from 'react-bootstrap';


const Login = (props) => {
  const setLoggedIn = props.setLoggedIn;
  const history = useHistory();
  const [error, setError] = useState('');
  

  let _verifyLogin = (user_email, user_password) => {
    
    //The Heroku URL to Use: https://express-capstone-app.herokuapp.com/api/login
    //Production: http://localhost:3001/api/login
    fetch('https://express-capstone-app.herokuapp.com/api/login', {
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
        localStorage.setItem('userName', data.user.fname);
        history.push('/user'); 
    } else {
        setError(data.message);
        //console.log(setLoggedIn);
      }
    })
  }

  let _handleLogin = (e) => {
    e.preventDefault();
    _verifyLogin(e.target.email.value, e.target.password.value)
  }

  return (
    <div>

        <Row className="justify-content-center mt-3 loginRegTitle">Login</Row>

        <Form className="m-3" onSubmit={_handleLogin}>
          <Row className="justify-content-center">
            <Col xs={10} sm={8} lg={7}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="formLabels">Email address</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Enter Email" />
                </Form.Group>
            </Col>
       
            <Col xs={10} sm={8} lg={7}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="formLabels">Password</Form.Label>
                    <Form.Control required type="password" name="password" placeholder="Enter Password" />
                </Form.Group>
            </Col>

            <Col xs={10} sm={8} lg={7}>
              <div className="mb-1"><a href="/resetPassword" className="links">Forgot Password</a></div>
            </Col>

            <Col xs={10} sm={8} lg={7}>
              <Button className="mt-3" variant="primary" type="submit">Submit</Button>
            </Col> 
          </Row>  
        </Form>

        <p className="errorMsg alertUserMsg my-0 mx-auto">{error}</p>
    </div>
  );
}

export default Login;
