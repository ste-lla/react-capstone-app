import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const history = useHistory();

  let _handleRegister = (e) => {
    e.preventDefault();
    setRegisterError(''); //Here just for good measure to ensure state is truly set to ''

    //The Heroku URL to Use: https://express-capstone-app.herokuapp.com/api/register
    //Production: http://localhost:3001/api/register
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: e.target.fname.value,
        lastName: e.target.lname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirm_pw: e.target.confirm_pw.value
      })
    })
    .then(res => res.json())
    .then((data) => {
      if (data.registered) {   
        setRegisterError(data.message);
        history.push("/login");
      } else {
        setRegisterError(data.message);
      }
    })
  }

  return (
    <div>

        <Row xs={10} className="justify-content-center">Registration</Row>

        <Form onSubmit={_handleRegister}>
            <Row>
                <Col xs={10} sm={6} md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" name="fname" placeholder="First Name" />
                    </Form.Group>
                </Col>

                <Col xs={10} sm={6} md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" name="lname" placeholder="Last Name" />
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <Col xs={10} sm={6} md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="Enter Email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Col>

                <Col xs={10} sm={6} md={4}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="Enter Password" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={10} sm={6} md={4}>
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" name="confirm_pw" placeholder="Re-enter Password" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                <Form.Check required className="me-2" type="checkbox" name="termsConditions" />
                <Form.Label>Agree to <a href="/terms" target="_blank">Terms and Conditions</a></Form.Label>
            </Form.Group>

            <Button variant="primary" type="submit">Register!</Button>
            
        </Form>

        <p className="errorMsg">{registerError}</p>
        
    </div>
  )
}

export default Register;