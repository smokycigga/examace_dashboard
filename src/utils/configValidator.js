/**
 * Configuration validation utilities for API services
 */

export const CONFIG_KEYS = {
  OPENROUTER_API_KEY: 'VITE_OPENROUTER_API_KEY',
  GEMINI_API_KEY: 'VITE_GEMINI_API_KEY',
  CLERK_PUBLISHABLE_KEY: 'VITE_CLERK_PUBLISHABLE_KEY'
};

export const validateEnvironmentConfig = () => {
  const config = {};
  const missing = [];
  const warnings = [];

  // Check required environment variables
  Object.entries(CONFIG_KEYS).forEach(([key, envKey]) => {
    const value = import.meta.env[envKey];
    
    if (!value || value === 'undefined' || value === '') {
      missing.push(envKey);
      config[key] = null;
    } else {
      config[key] = value;
    }
  });

  // Generate warnings for optional but recommended configs
  if (!config.GEMINI_API_KEY && !config.OPENROUTER_API_KEY) {
    warnings.push('No AI service API keys configured. AI features will use fallback content.');
  }

  return {
    config,
    missing,
    warnings,
    isValid: missing.length === 0,
    hasAIService: !!(config.OPENROUTER_API_KEY || config.GEMINI_API_KEY)
  };
};

export const getConfigurationInstructions = () => {
  return {
    title: 'API Configuration Required',
    description: 'To enable AI features, please configure your API keys in the environment variables.',
    steps: [
      {
        step: 1,
        title: 'Create Environment File',
        description: 'Create a .env file in your project root directory',
        code: '# Create .env file in project root'
      },
      {
        step: 2,
        title: 'Add OpenRouter API Key',
        description: 'Get your API key from OpenRouter and add it to .env',
        code: 'VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here'
      },
      {
        step: 3,
        title: 'Optional: Add Gemini API Key',
        description: 'For enhanced AI features, add Google Gemini API key',
        code: 'VITE_GEMINI_API_KEY=your_gemini_api_key_here'
      },
      {
        step: 4,
        title: 'Restart Development Server',
        description: 'Restart your development server to load the new environment variables',
        code: 'npm start'
      }
    ],
    links: [
      {
        title: 'Get OpenRouter API Key',
        url: 'https://openrouter.ai/keys',
        description: 'Sign up and get your OpenRouter API key'
      },
      {
        title: 'Get Gemini API Key',
        url: 'https://makersuite.google.com/app/apikey',
        description: 'Get your Google Gemini API key'
      }
    ]
  };
};

export const createConfigurationError = (missingKeys = []) => {
  return {
    type: 'CONFIGURATION_ERROR',
    title: 'API Configuration Missing',
    message: `Missing required environment variables: ${missingKeys.join(', ')}`,
    missingKeys,
    instructions: getConfigurationInstructions(),
    canRetry: true,
    severity: 'error'
  };
};

export default {
  validateEnvironmentConfig,
  getConfigurationInstructions,
  createConfigurationError,
  CONFIG_KEYS
};