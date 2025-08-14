import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { 
  SWAPIResponse, 
  SWAPIResourceUnion, 
  ResourceType, 
  extractIdFromUrl 
} from '../../types/swapi';

interface SearchResultsProps {
  title: string;
  data: any; // UseInfiniteQueryResult with different specific types
  resourceType: ResourceType;
  onClose: () => void;
}

const getResourceName = (resource: SWAPIResourceUnion): string => {
  if ('name' in resource) return resource.name;
  if ('title' in resource) return resource.title;
  return 'Unknown';
};

const SearchResults = ({ title, data, resourceType, onClose }: SearchResultsProps) => {
  const results = data.data?.pages?.[0]?.results || [];
  const hasMore = data.hasNextPage;
  const total = data.data?.pages?.[0]?.count || 0;

  if (!results.length) return null;

  const displayResults = results.slice(0, 5); // Show max 5 results per category

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Section Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ 
          fontFamily: "'Rajdhani', sans-serif", 
          fontSize: '1.125rem',
          fontWeight: '600',
          color: 'var(--sw-space-200)',
          margin: 0
        }}>
          {title}
        </h3>
        
        <div className="d-flex align-items-center" style={{ gap: '8px' }}>
          <span style={{ 
            fontSize: '0.875rem', 
            color: 'var(--sw-space-400)' 
          }}>
            {results.length} of {total}
          </span>
          
          {results.length > 5 && (
            <Link
              to={`/${resourceType}`}
              onClick={onClose}
              className="d-flex align-items-center text-decoration-none"
              style={{ 
                color: 'var(--sw-yellow)',
                fontSize: '0.875rem',
                gap: '4px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e6b800')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--sw-yellow)')}
            >
              <span>View all</span>
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {displayResults.map((resource: any, index: number) => {
          const name = getResourceName(resource);
          const id = extractIdFromUrl(resource.url);
          
          return (
            <Link
              key={`${resource.url}-${index}`}
              to={`/${resourceType}/${id}`}
              onClick={onClose}
              className="d-flex align-items-center justify-content-between p-3 text-decoration-none"
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.5)',
                border: '1px solid var(--sw-space-600)',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(36, 36, 36, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(255, 232, 31, 0.3)';
                const title = e.currentTarget.querySelector('.result-title') as HTMLElement | null;
                const arrow = e.currentTarget.querySelector('.result-arrow') as HTMLElement | null;
                if (title) title.style.color = 'var(--sw-yellow)';
                if (arrow) arrow.style.color = 'var(--sw-yellow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.5)';
                e.currentTarget.style.borderColor = 'var(--sw-space-600)';
                const title = e.currentTarget.querySelector('.result-title') as HTMLElement | null;
                const arrow = e.currentTarget.querySelector('.result-arrow') as HTMLElement | null;
                if (title) title.style.color = 'var(--sw-space-100)';
                if (arrow) arrow.style.color = 'var(--sw-space-400)';
              }}
            >
              <div className="flex-fill" style={{ minWidth: 0 }}>
                <h4 
                  className="result-title"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: '500',
                    color: 'var(--sw-space-100)',
                    transition: 'color 0.2s ease',
                    margin: 0,
                    marginBottom: '4px',
                    fontSize: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {name}
                </h4>
                
                {/* Additional info based on resource type */}
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--sw-space-400)',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {resourceType === 'people' && 'name' in resource && (
                    `Birth year: ${resource.birth_year}`
                  )}
                  {resourceType === 'planets' && 'name' in resource && (
                    `Climate: ${resource.climate}`
                  )}
                  {resourceType === 'species' && 'name' in resource && (
                    `Classification: ${resource.classification}`
                  )}
                  {resourceType === 'starships' && 'name' in resource && (
                    `Class: ${resource.starship_class}`
                  )}
                  {resourceType === 'vehicles' && 'name' in resource && (
                    `Class: ${resource.vehicle_class}`
                  )}
                  {resourceType === 'films' && 'title' in resource && (
                    `Episode ${resource.episode_id} • ${resource.release_date}`
                  )}
                </p>
              </div>
              
              <ChevronRight 
                size={16} 
                className="result-arrow flex-shrink-0"
                style={{
                  color: 'var(--sw-space-400)',
                  transition: 'all 0.2s ease',
                  marginLeft: '12px'
                }}
              />
            </Link>
          );
        })}
      </div>

      {/* Show more link if there are additional results */}
      {results.length > 5 && (
        <Link
          to={`/${resourceType}`}
          onClick={onClose}
          className="d-inline-flex align-items-center text-decoration-none mt-3"
          style={{
            color: 'var(--sw-yellow)',
            fontSize: '0.875rem',
            fontFamily: "'Rajdhani', sans-serif",
            gap: '8px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e6b800')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--sw-yellow)')}
        >
          <span>Show {results.length - 5} more {title.toLowerCase()}</span>
          <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
};

export default SearchResults;