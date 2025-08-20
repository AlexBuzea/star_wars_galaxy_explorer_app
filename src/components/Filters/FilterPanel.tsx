import { Filter, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  setResourceFilter, 
  clearResourceFilters 
} from '../../store/slices/filtersSlice';
import type { ResourceType } from '../../types/swapi';

interface FilterPanelProps {
  resourceType: ResourceType;
}

// Filter options for each resource type
const filterOptions = {
  people: [
    {
      key: 'gender',
      label: 'Gender',
      options: ['male', 'female', 'n/a', 'hermaphrodite'],
    },
    {
      key: 'eye_color',
      label: 'Eye Color',
      options: ['blue', 'yellow', 'red', 'brown', 'blue-gray', 'black', 'orange', 'hazel', 'pink', 'unknown'],
    },
    {
      key: 'hair_color',
      label: 'Hair Color',
      options: ['blond', 'brown', 'black', 'auburn', 'white', 'grey', 'none', 'unknown'],
    },
  ],
  planets: [
    {
      key: 'climate',
      label: 'Climate',
      options: ['arid', 'temperate', 'tropical', 'frozen', 'murky', 'windy', 'hot', 'frigid', 'humid', 'moist', 'polluted', 'unknown'],
    },
    {
      key: 'terrain',
      label: 'Terrain',
      options: ['desert', 'grasslands', 'mountains', 'jungle', 'rainforests', 'tundra', 'swamp', 'gas giant', 'forests', 'lakes', 'grassy hills', 'cityscape', 'ocean', 'rock', 'scrublands', 'unknown'],
    },
  ],
  species: [
    {
      key: 'classification',
      label: 'Classification',
      options: ['mammal', 'artificial', 'sentient', 'reptile', 'amphibian', 'gastropod', 'unknown'],
    },
    {
      key: 'designation',
      label: 'Designation',
      options: ['sentient', 'semi-sentient', 'reptilian', 'unknown'],
    },
  ],
  starships: [
    {
      key: 'starship_class',
      label: 'Starship Class',
      options: ['Starfighter', 'Deep space mobile battlestation', 'Light freighter', 'Assault starfighter', 'Star Destroyer', 'Landing craft', 'Medium transport', 'Patrol craft', 'Armed government transport', 'Escort ship', 'Star dreadnought', 'unknown'],
    },
    {
      key: 'manufacturer',
      label: 'Manufacturer',
      options: ['Incom Corporation', 'Imperial Department of Military Research', 'Corellian Engineering Corporation', 'Koensayr Manufacturing', 'Kuat Drive Yards', 'Sienar Fleet Systems', 'Alliance Underground Engineering', 'Gallofree Yards, Inc.', 'unknown'],
    },
  ],
  vehicles: [
    {
      key: 'vehicle_class',
      label: 'Vehicle Class',
      options: ['Wheeled', 'Repulsorcraft', 'Walker', 'Airspeeder', 'Space/atmospheric assault ship', 'Assault walker', 'Armoured fighting vehicle', 'Speeder', 'Sail barge', 'unknown'],
    },
    {
      key: 'manufacturer',
      label: 'Manufacturer',
      options: ['Corellia Mining Corporation', 'Imperial Department of Military Research', 'Incom Corporation', 'Kuat Drive Yards', 'Mobquet Swoops and Speeders', 'SoroSuub Corporation', 'Ubrikkian Industries', 'unknown'],
    },
  ],
  films: [
    {
      key: 'director',
      label: 'Director',
      options: ['George Lucas', 'Irvin Kershner', 'Richard Marquand'],
    },
    {
      key: 'producer',
      label: 'Producer',
      options: ['Gary Kurtz', 'Rick McCallum'],
    },
  ],
};

const FilterPanel = ({ resourceType }: FilterPanelProps) => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector((state) => state.filters.activeFilters[resourceType] || {});
  
  const currentFilterOptions = filterOptions[resourceType] || [];
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const handleFilterChange = (filterKey: string, value: string) => {
    dispatch(setResourceFilter({
      resourceType,
      filterKey,
      filterValue: value === '' ? null : value,
    }));
  };

  const clearFilters = () => {
    dispatch(clearResourceFilters(resourceType));
  };

  return (
    <div 
      className="card card-star-wars p-4 shadow-sm"
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(4px)',
        border: '1px solid var(--sw-space-600)'
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Filter 
            size={20} 
            style={{ color: 'var(--sw-yellow)', marginRight: '8px' }}
          />
          <h3 className="h5 mb-0" style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--sw-space-200)'
          }}>
            Filters
          </h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center"
            style={{
              color: 'var(--sw-space-400)',
              borderColor: 'var(--sw-space-600)',
              background: 'transparent',
              fontSize: '0.875rem',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = 'var(--sw-yellow)';
              (e.target as HTMLElement).style.borderColor = 'var(--sw-yellow)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--sw-space-400)';
              (e.target as HTMLElement).style.borderColor = 'var(--sw-space-600)';
            }}
          >
            <X size={14} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="d-flex flex-column gap-4">
        {currentFilterOptions.map((filter) => (
          <div key={filter.key}>
            <label 
              className="form-label fw-medium"
              style={{
                fontSize: '0.875rem',
                fontFamily: "'Rajdhani', sans-serif",
                color: 'var(--sw-space-300)',
                marginBottom: '0.75rem'
              }}
            >
              {filter.label}
            </label>
            
            <select
              value={activeFilters[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="form-select"
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--sw-yellow)';
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(255, 232, 31, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--sw-space-600)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">All {filter.label.toLowerCase()}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option === 'unknown' ? 'Unknown' : 
                   option === 'n/a' ? 'N/A' : 
                   option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div 
          className="mt-4 pt-4 border-top"
          style={{ borderTopColor: 'var(--sw-space-700) !important' }}
        >
          <h4 className="h6 fw-medium" style={{
            fontSize: '0.875rem',
            fontFamily: "'Rajdhani', sans-serif",
            color: 'var(--sw-space-300)',
            marginBottom: '0.75rem'
          }}>
            Active Filters
          </h4>
          
          <div className="d-flex flex-column gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              const filterOption = currentFilterOptions.find(f => f.key === key);
              
              return (
                <div 
                  key={key}
                  className="d-flex align-items-center justify-content-between p-2 rounded"
                  style={{
                    backgroundColor: 'rgba(36, 36, 36, 0.5)',
                    borderRadius: '8px'
                  }}
                >
                  <div className="small">
                    <span style={{ color: 'var(--sw-space-400)' }}>
                      {filterOption?.label}:
                    </span>
                    <span 
                      className="ms-2 fw-medium"
                      style={{
                        color: 'var(--sw-space-200)'
                      }}
                    >
                      {value === 'unknown' ? 'Unknown' : 
                       value === 'n/a' ? 'N/A' : 
                       String(value).charAt(0).toUpperCase() + String(value).slice(1)}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="btn btn-sm btn-link p-1"
                    style={{
                      color: 'var(--sw-space-400)',
                      border: 'none',
                      background: 'none',
                      transition: 'color 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--sw-space-300)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--sw-space-400)')}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div 
        className="mt-4 pt-4 border-top"
        style={{ borderTopColor: 'var(--sw-space-700) !important' }}
      >
        <p className="small text-muted mb-0" style={{
          fontSize: '0.75rem',
          color: 'var(--sw-space-500)',
          fontFamily: "'Rajdhani', sans-serif"
        }}>
          Use filters to narrow down your search results and find exactly what you're looking for in the galaxy.
        </p>
      </div>
    </div>
  );
};

export default FilterPanel;