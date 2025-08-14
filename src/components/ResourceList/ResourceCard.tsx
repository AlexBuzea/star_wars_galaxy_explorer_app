import { Link } from 'react-router-dom';
import { 
  User, 
  Globe, 
  Zap, 
  Rocket, 
  Car, 
  Film,
  ExternalLink,
  Calendar,
  Users,
  MapPin
} from 'lucide-react';
import { 
  ResourceType, 
  SWAPIResourceUnion, 
  Person, 
  Planet, 
  Species, 
  Starship, 
  Vehicle, 
  Film as FilmType,
  extractIdFromUrl 
} from '../../types/swapi';

interface ResourceCardProps {
  resource: SWAPIResourceUnion;
  resourceType: ResourceType;
}

const getResourceIcon = (resourceType: ResourceType) => {
  const icons = {
    people: User,
    planets: Globe,
    species: Zap,
    starships: Rocket,
    vehicles: Car,
    films: Film,
  };
  
  return icons[resourceType];
};

const getResourceName = (resource: SWAPIResourceUnion): string => {
  if ('name' in resource) return resource.name;
  if ('title' in resource) return resource.title;
  return 'Unknown';
};

const getResourceDetails = (resource: SWAPIResourceUnion, resourceType: ResourceType) => {
  switch (resourceType) {
    case 'people':
      const person = resource as Person;
      return [
        { icon: Users, label: 'Species', value: person.species?.length ? `${person.species.length} species` : 'Human' },
        { icon: Calendar, label: 'Birth Year', value: person.birth_year },
        { icon: MapPin, label: 'Gender', value: person.gender },
      ];
      
    case 'planets':
      const planet = resource as Planet;
      return [
        { icon: Users, label: 'Population', value: planet.population },
        { icon: Globe, label: 'Climate', value: planet.climate },
        { icon: MapPin, label: 'Terrain', value: planet.terrain },
      ];
      
    case 'species':
      const species = resource as Species;
      return [
        { icon: Users, label: 'Classification', value: species.classification },
        { icon: Globe, label: 'Language', value: species.language },
        { icon: Calendar, label: 'Lifespan', value: `${species.average_lifespan} years` },
      ];
      
    case 'starships':
      const starship = resource as Starship;
      return [
        { icon: Rocket, label: 'Class', value: starship.starship_class },
        { icon: Users, label: 'Crew', value: starship.crew },
        { icon: Zap, label: 'Hyperdrive', value: starship.hyperdrive_rating },
      ];
      
    case 'vehicles':
      const vehicle = resource as Vehicle;
      return [
        { icon: Car, label: 'Class', value: vehicle.vehicle_class },
        { icon: Users, label: 'Crew', value: vehicle.crew },
        { icon: Zap, label: 'Speed', value: `${vehicle.max_atmosphering_speed} km/h` },
      ];
      
    case 'films':
      const film = resource as FilmType;
      return [
        { icon: Film, label: 'Episode', value: `Episode ${film.episode_id}` },
        { icon: Calendar, label: 'Released', value: film.release_date },
        { icon: User, label: 'Director', value: film.director },
      ];
      
    default:
      return [];
  }
};

const ResourceCard = ({ resource, resourceType }: ResourceCardProps) => {
  const Icon = getResourceIcon(resourceType);
  const name = getResourceName(resource);
  const details = getResourceDetails(resource, resourceType);
  const id = extractIdFromUrl(resource.url);

  return (
    <Link
      to={`/${resourceType}/${id}`}
      className="card card-star-wars h-100 text-decoration-none card-hover position-relative"
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-4px) scale(1.02)';
        card.style.borderColor = 'rgba(255, 232, 31, 0.5)';
        
        // Icon and title color changes
        const icon = card.querySelector('.resource-icon') as HTMLElement | null;
        const title = card.querySelector('.resource-title') as HTMLElement | null;
        const linkIcon = card.querySelector('.link-icon') as HTMLElement | null;
        if (icon) icon.style.color = 'var(--sw-yellow)';
        if (title) title.style.color = 'var(--sw-yellow)';
        if (linkIcon) linkIcon.style.color = 'var(--sw-yellow)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.borderColor = 'var(--sw-space-600)';
        
        // Reset colors
        const icon = card.querySelector('.resource-icon') as HTMLElement | null;
        const title = card.querySelector('.resource-title') as HTMLElement | null;
        const linkIcon = card.querySelector('.link-icon') as HTMLElement | null;
        if (icon) icon.style.color = 'var(--sw-yellow)';
        if (title) title.style.color = 'var(--sw-space-100)';
        if (linkIcon) linkIcon.style.color = 'var(--sw-space-400)';
      }}
    >
      <div className="card-body p-4">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <Icon 
              size={24} 
              className="resource-icon me-3"
              style={{
                color: 'var(--sw-yellow)',
                transition: 'all 0.3s ease'
              }}
            />
            <h3 
              className="resource-title h5 m-0"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: '600',
                color: 'var(--sw-space-100)',
                transition: 'color 0.3s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px'
              }}
            >
              {name}
            </h3>
          </div>
          
          <ExternalLink 
            size={16} 
            className="link-icon flex-shrink-0"
            style={{
              color: 'var(--sw-space-400)',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {details.map((detail, index) => {
            const DetailIcon = detail.icon;
            
            return (
              <div key={index} className="d-flex align-items-center" style={{ fontSize: '0.875rem' }}>
                <DetailIcon 
                  size={16} 
                  className="flex-shrink-0 me-3"
                  style={{ color: 'var(--sw-space-400)' }}
                />
                <div className="flex-fill" style={{ minWidth: 0 }}>
                  <span style={{ color: 'var(--sw-space-400)' }}>{detail.label}:</span>
                  <span 
                    className="ms-2"
                    style={{
                      color: 'var(--sw-space-200)',
                      fontWeight: '500',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {detail.value === 'unknown' || detail.value === 'n/a' 
                      ? 'Unknown' 
                      : detail.value
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with creation date */}
        <div 
          className="mt-3 pt-3 d-flex justify-content-between"
          style={{
            borderTop: '1px solid var(--sw-space-700)',
            fontSize: '0.75rem',
            color: 'var(--sw-space-500)'
          }}
        >
          <span>ID: {id}</span>
          <span>
            {new Date(resource.created).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(90deg, rgba(255, 232, 31, 0.05) 0%, transparent 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          borderRadius: 'inherit'
        }}
      />
    </Link>
  );
};

export default ResourceCard;