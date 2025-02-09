import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const GuideDashboard = () => {
  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        padding: "10px 20px",
      }}
    >
      <Navbar.Brand href="#" style={{ fontWeight: "bold" }}>Guide Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown title="Profile" id="profile-dropdown">
            <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GuideDashboard;
