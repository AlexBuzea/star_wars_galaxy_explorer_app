import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { 
  Users, 
  Globe, 
  Zap, 
  Rocket, 
  Car, 
  Film,
  ArrowRight
} from 'lucide-react';
import { resourceTypeLabels } from '../types/swapi';

const heroCards = [
  {
    to: '/people',
    icon: Users,
    title: resourceTypeLabels.people,
    description: 'Explore legendary characters from across the galaxy',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
  },
  {
    to: '/planets',
    icon: Globe,
    title: resourceTypeLabels.planets,
    description: 'Discover worlds from the Core to the Outer Rim',
    gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
  },
  {
    to: '/species',
    icon: Zap,
    title: resourceTypeLabels.species,
    description: 'Learn about the diverse life forms of the universe',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
  },
  {
    to: '/starships',
    icon: Rocket,
    title: resourceTypeLabels.starships,
    description: 'Browse the most advanced vessels in the galaxy',
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(251, 146, 60, 0.1))',
  },
  {
    to: '/vehicles',
    icon: Car,
    title: resourceTypeLabels.vehicles,
    description: 'Examine ground and atmospheric transport vehicles',
    gradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.1))',
  },
  {
    to: '/films',
    icon: Film,
    title: resourceTypeLabels.films,
    description: 'Relive the epic saga through the movie chronicles',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
  },
];

const HomePage = () => {
  return (
    <Container fluid className="py-5">
      {/* Star field background */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <Container>
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="text-star-wars-lg display-2 mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              STAR WARS
            </h1>
            <h2 className="text-star-wars h2 mb-4">
              GALAXY EXPLORER
            </h2>
            <p className="lead text-muted-star-wars mx-auto" style={{ maxWidth: '600px' }}>
              Journey through the vast Star Wars universe. Explore characters, planets, species, 
              starships, vehicles, and films from a galaxy far, far away.
            </p>
          </Col>
        </Row>

        {/* Navigation Cards Grid */}
        <Row className="mb-5 g-4">
          {heroCards.map((card) => {
            const Icon = card.icon;
            
            return (
              <Col key={card.to} xs={12} md={6} lg={4}>
                <Card 
                  className="card-star-wars h-100"
                  style={{ 
                    background: `${card.gradient}, rgba(30, 41, 59, 0.8)`,
                    minHeight: '200px'
                  }}
                >
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Icon 
                        size={32} 
                        className="text-warning" 
                        style={{ color: 'var(--sw-yellow)' }}
                      />
                      <ArrowRight 
                        size={20} 
                        className="text-muted-star-wars" 
                      />
                    </div>
                    
                    <Card.Title className="text-star-wars h4 mb-3">
                      {card.title}
                    </Card.Title>
                    
                    <Card.Text className="text-muted-star-wars flex-grow-1 mb-3">
                      {card.description}
                    </Card.Text>
                    
                    <Link to={card.to} className="text-decoration-none">
                      <Button variant="outline-warning" className="btn-outline-star-wars w-100">
                        Explore {card.title}
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Quick Stats Section */}
        <Row>
          <Col>
            <Card className="card-star-wars">
              <Card.Body className="p-4">
                <h3 className="text-star-wars text-center h3 mb-4">
                  GALAXY DATABASE
                </h3>
                
                <Row className="g-3">
                  {heroCards.map((card) => {
                    const Icon = card.icon;
                    
                    return (
                      <Col key={card.to} xs={6} md={4} lg={2} className="text-center">
                        <Icon 
                          size={24} 
                          className="mb-2" 
                          style={{ color: 'var(--sw-yellow)' }}
                        />
                        <div className="small text-muted-star-wars">
                          {card.title}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer Quote */}
        <Row className="mt-5">
          <Col className="text-center">
            <blockquote className="blockquote text-muted-star-wars">
              <p className="mb-3 fs-5">"The Force will be with you. Always."</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">Obi-Wan Kenobi</cite>
              </footer>
            </blockquote>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;