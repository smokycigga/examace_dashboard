import openRouterClient from './openRouterClient';
import { APIError, getErrorType, getErrorMessage, logError, createFallbackContent } from '../utils/errorHandler';
import { validateEnvironmentConfig, createConfigurationError } from '../utils/configValidator';

/**
 * Validates API configuration before making requests
 */
const validateAPIConfig = () => {
  const configResult = validateEnvironmentConfig();
  
  if (!configResult.config.OPENROUTER_API_KEY) {
    throw createConfigurationError(['VITE_OPENROUTER_API_KEY']);
  }
  
  return true;
};

/**
 * Enhanced error handling wrapper for API calls
 */
const handleAPICall = async (apiCall, fallbackType) => {
  try {
    validateAPIConfig();
    return await apiCall();
  } catch (error) {
    // Handle configuration errors specifically
    if (error.type === 'CONFIGURATION_ERROR') {
      console.warn('OpenRouter API configuration missing. Using fallback content.');
      logError(new APIError('OpenRouter API key is not configured', 401, 'OpenRouter'), { 
        service: 'OpenRouter', 
        fallbackType,
        configError: true 
      });
      return {
        ...createFallbackContent(fallbackType),
        configurationError: error
      };
    }
    
    logError(error, { service: 'OpenRouter', fallbackType });
    
    // For authentication errors, provide specific guidance
    if (getErrorType(error) === 'authentication') {
      console.warn('OpenRouter API authentication failed. Using fallback content.');
      return {
        ...createFallbackContent(fallbackType),
        authenticationError: true
      };
    }
    
    // For other errors, use fallback content
    console.warn(`OpenRouter API error: ${getErrorMessage(error, 'OpenRouter')}. Using fallback content.`);
    return createFallbackContent(fallbackType);
  }
};

/**
 * Generates enhanced study recommendations using OpenRouter AI
 * @param {Object} userProfile - User's learning profile and preferences
 * @param {Object} performanceData - Recent test performance data
 * @returns {Promise<Object>} Enhanced AI recommendations
 */
