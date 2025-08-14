import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { ResourceType, SWAPIResourceUnion } from '../../types/swapi';
import { useAppSelector } from '../../store';
import { 
  usePeople, 
  usePlanets, 
  useSpecies, 
  useStarships, 
  useVehicles, 
  useFilms 
} from '../../hooks/useSwapi';
import ResourceCard from './ResourceCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

interface ResourceListProps {
  resourceType: ResourceType;
}

const ResourceList = ({ resourceType }: ResourceListProps) => {
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);
  const activeFilters = useAppSelector((state) => state.filters.activeFilters[resourceType]);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Select the appropriate hook based on resource type
  const getResourceQuery = () => {
    switch (resourceType) {
      case 'people':
        return usePeople(searchQuery);
      case 'planets':
        return usePlanets(searchQuery);
      case 'species':
        return useSpecies(searchQuery);
      case 'starships':
        return useStarships(searchQuery);
      case 'vehicles':
        return useVehicles(searchQuery);
      case 'films':
        return useFilms(searchQuery);
      default:
        return usePeople();
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = getResourceQuery();

  // Load more when scrolling to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Filter resources based on active filters
  const filteredResults = useCallback(() => {
    if (!data?.pages) return [];

    const allResults: SWAPIResourceUnion[] = [];
    data.pages.forEach(page => {
      allResults.push(...(page.results as SWAPIResourceUnion[]));
    });
    
    if (!activeFilters || Object.keys(activeFilters).length === 0) {
      return allResults;
    }

    return allResults.filter(resource => {
      return Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;
        
        const resourceValue = (resource as any)[key];
        
        if (typeof resourceValue === 'string') {
          return resourceValue.toLowerCase().includes(String(value).toLowerCase());
        }
        
        if (Array.isArray(resourceValue)) {
          return resourceValue.some(item => 
            String(item).toLowerCase().includes(String(value).toLowerCase())
          );
        }
        
        return resourceValue === value;
      });
    });
  }, [data, activeFilters]);

  const results = filteredResults();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Searching the galaxy..." />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load resources'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-5">
        <div 
          className="card p-5"
          style={{
            backgroundColor: 'rgba(26, 26, 26, 0.5)',
            border: '1px solid var(--sw-space-600)',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)'
          }}
        >
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.25rem',
            color: 'var(--sw-yellow)',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            NO RESULTS FOUND
          </h3>
          <p style={{
            color: 'var(--sw-space-300)',
            fontFamily: "'Rajdhani', sans-serif",
            marginBottom: '0.5rem'
          }}>
            {searchQuery
              ? `No ${resourceType} found matching "${searchQuery}"`
              : `No ${resourceType} found with the current filters`
            }
          </p>
          <p style={{
            color: 'var(--sw-space-400)',
            fontSize: '0.875rem',
            fontFamily: "'Rajdhani', sans-serif",
            margin: 0
          }}>
            Try adjusting your search terms or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Results Count */}
      <div className="d-flex align-items-center justify-content-between">
        <p style={{
          color: 'var(--sw-space-300)',
          fontFamily: "'Rajdhani', sans-serif",
          margin: 0
        }}>
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </p>
        
        {activeFilters && Object.keys(activeFilters).length > 0 && (
          <span style={{
            color: 'var(--sw-yellow)',
            fontSize: '0.875rem',
            fontFamily: "'Rajdhani', sans-serif"
          }}>
            Filters applied
          </span>
        )}
      </div>

      {/* Results Grid */}
      <div className="row g-4">
        {results.map((resource: any, index: number) => (
          <div key={`${resource.url}-${index}`} className="col-12 col-md-6 col-xl-4">
            <ResourceCard
              resource={resource as SWAPIResourceUnion}
              resourceType={resourceType}
            />
          </div>
        ))}
      </div>

      {/* Load More Trigger */}
      <div ref={ref} className="py-4">
        {isFetchingNextPage && (
          <div className="d-flex justify-content-center">
            <LoadingSpinner text="Loading more..." />
          </div>
        )}
        
        {!hasNextPage && results.length > 0 && (
          <div className="text-center">
            <p style={{
              color: 'var(--sw-space-400)',
              fontFamily: "'Rajdhani', sans-serif",
              margin: 0,
              marginBottom: '4px'
            }}>
              You've reached the end of the galaxy!
            </p>
            <p style={{
              color: 'var(--sw-space-400)',
              fontSize: '0.875rem',
              fontFamily: "'Rajdhani', sans-serif",
              margin: 0
            }}>
              All {resourceType} have been loaded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;