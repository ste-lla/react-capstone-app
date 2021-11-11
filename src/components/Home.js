import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { format, parseISO } from 'date-fns'
import {useState} from "react";

const Home = () => {
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState('');
    const [fieldRequired, setFieldRequired] = useState('');
    const [searchSuccess, setSearchSuccess] = useState('');
    const [loadingMsg, setLoadingMsg] = useState('');


    let _handleSearchEvents = (e) => {
        if (e.target.date.value === "none" || e.target.distance.value === "none" || e.target.location.value === "" ) {
            e.preventDefault();
            setEventData([]);
            setError('');
            setSearchSuccess('');
            setLoadingMsg('');
            setFieldRequired('Please complete all fields in the form before submitting.')

        } else {
            e.preventDefault();
            setError('');
            setFieldRequired('');
            setSearchSuccess(" ");
            setLoadingMsg(<Spinner animation="border" variant="warning" />);

            //const API_KEY = process.env.TICKETMASTER_API_KEY; //Throws CORS error when used in URL

            let location = e.target.location.value;
            let distance = e.target.distance.value;
            let date = e.target.date.value;
            
            //Splits the ISO date at the "." --> takes 1st index (contains date w/o millisec) --> add the "Z" back to the string
            const todaysDate = new Date();
            let todaysDateISO = todaysDate.toISOString().split('.')[0]+"Z";
            
            //.getDate() returns day of the month (1-31) of a date 
            //.setDate() sets the day of the month of a date object.
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            let tomorrowEndDate = currentDate.toISOString().split('.')[0]+"Z";
          
            //Sets date 2 months ahead of whatever current date is at the moment
            const futureDate = new Date(todaysDate.setMonth(todaysDate.getMonth()+2));
            let futureDateISO = futureDate.toISOString().split('T')[0];
            //console.log(todaysDate.getMonth());   //returns 1. Why not 10 ??
            
            if(date === "today") {
                let URLToday = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${location}&radius=${distance}&unit=miles&size=198&sort=date,asc&startDateTime=${todaysDateISO}&endDateTime=${tomorrowEndDate}&apikey=OadepjXIEYGnZB6tZOtREAmuSNLyyc3e`;
                fetch(URLToday)
                .then(res => res.json())
                .then((data) => {
                    setEventData(data._embedded.events);
                    setLoadingMsg('');
                    setSearchSuccess("Here's What's Happening Today...");
                    //console.log(data);
                })
                .catch(err => {
                    console.log(err);
                    setLoadingMsg('');
                    setError('You have entered an invalid City, State. Please try again')
                })
            } else {
                let URLFuture = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${location}&radius=${distance}&unit=miles&size=198&sort=date,asc&startDateTime=${todaysDateISO}&endDateTime=${futureDateISO}T23:59:59Z&apikey=OadepjXIEYGnZB6tZOtREAmuSNLyyc3e`;
                fetch(URLFuture)
                .then(res => res.json())
                .then((data) => {
                    setEventData(data._embedded.events);
                    setLoadingMsg('');
                    setSearchSuccess("Here's What's Happening Over the Next Couple of Months...");
                    //console.log(data);
                })
                .catch(err => {
                    console.log(err);
                    setLoadingMsg('');
                    setError('You have entered an invalid City, State. Please try again')
                })
            }
        }
    }


    let eventsReturned = eventData.map((theEvent, index) => {
        //Use date-fns to rtn date as --> DayOfWeek Mon Day, Year
        let dateReturned = theEvent.dates.start.localDate;
        let parsedISO = parseISO(dateReturned);
        let formattedDate = format(parsedISO, 'EEE MMM d, yyyy');
        
        //Manipulate time from military to standard and add AM/PM
        let timeReturned = `${theEvent.dates.start.localTime}`;
        let splitTime = timeReturned.split(':');
        let hour = splitTime[0];
        let minute = splitTime[1];
        let timeOfDay = ''
       
        if(hour < 12) {
            timeOfDay = "AM";
        } else if (hour === 12) {
            timeOfDay = "PM";
        } else if (hour > 12) {
            hour = hour - 12
            timeOfDay = "PM";
        }
       
        let timeOfEvent = `${hour}:${minute} ${timeOfDay}`;

        if(theEvent.dates.start.localTime === undefined) {
            timeOfEvent = 'N/A';
        }

        //console.log(theEvent.dates.start.localTime);

        
        return(
            <Col key={index}>
                <Card style={{ width: '18rem', marginTop: '2.5em' }}>
                    <Card.Img variant="top" src={theEvent.images[0].url} />
                    <Card.Body>
                        <Card.Title>{theEvent.name}</Card.Title>
                        <div>
                            {/* <div>Start Date <span style={{fontSize: "1.5em"}}>&#x0223E;</span> {theEvent.dates.start.localDate}</div> */}
                            <div>Start Date <span style={{fontSize: "1.5em"}}>&#x0223E;</span> {formattedDate}</div>
                            <div>Start Time <span style={{fontSize: "1.5em"}}>&#x0223E;</span> {timeOfEvent}</div>  
                        </div>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            <div>{theEvent._embedded.venues[0].name}</div> 
                            <div>{theEvent._embedded.venues[0].address.line1}</div> 
                            <div>{theEvent._embedded.venues[0].city.name}, {theEvent._embedded.venues[0].state.stateCode} {theEvent._embedded.venues[0].postalCode} </div> 
                        </ListGroup.Item>
                        {/* <ListGroup.Item>Lorem</ListGroup.Item> */}
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href={theEvent.url} target="_blank">Buy Tickets</Card.Link>
                        <br/>
                        <Card.Link href="#top">Back to Top of Page</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        )
})

  
    return(
        <div>

            <Form onSubmit={_handleSearchEvents}>
                <Row>
                    <Col xs={10} md={4}>
                        <Form.Group className="mt-3">
                            <Form.Control id="location" type="text" placeholder="Enter City, State i.e. Chicago, IL" />
                        </Form.Group>
                    </Col>

                    <Col xs={10} sm={5} md={3}>
                        <Form.Select defaultValue="none" id="date" className="mt-3" aria-label="Default select example">
                            <option disabled value="none">Date Range</option>
                            <option value="today">Today</option>
                            <option value="all">All Dates</option>
                        </Form.Select>
                    </Col>

                    <Col xs={10} sm={5} md={3}>
                        <Form.Select defaultValue="none" id="distance" className="mt-3" aria-label="Default select example">
                            <option disabled value="none">Distance</option>
                            <option value="10">10 mi</option>
                            <option value="25">25 mi</option>
                            <option value="50">50 mi</option>
                            <option value="100">100 mi</option>
                            <option value="4000">All mi</option>
                        </Form.Select>
                    </Col>
         
                    <Col xs={4} md="auto">
                        <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>

            <Row className="d-flex justify-content-center mt-4">
                {loadingMsg} {searchSuccess}
            </Row>

            <Row>
                {eventsReturned}
            </Row>

            <Row className="d-flex justify-content-center mt-5">
                {error}
            </Row>

            <Row className="d-flex justify-content-center mt-1">
                {fieldRequired}
            </Row>

        </div>
    )
}

export default Home;