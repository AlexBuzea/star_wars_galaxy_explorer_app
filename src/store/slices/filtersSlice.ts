import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ResourceType } from '../../types/swapi';

interface FiltersState {
  activeFilters: Partial<Record<ResourceType, any>>;
  searchQuery: string;
  activeResourceType: ResourceType;
}

const initialState: FiltersState = {
  activeFilters: {},
  searchQuery: '',
  activeResourceType: 'people',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveResourceType: (state, action: PayloadAction<ResourceType>) => {
      state.activeResourceType = action.payload;
      // Clear search query when switching resource types
      state.searchQuery = '';
    },
    setResourceFilter: (
      state,
      action: PayloadAction<{
        resourceType: ResourceType;
        filterKey: string;
        filterValue: string | null;
      }>
    ) => {
      const { resourceType, filterKey, filterValue } = action.payload;
      
      if (!state.activeFilters[resourceType]) {
        state.activeFilters[resourceType] = {};
      }
      
      if (filterValue === null || filterValue === '') {
        delete state.activeFilters[resourceType][filterKey];
        
        // Clean up empty filter objects
        if (Object.keys(state.activeFilters[resourceType]).length === 0) {
          delete state.activeFilters[resourceType];
        }
      } else {
        state.activeFilters[resourceType][filterKey] = filterValue;
      }
    },
    clearResourceFilters: (state, action: PayloadAction<ResourceType>) => {
      delete state.activeFilters[action.payload];
    },
    clearAllFilters: (state) => {
      state.activeFilters = {};
      state.searchQuery = '';
    },
  },
});

export const {
  setSearchQuery,
  setActiveResourceType,
  setResourceFilter,
  clearResourceFilters,
  clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;