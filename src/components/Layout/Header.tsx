import { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setSearchQuery } from '../../store/slices/filtersSlice';
import { resourceTypeLabels } from '../../types/swapi';

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
    }
  };

  const navigationItems = [
    { to: '/', label: 'Home' },
    { to: '/people', label: resourceTypeLabels.people },
    { to: '/planets', label: resourceTypeLabels.planets },
    { to: '/species', label: resourceTypeLabels.species },
    { to: '/starships', label: resourceTypeLabels.starships },
    { to: '/vehicles', label: resourceTypeLabels.vehicles },
    { to: '/films', label: resourceTypeLabels.films },
  ];

  return (
    <>
      <Navbar expand="lg" className="navbar-star-wars fixed-top" style={{ zIndex: 1020 }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            ⭐ STAR WARS EXPLORER
          </Navbar.Brand>
          
          <div className="d-flex align-items-center">
            {/* Search Form - Desktop */}
            <Form className="d-none d-md-flex me-3" onSubmit={handleSearch}>
              <div className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search the galaxy..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="form-control-star-wars me-2"
                  style={{ width: '250px' }}
                />
                <Button 
                  type="submit" 
                  variant="outline-warning" 
                  className="btn-outline-star-wars"
                >
                  <Search size={16} />
                </Button>
              </div>
            </Form>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline-warning"
              className="btn-outline-star-wars d-lg-none"
              onClick={() => setShowOffcanvas(true)}
              aria-label="Toggle navigation"
            >
              <Menu size={20} />
            </Button>

            {/* Desktop Navigation */}
            <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-block">
              <Nav className="ms-auto">
                {navigationItems.map((item) => (
                  <Nav.Link
                    key={item.to}
                    as={Link}
                    to={item.to}
                    className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                  >
                    {item.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Navigation */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)} 
        placement="end"
        style={{ backgroundColor: 'var(--space-dark)', color: '#F8FAFC' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-star-wars">
            Navigation
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Mobile Search */}
          <Form className="mb-4" onSubmit={handleSearch}>
            <div className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search the galaxy..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-control-star-wars me-2"
              />
              <Button 
                type="submit" 
                variant="outline-warning" 
                className="btn-outline-star-wars"
              >
                <Search size={16} />
              </Button>
            </div>
          </Form>

          {/* Mobile Navigation Links */}
          <Nav className="flex-column">
            {navigationItems.map((item) => (
              <Nav.Link
                key={item.to}
                as={Link}
                to={item.to}
                className={`nav-link mb-2 ${location.pathname === item.to ? 'active' : ''}`}
                onClick={() => setShowOffcanvas(false)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Footer */}
          <div className="mt-auto pt-4 text-center">
            <small className="text-muted-star-wars">
              May the Force be with you
            </small>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;