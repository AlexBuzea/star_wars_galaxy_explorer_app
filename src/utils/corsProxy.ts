// Alternative CORS solutions for SWAPI access

export const CORS_SOLUTIONS = {
  // Option 1: Use our Vite proxy (default)
  VITE_PROXY: '/api',
  
  // Option 2: Public CORS proxy (backup)
  CORS_ANYWHERE: 'https://cors-anywhere.herokuapp.com/https://swapi.dev/api',
  
  // Option 3: Alternative CORS proxy
  ALLORIGINS: 'https://api.allorigins.win/get?url=https://swapi.dev/api',
  
  // Option 4: Direct API (works in some environments)
  DIRECT: 'https://swapi.dev/api',
};

// Test CORS solution
export async function testCorsAccess(baseUrl: string): Promise<boolean> {
  try {
    const testUrl = baseUrl.includes('allorigins') 
      ? `${baseUrl}/people/1/`
      : `${baseUrl}/people/1/`;
      
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.warn(`CORS test failed for ${baseUrl}:`, error);
    return false;
  }
}

// Get working CORS solution
export async function getWorkingCorsUrl(): Promise<string> {
  const solutions = Object.values(CORS_SOLUTIONS);
  
  for (const solution of solutions) {
    console.log(`Testing CORS solution: ${solution}`);
    
    const works = await testCorsAccess(solution);
    if (works) {
      console.log(`✅ Working CORS solution found: ${solution}`);
      return solution;
    }
  }
  
  console.warn('⚠️ No working CORS solution found, falling back to direct API');
  return CORS_SOLUTIONS.DIRECT;
}

// Handle AllOrigins response format
export function handleAllOriginsResponse(response: any) {
  if (response.contents) {
    return JSON.parse(response.contents);
  }
  return response;
}