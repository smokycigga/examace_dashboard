/**
 * Centralized error handling utilities
 */

export class APIError extends Error {
  constructor(message, status, service) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.service = service;
  }
}

export const ERROR_TYPES = {
  AUTHENTICATION: 'authentication',
  NETWORK: 'network',
  RATE_LIMIT: 'rate_limit',
  SERVICE_UNAVAILABLE: 'service_unavailable',
  INVALID_REQUEST: 'invalid_request',
  UNKNOWN: 'unknown'
};

export const getErrorType = (error) => {
  if (error.response?.status === 401) {
    return ERROR_TYPES.AUTHENTICATION;
  }
  if (error.response?.status === 429) {
    return ERROR_TYPES.RATE_LIMIT;
  }
  if (error.response?.status >= 500) {
    return ERROR_TYPES.SERVICE_UNAVAILABLE;
  }
  if (error.response?.status === 400) {
    return ERROR_TYPES.INVALID_REQUEST;
  }
  if (error.code === 'NETWORK_ERROR' || !error.response) {
    return ERROR_TYPES.NETWORK;
  }
  return ERROR_TYPES.UNKNOWN;
};

export const getErrorMessage = (error, service = 'API') => {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ERROR_TYPES.AUTHENTICATION:
      return `Authentication failed for ${service}. Please check your API configuration.`;
    case ERROR_TYPES.NETWORK:
      return `Network connection error. Please check your internet connection and try again.`;
    case ERROR_TYPES.RATE_LIMIT:
      return `Rate limit exceeded for ${service}. Please try again in a few moments.`;
    case ERROR_TYPES.SERVICE_UNAVAILABLE:
      return `${service} is temporarily unavailable. Using fallback content.`;
    case ERROR_TYPES.INVALID_REQUEST:
      return `Invalid request to ${service}. Please try again.`;
    default:
      return `An unexpected error occurred with ${service}. Using fallback content.`;
  }
};

export const logError = (error, context = {}) => {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    status: error.response?.status,
    service: error.service,
    context,
    timestamp: new Date().toISOString()
  });
};

export const createFallbackContent = (contentType) => {
  const fallbacks = {
    motivation: {
      content: "Every step forward is progress. Keep pushing towards your goals!",
      timestamp: new Date().toISOString(),
      personalized: false,
      fallback: true
    },
    studyPlan: {
      dailySchedule: [
        "9:00 AM - Physics Practice",
        "11:00 AM - Chemistry Review", 
        "2:00 PM - Mathematics Problems",
        "4:00 PM - Test Practice"
      ],
      priorities: ["Focus on weak areas", "Regular practice", "Time management"],
      weeklyTopics: ["Thermodynamics", "Organic Chemistry", "Coordinate Geometry"],
      fallback: true
    },
    performance: {
      analysis: "Focus on consistent practice and identifying patterns in your mistakes. Regular revision will help improve your overall performance.",
      timestamp: new Date().toISOString(),
      confidence: 'medium',
      fallback: true
    }
  };
  
  return fallbacks[contentType] || { fallback: true };
};