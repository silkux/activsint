import { OsintEvent } from './osintData';

export interface SearchResult {
    answer: string;
    sources: OsintEvent[];
    confidence: number;
}

// Simulated Weaviate RAG Response
export async function queryWeaviate(query: string, allEvents: OsintEvent[]): Promise<SearchResult> {
    // Simulate network latency for vector search
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerQuery = query.toLowerCase();

    // Simple keyword matching to simulate semantic search on client-side data
    const relevantEvents = allEvents.filter(e =>
        e.title.toLowerCase().includes(lowerQuery) ||
        e.description.toLowerCase().includes(lowerQuery) ||
        e.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    // Simulated Generative Answers based on query topics
    let answer = "I found some relevant data in our vector database.";

    if (lowerQuery.includes('zoo') || lowerQuery.includes('death')) {
        answer = "Based on recent reports, there have been critical incidents involving captivity deaths. The most significant event occurred recently at a major facility. Local activists are already mobilizing.";
    } else if (lowerQuery.includes('circus')) {
        answer = "I've detected unauthorized circus operations in the region. Permits appear to be contested. Legal action is recommended.";
    } else if (lowerQuery.includes('protest')) {
        answer = "Multiple protest opportunities identified. High urgency events in Europe and South America require immediate support.";
    } else if (relevantEvents.length > 0) {
        answer = `I identified ${relevantEvents.length} critical events matching your criteria. The situation in ${relevantEvents[0].category} is escalating.`;
    } else {
        answer = "I analyzed the global database but found no critical matches for that specific query. Monitoring continues.";
    }

    return {
        answer,
        sources: relevantEvents,
        confidence: 0.89
    };
}
