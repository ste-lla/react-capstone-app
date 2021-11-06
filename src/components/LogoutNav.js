import { Navbar, Nav, Container } from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

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
                        <LinkContainer to="/user">
                            <Nav.Link>My Profile Page</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/logout">
                            <Nav.Link onClick={_handleLogout}>Logout</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;