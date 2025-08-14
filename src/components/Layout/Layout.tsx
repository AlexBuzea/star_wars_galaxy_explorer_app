import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      
      {/* Background stars effect */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  );
};

export default Layout;