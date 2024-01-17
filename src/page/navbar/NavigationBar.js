import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Collapse } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = () => {
    const [isMomentsOpen, setMomentsOpen] = useState(false);

    const handleMomentsToggle = () => {
        setMomentsOpen(!isMomentsOpen);
    };

    return (
        <Navbar bg="light" expand="md" className="flex-column">
            <Navbar.Brand href="/">5D Solutions</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className={isMomentsOpen ? 'open' : ''}>
                <Nav className="mr-auto flex-column nav-pills">
                    <Nav.Link as={NavLink} to="/add-user" activeclassname="active" exact='true'>
                        Add User
                    </Nav.Link>

                    <Nav.Link
                        onClick={handleMomentsToggle}
                        aria-controls="moments-nav"
                        aria-expanded={isMomentsOpen}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <span>Moments</span>
                        {isMomentsOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
                    </Nav.Link>

                    <Collapse in={isMomentsOpen}>
                        <div id="moments-nav">
                            <Nav className="flex-column">
                                <Nav.Link as={NavLink} to="/add-moment" activeclassname="active">
                                    Add Moment
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/list-moment" activeclassname="active">
                                    List Moment
                                </Nav.Link>
                            </Nav>
                        </div>
                    </Collapse>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
