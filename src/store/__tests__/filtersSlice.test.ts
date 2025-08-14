import { describe, it, expect } from 'vitest';
import filtersReducer, {
  setSearchQuery,
  setActiveResourceType,
  setResourceFilter,
  clearResourceFilters,
  clearAllFilters,
} from '../slices/filtersSlice';

describe('filtersSlice', () => {
  const initialState = {
    activeFilters: {},
    searchQuery: '',
    activeResourceType: 'people' as const,
  };

  it('should return the initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearchQuery', () => {
    const actual = filtersReducer(initialState, setSearchQuery('Luke'));
    expect(actual.searchQuery).toEqual('Luke');
  });

  it('should handle setActiveResourceType', () => {
    const actual = filtersReducer(initialState, setActiveResourceType('planets'));
    expect(actual.activeResourceType).toEqual('planets');
    expect(actual.searchQuery).toEqual(''); // Should clear search query
  });

  it('should handle setResourceFilter', () => {
    const actual = filtersReducer(
      initialState,
      setResourceFilter({
        resourceType: 'people',
        filterKey: 'gender',
        filterValue: 'male',
      })
    );
    
    expect(actual.activeFilters.people?.gender).toEqual('male');
  });

  it('should handle removing a filter when filterValue is null', () => {
    const stateWithFilter = {
      ...initialState,
      activeFilters: {
        people: { gender: 'male' },
      },
    };
    
    const actual = filtersReducer(
      stateWithFilter,
      setResourceFilter({
        resourceType: 'people',
        filterKey: 'gender',
        filterValue: null,
      })
    );
    
    expect(actual.activeFilters.people).toBeUndefined();
  });

  it('should handle clearResourceFilters', () => {
    const stateWithFilters = {
      ...initialState,
      activeFilters: {
        people: { gender: 'male' },
        planets: { climate: 'arid' },
      },
    };
    
    const actual = filtersReducer(stateWithFilters, clearResourceFilters('people'));
    
    expect(actual.activeFilters.people).toBeUndefined();
    expect(actual.activeFilters.planets).toEqual({ climate: 'arid' });
  });

  it('should handle clearAllFilters', () => {
    const stateWithFilters = {
      ...initialState,
      activeFilters: {
        people: { gender: 'male' },
        planets: { climate: 'arid' },
      },
      searchQuery: 'Luke',
    };
    
    const actual = filtersReducer(stateWithFilters, clearAllFilters());
    
    expect(actual.activeFilters).toEqual({});
    expect(actual.searchQuery).toEqual('');
  });
});