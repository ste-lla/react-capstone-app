import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Row from 'react-bootstrap/Row';
//import {useState} from "react";
import { Col } from 'react-bootstrap';

const Home = () => {

    let _handleSearchEvents = (e) => {
        e.preventDefault();
        //let URL = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=Chicago&classificationName=music&radius=25&unit =miles&size=3&sort=date,asc&startDateTime=2021-11-06T00:00:00Z&endDateTime=2021-11-13T00:00:00Z&apikey=OadepjXIEYGnZB6tZOtREAmuSNLyyc3e';
    
        //The Heroku URL to Use: 
        //Production: 
      /*   fetch(URL, {
          method: 'GET',
          //credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })   */ 

        fetch('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=Chicago&classificationName=music&radius=25&unit =miles&size=3&sort=date,asc&startDateTime=2021-11-06T00:00:00Z&endDateTime=2021-11-13T00:00:00Z&apikey=OadepjXIEYGnZB6tZOtREAmuSNLyyc3e')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    
    return(
        <div>
            <Form onSubmit={_handleSearchEvents}>
            <Col xs={10} sm={6} md={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Test Input</Form.Label>
                    <Form.Control type="text" name="test" placeholder="Test Input" />
                </Form.Group>
            </Col>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </div>
    )
}

export default Home;