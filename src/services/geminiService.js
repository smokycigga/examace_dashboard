import genAI from './geminiClient';

/**
 * Generates text response based on user input.
 * @param {string} prompt - The user's input prompt.
 * @returns {Promise<string>} The generated text.
 */
export async function generateText(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in text generation:', error);
    throw error;
  }
}

/**
 * Streams text response chunk by chunk.
 * @param {string} prompt - The user's input prompt.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function streamText(prompt, onChunk) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error('Error in streaming text generation:', error);
    throw error;
  }
}

/**
 * Manages a chat session with history.
 * @param {string} prompt - The user's input prompt.
 * @param {Array} history - The chat history.
 * @returns {Promise<{response: string, updatedHistory: Array}>} The response and updated history.
 */
export async function chatWithHistory(prompt, history = []) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({ history });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    const updatedHistory = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] },
      { role: 'model', parts: [{ text }] },
    ];

    return { response: text, updatedHistory };
  } catch (error) {
    console.error('Error in chat session:', error);
    throw error;
  }
}

/**
 * Generates AI-powered study recommendations based on performance data.
 * @param {Object} performanceData - Student's performance data.
 * @returns {Promise<Object>} AI-generated study recommendations.
 */
export async function generateStudyPlan(performanceData) {
  try {
    const prompt = `Based on the following student performance data, generate a comprehensive study plan:
    
    Performance Data:
    - Weak Areas: ${performanceData.weakAreas?.map(area => `${area.name} (${area.accuracy}% accuracy)`).join(', ')}
    - Strong Areas: ${performanceData.strengths?.map(area => `${area.name} (${area.accuracy}% accuracy)`).join(', ')}
    - Average Study Time: ${performanceData.averageStudyTime || 'Not specified'}
    - Test Frequency: ${performanceData.testFrequency || 'Not specified'}
    - Target Exam: ${performanceData.targetExam || 'JEE Main/Advanced'}
    
    Please provide:
    1. Daily study schedule with time allocation
    2. Topic-wise revision plan
    3. Practice test recommendations
    4. Specific focus areas for weak subjects
    5. Memory techniques and formulas for key concepts
    
    Format the response as a structured JSON object with keys: dailySchedule, revisionPlan, testRecommendations, focusAreas, memoryTechniques`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      // If JSON parsing fails, return structured response
      return {
        dailySchedule: text.split('\n').slice(0, 5),
        revisionPlan: text.split('\n').slice(5, 10),
        testRecommendations: text.split('\n').slice(10, 15),
        focusAreas: text.split('\n').slice(15, 20),
        memoryTechniques: text.split('\n').slice(20)
      };
    }
  } catch (error) {
    console.error('Error generating study plan:', error);
    throw error;
  }
}

/**
 * Analyzes test performance and provides insights.
 * @param {Object} testData - Test performance data.
 * @returns {Promise<Object>} AI-generated performance analysis.
 */
export async function analyzeTestPerformance(testData) {
  try {
    const prompt = `Analyze the following test performance data and provide insights:
    
    Test Data:
    - Score: ${testData.score}/${testData.totalMarks}
    - Time Taken: ${testData.timeTaken} minutes
    - Subject-wise Performance: ${JSON.stringify(testData.subjectWise)}
    - Incorrect Answers: ${testData.incorrectAnswers?.length || 0}
    - Skipped Questions: ${testData.skippedQuestions?.length || 0}
    
    Please provide:
    1. Overall performance assessment
    2. Subject-wise analysis
    3. Time management evaluation
    4. Areas for improvement
    5. Specific study recommendations
    
    Format as a structured analysis with clear sections.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      analysis: response.text(),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error analyzing test performance:', error);
    throw error;
  }
}

/**
 * Generates motivational quotes and study tips.
 * @param {string} context - Context for the motivation (e.g., 'low_performance', 'streak_break').
 * @returns {Promise<Object>} Motivational content.
 */
export async function generateMotivation(context = 'general') {
  try {
    const prompt = `Generate motivational content for a JEE/NEET aspirant in the context of: ${context}
    
    Include:
    1. An inspiring quote
    2. A practical study tip
    3. A confidence-building message
    4. A short success story or example
    
    Keep it concise and encouraging.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      content: response.text(),
      context,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating motivation:', error);
    throw error;
  }
}