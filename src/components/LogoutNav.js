import { Navbar, Nav, Container } from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

const Navigation = (props) => {

    function _handleLogout() {
        props.setLoggedIn(false);
        localStorage.removeItem('userName');
    } 

    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <IndexLinkContainer to="/">
                    <Navbar.Brand>EventRite!</Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* Moves links to right side of navbar */}
                        <Navbar.Text>
                            Hello, {localStorage.getItem('userName')}!
                        </Navbar.Text>
                        <LinkContainer to="/user" className="ms-3">
                            <Nav.Link>My Profile Page</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/interested" className="ms-3">
                            <Nav.Link>'Interested' List</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/logout" className="ms-3">
                            <Nav.Link onClick={_handleLogout}>Logout</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;