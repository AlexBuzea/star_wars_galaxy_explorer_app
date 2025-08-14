import { describe, it, expect } from 'vitest';
import { extractIdFromUrl, resourceTypeLabels } from '../swapi';

describe('SWAPI utilities', () => {
  describe('extractIdFromUrl', () => {
    it('extracts ID from valid SWAPI URL', () => {
      const url = 'https://swapi.dev/api/people/1/';
      expect(extractIdFromUrl(url)).toBe('1');
    });

    it('extracts ID from different resource types', () => {
      expect(extractIdFromUrl('https://swapi.dev/api/planets/2/')).toBe('2');
      expect(extractIdFromUrl('https://swapi.dev/api/starships/10/')).toBe('10');
      expect(extractIdFromUrl('https://swapi.dev/api/vehicles/14/')).toBe('14');
    });

    it('returns empty string for invalid URL', () => {
      expect(extractIdFromUrl('invalid-url')).toBe('');
      expect(extractIdFromUrl('https://swapi.dev/api/people/')).toBe('');
    });
  });

  describe('resourceTypeLabels', () => {
    it('contains all expected resource types', () => {
      expect(resourceTypeLabels.people).toBe('Characters');
      expect(resourceTypeLabels.planets).toBe('Planets');
      expect(resourceTypeLabels.species).toBe('Species');
      expect(resourceTypeLabels.starships).toBe('Starships');
      expect(resourceTypeLabels.vehicles).toBe('Vehicles');
      expect(resourceTypeLabels.films).toBe('Films');
    });
  });
});