export async function generateEnhancedStudyPlan(userProfile, performanceData) {
  const apiCall = async () => {
    const prompt = `As an expert educational AI, create a personalized study plan for this student:

User Profile:
- Name: ${userProfile.name || 'Student'}
- Target Exam: ${userProfile.targetExam || 'JEE Main/Advanced'}
- Study Hours Available: ${userProfile.dailyStudyHours || 6} hours/day
- Learning Style: ${userProfile.learningStyle || 'Mixed'}
- Weak Subjects: ${performanceData.weakAreas?.map(area => `${area.name} (${area.accuracy}%)`).join(', ')}
- Strong Subjects: ${performanceData.strengths?.map(area => `${area.name} (${area.accuracy}%)`).join(', ')}

Recent Performance:
- Overall Accuracy: ${performanceData.overallAccuracy || 'N/A'}%
- Test Frequency: ${performanceData.testsThisWeek || 0} tests this week
- Study Streak: ${performanceData.studyStreak || 0} days

Create a detailed study plan with:
1. Personalized daily schedule
2. Subject prioritization based on performance
3. Specific topics to focus on this week
4. Recommended practice problems count
5. Memory techniques for weak areas
6. Motivational milestones

Return as JSON with keys: dailySchedule, priorities, weeklyTopics, practiceTargets, memoryTechniques, milestones`;

    const response = await openRouterClient.post('/chat/completions', {
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational AI specializing in personalized study plans for competitive exam preparation. Always respond with well-structured, actionable advice.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const aiResponse = response.data.choices[0].message.content;
    
    try {
      return JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback structured response
      return {
        dailySchedule: aiResponse.split('\n').slice(0, 8),
        priorities: aiResponse.split('\n').slice(8, 12),
        weeklyTopics: aiResponse.split('\n').slice(12, 16),
        practiceTargets: aiResponse.split('\n').slice(16, 20),
        memoryTechniques: aiResponse.split('\n').slice(20, 24),
        milestones: aiResponse.split('\n').slice(24)
      };
    }
  };

  return handleAPICall(apiCall, 'studyPlan');
}

/**
 * Provides intelligent performance analysis using OpenRouter AI
 * @param {Object} testResults - Detailed test performance data
 * @param {Object} historicalData - Past performance trends
 * @returns {Promise<Object>} Comprehensive performance analysis
 */
export async function analyzePerformanceWithAI(testResults, historicalData) {
  const apiCall = async () => {
    const prompt = `Analyze this student's test performance and provide detailed insights:

Current Test Results:
- Score: ${testResults.score}/${testResults.totalMarks} (${testResults.percentage}%)
- Time: ${testResults.timeTaken}/${testResults.totalTime} minutes
- Subject Breakdown: ${JSON.stringify(testResults.subjectWise)}
- Question Types: ${JSON.stringify(testResults.questionTypes)}

Historical Performance:
- Average Score Trend: ${historicalData.averageTrend || 'Improving'}
- Best Subject: ${historicalData.bestSubject || 'Mathematics'}
- Most Challenging: ${historicalData.weakestSubject || 'Physics'}
- Test Count: ${historicalData.totalTests || 0} tests taken

Provide analysis with:
1. Performance assessment (strengths/weaknesses)
2. Time management evaluation
3. Subject-wise improvement suggestions
4. Comparison with past performance
5. Next steps and focus areas
6. Confidence building points

Format as structured JSON.`;

    const response = await openRouterClient.post('/chat/completions', {
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational psychologist and performance analyst. Provide encouraging yet honest assessments that motivate students to improve.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.6,
      max_tokens: 1500
    });

    return {
      analysis: response.data.choices[0].message.content,
      timestamp: new Date().toISOString(),
      confidence: 'high'
    };
  };

  return handleAPICall(apiCall, 'performance');
}

/**
 * Generates personalized motivational content based on user context
 * @param {Object} userContext - Current user state and recent activity
 * @returns {Promise<Object>} Personalized motivational content
 */
export async function generatePersonalizedMotivation(userContext) {
  const apiCall = async () => {
    const prompt = `Create personalized motivational content for this student:

Context:
- Current Mood: ${userContext.mood || 'neutral'}
- Recent Achievement: ${userContext.recentAchievement || 'none'}
- Challenge Faced: ${userContext.currentChallenge || 'none'}
- Study Streak: ${userContext.studyStreak || 0} days
- Target Exam Date: ${userContext.examDate || 'Not set'}
- Progress Level: ${userContext.progressLevel || 'Beginner'}

Generate:
1. A personalized inspirational quote
2. Specific achievement recognition
3. Encouragement for current challenges
4. A practical next step
5. A confidence booster based on their progress

Keep it authentic, personal, and motivating.`;

    const response = await openRouterClient.post('/chat/completions', {
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a supportive mentor who understands the emotional journey of competitive exam preparation. Provide personalized, uplifting content that resonates with the individual student.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 800
    });

    return {
      content: response.data.choices[0].message.content,
      timestamp: new Date().toISOString(),
      personalized: true
    };
  };

  return handleAPICall(apiCall, 'motivation');
}

/**
 * Creates adaptive question recommendations based on performance patterns
 * @param {Object} learningProfile - User's learning patterns and preferences
 * @returns {Promise<Array>} Recommended question types and topics
 */
export async function generateAdaptiveQuestions(learningProfile) {
  const apiCall = async () => {
    const prompt = `Based on this learning profile, recommend specific questions and practice areas:

Learning Profile:
- Accuracy by Subject: ${JSON.stringify(learningProfile.subjectAccuracy)}
- Question Type Performance: ${JSON.stringify(learningProfile.questionTypePerformance)}
- Time Spent per Topic: ${JSON.stringify(learningProfile.timeDistribution)}
- Difficulty Preference: ${learningProfile.difficultyPreference || 'Medium'}
- Recent Mistakes: ${learningProfile.recentMistakes?.join(', ') || 'None recorded'}

Recommend:
1. 5 specific topics to practice next
2. Optimal difficulty level for each topic
3. Question types to focus on
4. Time allocation suggestions
5. Conceptual areas needing reinforcement

Format as structured JSON with actionable recommendations.`;

    const response = await openRouterClient.post('/chat/completions', {
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: 'You are an adaptive learning expert who creates personalized question recommendations based on performance data and learning patterns.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 1200
    });

    const aiResponse = response.data.choices[0].message.content;
    
    try {
      return JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback structure
      return {
        recommendedTopics: aiResponse.split('\n').slice(0, 5),
        difficultyLevels: ['Medium'] * 5,
        questionTypes: ['Mixed'],
        timeAllocation: ['30 minutes per topic'],
        conceptualAreas: aiResponse.split('\n').slice(5, 10)
      };
    }
  };

  return handleAPICall(apiCall, 'studyPlan');
}

export default {
  generateEnhancedStudyPlan,
  analyzePerformanceWithAI,
  generatePersonalizedMotivation,
  generateAdaptiveQuestions
};