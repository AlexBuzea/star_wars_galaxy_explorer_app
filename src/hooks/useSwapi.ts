import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type {
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
  Film,
  SWAPIResponse,
  ResourceType,
  SWAPIResourceUnion,
} from '../types/swapi';
import { extractIdFromUrl } from '../types/swapi';

// Multiple API endpoints for reliability
const API_ENDPOINTS = {
  // Primary: Alternative SWAPI that works better with CORS
  PRIMARY: 'https://swapi.py4e.com/api',
  
  // Fallback 1: CORS proxy for original SWAPI
  CORS_PROXY: 'https://api.allorigins.win/get?url=https://swapi.dev/api',
  
  // Fallback 2: Original SWAPI (may have CORS issues)
  ORIGINAL: 'https://swapi.dev/api',
  
  // Fallback 3: Mock data
  MOCK: 'mock',
};

let currentEndpoint = API_ENDPOINTS.PRIMARY;

// Generic fetch function with multiple fallbacks
async function fetchFromSwapi<T>(endpoint: string): Promise<T> {
  const endpoints = [
    API_ENDPOINTS.PRIMARY,
    API_ENDPOINTS.CORS_PROXY,
    API_ENDPOINTS.ORIGINAL,
  ];
  
  for (let i = 0; i < endpoints.length; i++) {
    const baseUrl = endpoints[i];
    console.log(`Trying endpoint ${i + 1}/${endpoints.length}: ${baseUrl}`);
    
    try {
      let url: string;
      let fetchOptions: RequestInit = {
        headers: {
          'Accept': 'application/json',
        },
      };
      
      if (baseUrl === API_ENDPOINTS.CORS_PROXY) {
        // AllOrigins format
        url = `${baseUrl}${endpoint}&callback=`;
      } else {
        url = `${baseUrl}${endpoint}`;
      }
      
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      let data = await response.json();
      
      // Handle AllOrigins response format
      if (baseUrl === API_ENDPOINTS.CORS_PROXY && data.contents) {
        data = JSON.parse(data.contents);
      }
      
      console.log(`✅ Successfully fetched from endpoint: ${baseUrl}`);
      currentEndpoint = baseUrl; // Remember working endpoint
      return data;
      
    } catch (error) {
      console.warn(`❌ Failed endpoint ${baseUrl}:`, error);
      
      // If this is the last endpoint, throw error
      if (i === endpoints.length - 1) {
        console.error('All API endpoints failed, falling back to mock data');
        return getMockData<T>(endpoint);
      }
    }
  }
  
  // This should never be reached, but TypeScript requires it
  throw new Error('All endpoints failed');
}

// Mock data fallback when all APIs fail
function getMockData<T>(endpoint: string): T {
  console.log('📝 Using mock data for:', endpoint);
  
  if (endpoint.includes('/people')) {
    return {
      count: 5,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.py4e.com/api/planets/1/',
          films: ['https://swapi.py4e.com/api/films/1/'],
          species: [],
          vehicles: [],
          starships: [],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.py4e.com/api/people/1/'
        },
        {
          name: 'Darth Vader',
          height: '202',
          mass: '136',
          hair_color: 'none',
          skin_color: 'white',
          eye_color: 'yellow',
          birth_year: '41.9BBY',
          gender: 'male',
          homeworld: 'https://swapi.py4e.com/api/planets/1/',
          films: ['https://swapi.py4e.com/api/films/1/'],
          species: [],
          vehicles: [],
          starships: [],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.py4e.com/api/people/4/'
        }
      ]
    } as T;
  }
  
  if (endpoint.includes('/planets')) {
    return {
      count: 3,
      next: null,
      previous: null,
      results: [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          climate: 'arid',
          gravity: '1 standard',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
          residents: ['https://swapi.py4e.com/api/people/1/'],
          films: ['https://swapi.py4e.com/api/films/1/'],
          created: '2014-12-09T13:50:49.641000Z',
          edited: '2014-12-20T20:58:18.411000Z',
          url: 'https://swapi.py4e.com/api/planets/1/'
        }
      ]
    } as T;
  }
  
  // Default fallback
  return {
    count: 0,
    next: null,
    previous: null,
    results: []
  } as T;
}

