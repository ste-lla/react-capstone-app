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
      fetch('https://express-capstone-app.herokuapp.com/api/resetPassword', {
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
  
          <Row xs={10} className="justify-content-center mt-3 resetPwTitle">Reset Password</Row>
  
          <Form className="m-3" onSubmit={_handleReset}>
            <Row className="justify-content-center"> 
              <Col xs={10} sm={8} lg={7}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="formLabels">Enter the email address associated with your account</Form.Label>
                      <Form.Control required type="email" name="email" placeholder="Enter Email" value={emailField} onChange={e => setEmailField(e.target.value)} />
                  </Form.Group>
              </Col>

              <Col xs={10} sm={8} lg={7}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="formLabels">New Password</Form.Label>
                      <Form.Control required type="password" name="password" placeholder="Enter Password" value={pwField} onChange={e => setPwField(e.target.value)} /> 
                  </Form.Group>
              </Col>

              <Col xs={10} sm={8} lg={7}>
                  <Form.Group className="mb-3" controlId="formBasicPassword2">
                      <Form.Label className="formLabels">Confirm New Password</Form.Label>
                      <Form.Control required type="password" name="confirm_pw" placeholder="Re-enter Password" value={confirmPwField} onChange={e => setConfirmPwField(e.target.value)} />
                  </Form.Group>
              </Col>

              <Col xs={10} sm={8} lg={7}>
                <Button variant="primary" type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
  
          <p className="errorMsg alertUserMsg my-0 mx-auto">{resetError}</p>
          
      </div>
    )
}

export default ResetPw;