// Base interface for all SWAPI resources
export interface SWAPIResource {
  url: string;
  created: string;
  edited: string;
}

// Generic response interface for paginated results
export interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// People (Characters)
export interface Person extends SWAPIResource {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

// Planets
export interface Planet extends SWAPIResource {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
}

// Species
export interface Species extends SWAPIResource {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
}

// Starships
export interface Starship extends SWAPIResource {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
}

// Vehicles
export interface Vehicle extends SWAPIResource {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
}

// Films
export interface Film extends SWAPIResource {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

// Resource types for routing and navigation
export type ResourceType = 'people' | 'planets' | 'species' | 'starships' | 'vehicles' | 'films';

// Union type for all SWAPI resources
export type SWAPIResourceUnion = Person | Planet | Species | Starship | Vehicle | Film;

// Extract ID from SWAPI URL
export const extractIdFromUrl = (url: string): string => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '';
};

// Resource type mapping for display
export const resourceTypeLabels: Record<ResourceType, string> = {
  people: 'Characters',
  planets: 'Planets',
  species: 'Species',
  starships: 'Starships',
  vehicles: 'Vehicles',
  films: 'Films',
};

// Filter options for each resource type
export interface FilterOptions {
  people: {
    gender?: string;
    species?: string;
    homeworld?: string;
  };
  planets: {
    climate?: string;
    terrain?: string;
    population?: string;
  };
  species: {
    classification?: string;
    designation?: string;
    language?: string;
  };
  starships: {
    starship_class?: string;
    manufacturer?: string;
  };
  vehicles: {
    vehicle_class?: string;
    manufacturer?: string;
  };
  films: {
    director?: string;
    producer?: string;
  };
}