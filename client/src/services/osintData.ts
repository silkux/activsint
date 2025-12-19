
export interface OsintEvent {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  lat: number;
  lng: number;
  magnitude?: number;
  source: 'EONET' | 'GDELT' | 'MOCK';
}

const EONET_API = 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=50&days=100'; // LIMITED to recent events

export async function fetchOsintData(): Promise<OsintEvent[]> {
  try {
    const response = await fetch(EONET_API);
    if (!response.ok) {
      console.warn("EONET API failed, falling back.");
      return [];
    }
    const data = await response.json();

    const events: OsintEvent[] = data.events.flatMap((event: any) => {
      // EONET events can have multiple geometries. We'll take the latest one.
      const geometry = event.geometry?.slice(-1)[0];
      if (!geometry || geometry.type !== 'Point') return [];

      return {
        id: event.id,
        title: event.title,
        description: event.description || '',
        category: event.categories[0]?.title || 'Unknown',
        date: geometry.date,
        lat: geometry.coordinates[1],
        lng: geometry.coordinates[0],
        magnitude: event.magnitudeValue || 1, // Default magnitude
        source: 'EONET'
      };
    });

    return events;
  } catch (error) {
    console.error("Error fetching OSINT data:", error);
    // FALLBACK MOCK DATA - To ensure visuals always work
    return [
      { id: 'mock1', title: 'Climate Strike NYC', category: 'Protest', date: new Date().toISOString(), lat: 40.7128, lng: -74.0060, magnitude: 5, source: 'MOCK' },
      { id: 'mock2', title: 'Forest Fire Amazon', category: 'Wildfire', date: new Date().toISOString(), lat: -3.4653, lng: -62.2159, magnitude: 4, source: 'MOCK' },
      { id: 'mock3', title: 'Clean Water Initiative', category: 'Humanitarian', date: new Date().toISOString(), lat: 15.8700, lng: 100.9925, magnitude: 3, source: 'MOCK' },
      { id: 'mock4', title: 'Glacier Melt Observation', category: 'Scientific', date: new Date().toISOString(), lat: 64.2008, lng: -149.4937, magnitude: 2, source: 'MOCK' },
      { id: 'mock5', title: 'Solar Farm Projec', category: 'Tech', date: new Date().toISOString(), lat: 31.0461, lng: 34.8516, magnitude: 3, source: 'MOCK' }
    ];
  }
}
