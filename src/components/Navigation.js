import { Navbar, Nav, Container } from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';


const Navigation = () => {
    return(
        <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
            <Container>
                <IndexLinkContainer to="/">
                    <Navbar.Brand>EventRite!</Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* Moves links to right side of navbar */}
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link className="ms-3">Sign Up</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;