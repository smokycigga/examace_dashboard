import axios from 'axios';

/**
 * OpenRouter API client configuration
 */
const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'ExamAce - AI Study Planner'
  }
});

export default openRouterClient;