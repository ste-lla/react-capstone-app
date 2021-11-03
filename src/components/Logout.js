import { Navbar, Nav, Container } from 'react-bootstrap';
import {IndexLinkContainer} from 'react-router-bootstrap';

const Navigation = (props) => {
    //const setLoggedIn = props.setLoggedIn;

    function _handleLogout() {
        props.setLoggedIn(false)
    } 

    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <IndexLinkContainer to="/">
                    <Navbar.Brand>Entertain Me</Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* Moves links to right side of navbar */}
                        <IndexLinkContainer to="/">
                            <Nav.Link onClick={_handleLogout}>Logout</Nav.Link>
                        </IndexLinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;