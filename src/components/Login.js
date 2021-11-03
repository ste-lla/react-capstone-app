import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import { useHistory } from "react-router-dom";


let Login = (props) => {
  const setLoggedIn = props.setLoggedIn;
  //const history = useHistory();

  let _verifyLogin = (user_email, user_password) => {
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
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.login === true) { //See bottom of this page for explanation of this line
        setLoggedIn(true);
        //history.push("/user")
      }
    })
  }

  let _handleLogin = (e) => {
    e.preventDefault();
    //console.log(e.target.email.value)
    //console.log(e.target.password.value)
    _verifyLogin(e.target.email.value, e.target.password.value)
  }

  return (
    <div>

      <Row className="justify-content-center">
        Login
      </Row>

      <Row>
        <Form onSubmit={_handleLogin}>
          <Form.Group className="mb-3 col-4 " controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter Email" />
          </Form.Group>

          <Form.Group className="mb-3 col-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" name="termsConditions" label="Agree to Terms and Conditions" />
          </Form.Group>

          <Button variant="primary" type="submit">Login</Button>
        </Form>
      </Row>

    </div>
  );
}

export default Login;

/* 
Explanations

    if (data.login === true)    ( on (or around) Line 26 )
        The word data is just from the .then((data)) and we console log(data)
        just to see whatever is being returned. In this case, the data being returned
        is whatever we set as the res.json() response in the server.js for the code
        that allows a user to login

        So now, .login is here bc on your server.js, inside the code that allows 
        the user to login, you see that if the login goes through, we set a 
        res.json({ login: true })

        So altogether, basically, this line of code ---> if (data.login === true)
        is just pulling from that res.json we set in the server.js as explained above

*/