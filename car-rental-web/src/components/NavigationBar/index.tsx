import { Container, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Car Rental</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavItem>
              <Nav.Link as={Link} to="/profile" >Profile</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={Link} to="/vehicles" >Vehicles</Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}