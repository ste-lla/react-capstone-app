import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useHistory } from "react-router-dom";


const ResetPw = () => {
    const [resetError, setResetError] = useState('');
    const [emailField, setEmailField] = useState('');
    const [pwField, setPwField] = useState('');
    const [confirmPwField, setConfirmPwField] = useState('');
    const history = useHistory();
  
    let _handleReset = (e) => {
      e.preventDefault();
      setResetError('');      //Here just for good measure to ensure state is truly set to ''
      
      setEmailField('');      //Resets email input field
      setPwField('');         //Resets pw input field
      setConfirmPwField('');  //Resets confirm_pw input field

      //The Heroku URL to Use: https://express-capstone-app.herokuapp.com/api/resetPassword
      //Production: http://localhost:3001/api/resetPassword
      fetch('http://localhost:3001/api/resetPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          confirm_pw: e.target.confirm_pw.value
        })
      })
      .then(res => res.json())
      .then((data) => {
        if (data.resetPW) {   
          setResetError(data.message);
          history.push('/login')
        } else {
          setResetError(data.message);
        }
      })
    }
  
    return (
      <div>
  
          <Row xs={10} className="justify-content-center">Reset Password</Row>
  
          <Form onSubmit={_handleReset}>   
            <Col xs={10} sm={6} md={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter the email address associated with your account</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Enter Email" value={emailField} onChange={e => setEmailField(e.target.value)} />
                </Form.Group>
            </Col>

            <Col xs={10} sm={6} md={4}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control required type="password" name="password" placeholder="Enter Password" value={pwField} onChange={e => setPwField(e.target.value)} /> 
                </Form.Group>
            </Col>

            <Col xs={10} sm={6} md={4}>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control required type="password" name="confirm_pw" placeholder="Re-enter Password" value={confirmPwField} onChange={e => setConfirmPwField(e.target.value)} />
                </Form.Group>
            </Col>
        
            <Button variant="primary" type="submit">Submit</Button>
              
          </Form>
  
          <p className="errorMsg">{resetError}</p>
          
      </div>
    )
}

export default ResetPw;