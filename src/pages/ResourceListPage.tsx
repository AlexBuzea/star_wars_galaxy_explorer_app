import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { setActiveResourceType } from '../store/slices/filtersSlice';
import { ResourceType, resourceTypeLabels } from '../types/swapi';
import ResourceList from '../components/ResourceList/ResourceList';
import FilterPanel from '../components/Filters/FilterPanel';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

interface ResourceListPageProps {
  resourceType: ResourceType;
}

const ResourceListPage = ({ resourceType }: ResourceListPageProps) => {
  const dispatch = useAppDispatch();
  const activeResourceType = useAppSelector((state) => state.filters.activeResourceType);
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);

  useEffect(() => {
    if (activeResourceType !== resourceType) {
      dispatch(setActiveResourceType(resourceType));
    }
  }, [resourceType, activeResourceType, dispatch]);

  return (
    <div className="position-relative" style={{ zIndex: 10 }}>
      {/* Page Header */}
      <div className="mb-5">
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          color: 'var(--sw-yellow)',
          marginBottom: '1.5rem'
        }}>
          {resourceTypeLabels[resourceType]}
        </h1>
        
        {searchQuery && (
          <div 
            className="card p-3"
            style={{
              backgroundColor: 'rgba(26, 26, 26, 0.5)',
              border: '1px solid var(--sw-space-600)',
              borderRadius: '8px',
              backdropFilter: 'blur(4px)'
            }}
          >
            <p style={{
              color: 'var(--sw-space-300)',
              fontFamily: "'Rajdhani', sans-serif",
              margin: 0
            }}>
              Search results for: <span style={{
                color: 'var(--sw-yellow)',
                fontWeight: '600'
              }}>"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      <div className="row g-4">
        {/* Filters Sidebar */}
        <div className="col-12 col-lg-3">
          <FilterPanel resourceType={resourceType} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-lg-9">
          <ResourceList resourceType={resourceType} />
        </div>
      </div>
    </div>
  );
};

export default ResourceListPage;