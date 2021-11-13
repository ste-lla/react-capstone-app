import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Interested = () => {
    //let x = 5;

    //let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let x = [1, 2, 3, 4, 5, 6];
    
    let displaySavedEvents = x.map((num, index) => {
        let savedEvent = JSON.parse(localStorage.getItem(`savedEvent${num}`));
        //console.log(savedEvent);
        if(savedEvent !== null) {
            return(
                <Col key={index}>
                    <Card style={{ width: '18rem', marginTop: '2.5em' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{savedEvent.name}</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>  
            );
        } else {
            return('');
        }
    })
   
    //x += 1;

    

/*  console.log(savedEvent.date);
    console.log(savedEvent.img);
    console.log(savedEvent.name);
    console.log(savedEvent.url); */

 

    return (
        <div>
            <Row className="d-flex justify-content-center mt-4">Events I'm Interested in Attending</Row>
            
            <Row>{displaySavedEvents}</Row>

        </div>
    )
}

export default Interested;