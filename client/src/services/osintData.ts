
export interface OsintEvent {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  lat: number;
  lng: number;
  magnitude?: number;
  source: 'EONET' | 'GDELT' | 'MOCK' | 'NASA EONET' | 'News Feed';
}

const EONET_API = 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=50&days=100'; // Limit to avoid over-fetching
const RSS_PROXY = '/api/rss';

const NEWS_FEEDS = [
  // Google News: Animal Rights
  'https://news.google.com/rss/search?q=animal+rights+activism&hl=en-US&gl=US&ceid=US:en',
  // The Guardian: Animal Welfare
  'https://www.theguardian.com/world/animal-welfare/rss',
];

export async function fetchOsintData(): Promise<OsintEvent[]> {
  try {
    console.log("Fetching NASA EONET Data...");
    const [eonetResponse, newsEvents] = await Promise.allSettled([
      fetch(EONET_API),
      fetchNewsData()
    ]);

    let events: OsintEvent[] = [];

    // Process EONET Data
    if (eonetResponse.status === 'fulfilled' && eonetResponse.value.ok) {
      const data = await eonetResponse.value.json();
      const nasaEvents = data.events.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description || `Detected by ${event.sources?.[0]?.id || 'Satellite Scans'}`,
        category: event.categories[0]?.title || 'Unclassified Event',
        date: event.geometry[0].date,
        lat: event.geometry[0].coordinates[1],
        lng: event.geometry[0].coordinates[0],
        magnitude: 3, // Default magnitude for visuals
        source: 'NASA EONET'
      }));
      events = [...events, ...nasaEvents];
    }

    // Process News Data
    if (newsEvents.status === 'fulfilled') {
      events = [...events, ...newsEvents.value];
    }

    if (events.length === 0) throw new Error("No data received");

    return events;
  } catch (error) {
    console.warn("API Error, falling back to mock data", error);
    return MOCK_DATA;
  }
}

async function fetchNewsData(): Promise<OsintEvent[]> {
  try {
    const promises = NEWS_FEEDS.map(async (url) => {
      const res = await fetch(`${RSS_PROXY}?url=${encodeURIComponent(url)}`);
      if (!res.ok) return [];
      const feed = await res.json();
      return (feed.items || []).slice(0, 5).map((item: any) => ({ // Take top 5 per feed
        id: `news-${item.guid || item.link}`,
        title: item.title,
        description: item.contentSnippet || item.content,
        category: 'News / Activism',
        date: item.pubDate || new Date().toISOString(),
        // Random geo-location for news as they lack coords (Simulated Global Impact)
        // In a real app, we would use NLP to extract locations.
        lat: (Math.random() - 0.5) * 100,
        lng: (Math.random() - 0.5) * 360,
        magnitude: 4, // High visibility for news
        source: 'News Feed'
      }));
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error("Failed to fetch news", error);
    return [];
  }
}

const MOCK_DATA: OsintEvent[] = [
  { id: 'mock1', title: 'Climate Strike NYC', category: 'Protest', date: new Date().toISOString(), lat: 40.7128, lng: -74.0060, magnitude: 5, source: 'MOCK' },
  { id: 'mock2', title: 'Forest Fire Amazon', category: 'Wildfire', date: new Date().toISOString(), lat: -3.4653, lng: -62.2159, magnitude: 4, source: 'MOCK' },
  { id: 'mock3', title: 'Clean Water Initiative', category: 'Humanitarian', date: new Date().toISOString(), lat: 15.8700, lng: 100.9925, magnitude: 3, source: 'MOCK' },
  { id: 'mock4', title: 'Glacier Melt Observation', category: 'Scientific', date: new Date().toISOString(), lat: 64.2008, lng: -149.4937, magnitude: 2, source: 'MOCK' },
  { id: 'mock5', title: 'Solar Farm Projec', category: 'Tech', date: new Date().toISOString(), lat: 31.0461, lng: 34.8516, magnitude: 3, source: 'MOCK' }
];