// Hook for fetching paginated resource lists with infinite scrolling
export function useInfiniteResources<T extends SWAPIResourceUnion>(
  resourceType: ResourceType,
  searchQuery?: string
) {
  return useInfiniteQuery({
    queryKey: [resourceType, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      let endpoint = `/${resourceType}/?page=${pageParam}`;
      
      if (searchQuery?.trim()) {
        endpoint += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }
      
      return fetchFromSwapi<SWAPIResponse<T>>(endpoint);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page) : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching a single resource by ID
export function useResource<T extends SWAPIResourceUnion>(
  resourceType: ResourceType,
  id: string | number
) {
  return useQuery({
    queryKey: [resourceType, id],
    queryFn: () => fetchFromSwapi<T>(`/${resourceType}/${id}/`),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Specific hooks for each resource type
export const usePeople = (searchQuery?: string) =>
  useInfiniteResources<Person>('people', searchQuery);

export const usePlanets = (searchQuery?: string) =>
  useInfiniteResources<Planet>('planets', searchQuery);

export const useSpecies = (searchQuery?: string) =>
  useInfiniteResources<Species>('species', searchQuery);

export const useStarships = (searchQuery?: string) =>
  useInfiniteResources<Starship>('starships', searchQuery);

export const useVehicles = (searchQuery?: string) =>
  useInfiniteResources<Vehicle>('vehicles', searchQuery);

export const useFilms = (searchQuery?: string) =>
  useInfiniteResources<Film>('films', searchQuery);

// Specific hooks for single resources
export const usePerson = (id: string | number) =>
  useResource<Person>('people', id);

export const usePlanet = (id: string | number) =>
  useResource<Planet>('planets', id);

export const useSpeciesDetail = (id: string | number) =>
  useResource<Species>('species', id);

export const useStarship = (id: string | number) =>
  useResource<Starship>('starships', id);

export const useVehicle = (id: string | number) =>
  useResource<Vehicle>('vehicles', id);

export const useFilm = (id: string | number) =>
  useResource<Film>('films', id);

// Hook for fetching related resources (e.g., homeworld, species)
export function useRelatedResource<T extends SWAPIResourceUnion>(url: string) {
  const id = extractIdFromUrl(url);
  const resourceType = url.split('/').filter(Boolean).slice(-2, -1)[0] as ResourceType;
  
  return useQuery({
    queryKey: ['related', resourceType, id],
    queryFn: () => {
      // Convert any SWAPI URL to use our endpoint-agnostic approach
      let endpoint = url.replace('https://swapi.dev/api', '');
      endpoint = endpoint.replace('https://swapi.py4e.com/api', '');
      if (!endpoint.startsWith('/')) {
        endpoint = '/' + endpoint;
      }
      return fetchFromSwapi<T>(endpoint);
    },
    enabled: !!url && !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook for searching across all resource types
export function useGlobalSearch(searchQuery: string) {
  const people = usePeople(searchQuery);
  const planets = usePlanets(searchQuery);
  const species = useSpecies(searchQuery);
  const starships = useStarships(searchQuery);
  const vehicles = useVehicles(searchQuery);
  const films = useFilms(searchQuery);

  return {
    people,
    planets,
    species,
    starships,
    vehicles,
    films,
    isLoading: people.isLoading || planets.isLoading || species.isLoading || 
               starships.isLoading || vehicles.isLoading || films.isLoading,
    hasResults: !!(
      people.data?.pages[0]?.results.length ||
      planets.data?.pages[0]?.results.length ||
      species.data?.pages[0]?.results.length ||
      starships.data?.pages[0]?.results.length ||
      vehicles.data?.pages[0]?.results.length ||
      films.data?.pages[0]?.results.length
    ),
  };
}