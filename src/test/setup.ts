import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver for infinite scrolling tests
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
} as any;

// Mock fetch for API tests
global.fetch = vi.fn();