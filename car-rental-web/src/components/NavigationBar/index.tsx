import {Container, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Car Rental</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/">View</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/create">Create</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}