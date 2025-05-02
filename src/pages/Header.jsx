import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import logo from '../img/logo.png';
import './Header.css';

function Header({ searchQuery, setSearchQuery }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        // Skeleton background placeholder
        <div className="skeleton-header">
          <Skeleton height={70} />
        </div>
      ) : (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">
              {isLoading ? (
                <Skeleton width={120} height={40} />
              ) : (
                <img src={logo} alt="netflix-logo" className="logo" />
              )}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">Tv Shows</Nav.Link>
                <Nav.Link href="/movie">Movies</Nav.Link>
                <Nav.Link href="/">New & Popular</Nav.Link>
                <Nav.Link href="/">My List</Nav.Link>
                <Nav.Link href="/">Browse by Languages</Nav.Link>
                <Nav.Link href="/rough">Rough page</Nav.Link>
              </Nav>
              <Col md={4}>
                <div className="position-relative mb-3">
                  <FaSearch
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '10px',
                      color: '#aaa',
                      pointerEvents: 'none',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search Movies"
                    className="search-box"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: '35px' }}
                  />
                </div>
              </Col>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default Header;
