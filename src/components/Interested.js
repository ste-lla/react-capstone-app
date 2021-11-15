import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Interested = () => {

    let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
   
    let displaySavedEvents = x.map((num, index) => {
        let savedEvent = JSON.parse(localStorage.getItem(`savedEvent${num}`));
        //console.log(savedEvent);

        if(savedEvent !== null) {

            let _handleRemoveEvent = (e) => {
                let savedEventId = savedEvent.id;
                localStorage.removeItem(`savedEvent${savedEventId}`);
                
                let cardBody = e.target.parentElement.parentElement.parentElement.parentElement;
                cardBody.remove();
            }

            return(
                <Col key={index} className="d-flex justify-content-center">
                    <Card id="card" style={{ width: '18rem', marginTop: '2.5em' }}>
                        <Card.Img variant="top" src={savedEvent.img} />
                        <Card.Body>
                            <Card.Title className="eventName">{savedEvent.name}</Card.Title>
                            <Card.Text>
                                {savedEvent.date}
                            </Card.Text>
                            <Card.Text>
                                <Card.Link className="" href={savedEvent.url} target="_blank">Buy Tickets</Card.Link>
                            </Card.Text>
                            <Card.Text>
                                <Button onClick={_handleRemoveEvent} variant="primary">Delete</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>  
            );
        } else {
            return('');
        }
    })
   

    return (
        <div>
            <Row className="alertUserMsg my-3 mx-auto">
                <div>Events I'm Interested in Attending</div>
            </Row>
            
            <Row>{displaySavedEvents}</Row>

        </div>
    )
}

export default Interested;