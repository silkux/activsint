import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    const { url } = request.query;

    if (!url || typeof url !== 'string') {
        return response.status(400).json({ error: 'Missing or invalid url parameter' });
    }

    try {
        const parser = new Parser();
        const feed = await parser.parseURL(url);
        return response.status(200).json(feed);
    } catch (error) {
        console.error(`Error fetching RSS feed ${url}:`, error);
        return response.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
}
