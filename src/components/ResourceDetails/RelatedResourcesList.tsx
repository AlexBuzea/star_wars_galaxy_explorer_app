import { Link } from 'react-router-dom';
import { LucideIcon, ExternalLink } from 'lucide-react';
import { useRelatedResource } from '../../hooks/useSwapi';
import { SWAPIResourceUnion, extractIdFromUrl, ResourceType } from '../../types/swapi';
import LoadingSpinner from '../UI/LoadingSpinner';

interface RelatedResourcesListProps {
  title: string;
  icon: LucideIcon;
  urls: string[];
  resourceType: ResourceType;
  maxDisplay?: number;
}

const RelatedResourcesList = ({ 
  title, 
  icon: Icon, 
  urls, 
  resourceType, 
  maxDisplay = 5 
}: RelatedResourcesListProps) => {
  const displayUrls = urls.slice(0, maxDisplay);
  const hasMore = urls.length > maxDisplay;

  return (
    <div 
      className="card card-star-wars p-4"
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <Icon 
            size={24} 
            style={{ color: 'var(--sw-yellow)', marginRight: '12px' }}
          />
          <h2 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--sw-space-200)',
            margin: 0
          }}>
            {title}
          </h2>
        </div>
        
        <span style={{
          color: 'var(--sw-space-400)',
          fontSize: '0.875rem'
        }}>
          {urls.length} {urls.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {displayUrls.map((url, index) => (
          <RelatedResourceItem 
            key={`${url}-${index}`} 
            url={url} 
            resourceType={resourceType} 
          />
        ))}
        
        {hasMore && (
          <div className="text-center pt-2">
            <Link
              to={`/${resourceType}`}
              className="text-decoration-none"
              style={{
                color: 'var(--sw-yellow)',
                fontSize: '0.875rem',
                fontFamily: "'Rajdhani', sans-serif",
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e6b800')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--sw-yellow)')}
            >
              View {urls.length - maxDisplay} more {title.toLowerCase()}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Individual related resource item
const RelatedResourceItem = ({ 
  url, 
  resourceType 
}: { 
  url: string; 
  resourceType: ResourceType; 
}) => {
  const { data: resource, isLoading } = useRelatedResource<SWAPIResourceUnion>(url);
  const id = extractIdFromUrl(url);

  if (isLoading) {
    return (
      <div 
        className="d-flex align-items-center justify-content-between p-3 rounded"
        style={{
          backgroundColor: 'rgba(36, 36, 36, 0.5)',
          border: '1px solid var(--sw-space-600)'
        }}
      >
        <LoadingSpinner size="sm" text="" />
        <span style={{
          color: 'var(--sw-space-400)',
          fontSize: '0.875rem'
        }}>
          Loading...
        </span>
      </div>
    );
  }

  if (!resource) {
    return (
      <div 
        className="d-flex align-items-center justify-content-between p-3 rounded"
        style={{
          backgroundColor: 'rgba(36, 36, 36, 0.5)',
          border: '1px solid var(--sw-space-600)'
        }}
      >
        <span style={{ color: 'var(--sw-space-400)' }}>
          Resource unavailable
        </span>
      </div>
    );
  }

  const name = 'name' in resource ? resource.name : 'title' in resource ? resource.title : 'Unknown';
  
  const getSubtitle = () => {
    switch (resourceType) {
      case 'films':
        return 'title' in resource ? `Episode ${resource.episode_id}` : '';
      case 'species':
        return 'classification' in resource ? resource.classification : '';
      case 'starships':
        return 'starship_class' in resource ? resource.starship_class : '';
      case 'vehicles':
        return 'vehicle_class' in resource ? resource.vehicle_class : '';
      case 'planets':
        return 'climate' in resource ? resource.climate : '';
      default:
        return '';
    }
  };

  const subtitle = getSubtitle();

  return (
    <Link
      to={`/${resourceType}/${id}`}
      className="d-flex align-items-center justify-content-between p-3 rounded text-decoration-none"
      style={{
        backgroundColor: 'rgba(36, 36, 36, 0.5)',
        border: '1px solid var(--sw-space-600)',
        transition: 'all 0.2s ease',
        color: 'inherit'
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget as HTMLElement;
        card.style.backgroundColor = 'rgba(51, 51, 51, 0.5)';
        card.style.borderColor = 'rgba(255, 232, 31, 0.3)';
        const title = card.querySelector('.resource-title') as HTMLElement | null;
        const icon = card.querySelector('.resource-icon') as HTMLElement | null;
        if (title) title.style.color = 'var(--sw-yellow)';
        if (icon) icon.style.color = 'var(--sw-yellow)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget as HTMLElement;
        card.style.backgroundColor = 'rgba(36, 36, 36, 0.5)';
        card.style.borderColor = 'var(--sw-space-600)';
        const title = card.querySelector('.resource-title') as HTMLElement | null;
        const icon = card.querySelector('.resource-icon') as HTMLElement | null;
        if (title) title.style.color = 'var(--sw-space-100)';
        if (icon) icon.style.color = 'var(--sw-space-400)';
      }}
    >
      <div className="flex-fill" style={{ minWidth: 0 }}>
        <h4 
          className="resource-title"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: '500',
            color: 'var(--sw-space-100)',
            transition: 'color 0.2s ease',
            margin: 0,
            marginBottom: subtitle ? '4px' : 0,
            fontSize: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {name}
        </h4>
        {subtitle && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--sw-space-400)',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {subtitle}
          </p>
        )}
      </div>
      
      <ExternalLink 
        size={14} 
        className="resource-icon flex-shrink-0 ms-2"
        style={{
          color: 'var(--sw-space-400)',
          transition: 'all 0.2s ease'
        }}
      />
    </Link>
  );
};

export default RelatedResourcesList;