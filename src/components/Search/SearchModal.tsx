import { useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useGlobalSearch } from '../../hooks/useSwapi';
import { useAppDispatch } from '../../store';
import { setSearchQuery } from '../../store/slices/filtersSlice';
import SearchResults from './SearchResults';
import LoadingSpinner from '../UI/LoadingSpinner';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

const SearchModal = ({ isOpen, onClose, searchQuery }: SearchModalProps) => {
  const dispatch = useAppDispatch();
  const { 
    people, 
    planets, 
    species, 
    starships, 
    vehicles, 
    films, 
    isLoading, 
    hasResults 
  } = useGlobalSearch(searchQuery);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
    onClose();
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1050,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content" style={{ 
          backgroundColor: 'var(--sw-space-900)', 
          border: '1px solid var(--sw-space-600)',
          borderRadius: '12px'
        }}>
          {/* Header */}
          <div className="modal-header" style={{ 
            borderBottom: '1px solid var(--sw-space-700)',
            backgroundColor: 'var(--sw-space-900)'
          }}>
            <div className="d-flex align-items-center">
              <Search size={24} style={{ color: 'var(--sw-yellow)', marginRight: '12px' }} />
              <h2 className="modal-title h5 m-0" style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                color: 'var(--sw-yellow)',
                fontWeight: 'bold'
              }}>
                GALAXY SEARCH
              </h2>
            </div>
            
            <div className="d-flex align-items-center">
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="btn btn-sm me-2"
                  style={{ 
                    color: 'var(--sw-space-400)',
                    border: 'none',
                    background: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  Clear
                </button>
              )}
              
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                style={{ 
                  filter: 'invert(1) grayscale(100%) brightness(200%)',
                  padding: '8px'
                }}
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="modal-body" style={{ 
            maxHeight: '60vh', 
            overflowY: 'auto',
            backgroundColor: 'var(--sw-space-900)'
          }}>
            {!searchQuery ? (
              <div className="text-center py-5">
                <Search size={48} style={{ color: 'var(--sw-space-600)', marginBottom: '16px' }} />
                <h3 style={{ 
                  fontFamily: "'Rajdhani', sans-serif", 
                  color: 'var(--sw-space-300)',
                  marginBottom: '8px',
                  fontSize: '1.125rem'
                }}>
                  Search the Star Wars Universe
                </h3>
                <p style={{ 
                  color: 'var(--sw-space-400)', 
                  fontSize: '0.875rem',
                  marginBottom: 0
                }}>
                  Enter a search term to find characters, planets, species, and more
                </p>
              </div>
            ) : isLoading ? (
              <div className="py-5">
                <LoadingSpinner size="lg" text="Searching across the galaxy..." />
              </div>
            ) : !hasResults ? (
              <div className="text-center py-5">
                <div 
                  className="card p-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.5)',
                    border: '1px solid var(--sw-space-600)',
                    borderRadius: '12px'
                  }}
                >
                  <h3 style={{ 
                    fontFamily: "'Orbitron', sans-serif", 
                    color: 'var(--sw-yellow)',
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}>
                    NO RESULTS FOUND
                  </h3>
                  <p style={{ 
                    color: 'var(--sw-space-300)',
                    fontFamily: "'Rajdhani', sans-serif",
                    marginBottom: '8px'
                  }}>
                    No results found for "{searchQuery}"
                  </p>
                  <p style={{ 
                    color: 'var(--sw-space-400)', 
                    fontSize: '0.875rem',
                    marginBottom: 0
                  }}>
                    Try searching for character names, planet names, or other Star Wars terms
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <SearchResults 
                  title="Characters" 
                  data={people} 
                  resourceType="people"
                  onClose={onClose}
                />
                <SearchResults 
                  title="Planets" 
                  data={planets} 
                  resourceType="planets"
                  onClose={onClose}
                />
                <SearchResults 
                  title="Species" 
                  data={species} 
                  resourceType="species"
                  onClose={onClose}
                />
                <SearchResults 
                  title="Starships" 
                  data={starships} 
                  resourceType="starships"
                  onClose={onClose}
                />
                <SearchResults 
                  title="Vehicles" 
                  data={vehicles} 
                  resourceType="vehicles"
                  onClose={onClose}
                />
                <SearchResults 
                  title="Films" 
                  data={films} 
                  resourceType="films"
                  onClose={onClose}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;