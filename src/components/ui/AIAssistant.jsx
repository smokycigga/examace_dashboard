import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import { chatWithHistory, generateMotivation } from '../../services/geminiService';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'m your AI study assistant powered by Gemini. I can help you with doubts, study planning, test strategies, and concept explanations. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const contextualSuggestions = {
    '/dashboard': [
      'Analyze my performance trends',
      'Create a study plan for my weak areas',
      'How to improve my test scores?',
      'Motivate me to study harder'
    ],
    '/test-generator': [
      'Best test strategy for JEE',
      'How many questions per topic?',
      'Time management tips',
      'Difficulty level recommendations'
    ],
    '/test-interface': [
      'Quick solving techniques',
      'How to handle difficult questions?',
      'Time allocation strategy',
      'Manage test anxiety'
    ],
    '/test-results': [
      'Analyze my performance',
      'What to focus on next?',
      'Compare with toppers',
      'Improvement strategies'
    ],
    '/test-history': [
      'Show improvement trends',
      'Identify recurring mistakes',
      'Best practice schedule',
      'Track my progress'
    ],
    '/ai-study-planner': [
      'Optimize my study plan',
      'Balance theory and practice',
      'Revision strategy tips',
      'Daily routine suggestions'
    ]
  };

  const currentSuggestions = contextualSuggestions[location.pathname] || [
    'Help with study planning',
    'Explain a concept',
    'Test taking strategies',
    'Motivational quote'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load initial motivational message
    if (messages.length === 1) {
      loadMotivationalMessage();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMotivationalMessage = async () => {
    try {
      const motivation = await generateMotivation('welcome');
      const motivationalMessage = {
        id: Date.now(),
        type: 'ai',
        content: motivation.content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, motivationalMessage]);
    } catch (error) {
      console.error('Failed to load motivational message:', error);
    }
  };

  const handleSendMessage = async (messageText = message) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      // Create context-aware prompt
      const contextualPrompt = `
        Context: User is on ${location.pathname} page of an exam preparation dashboard.
        User Question: ${messageText}
        
        Please provide a helpful, encouraging response as an AI study assistant for JEE/NEET preparation. 
        Be specific, actionable, and supportive. If it's a subject-specific question, provide detailed explanations.
        If it's about study strategies, give practical tips. If it's motivational, be inspiring but realistic.
      `;

      const { response: aiResponse, updatedHistory } = await chatWithHistory(contextualPrompt, chatHistory);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setChatHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again or ask me something else. I\'m here to help with your studies!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Chat cleared! How can I help you with your studies today?',
        timestamp: new Date()
      }
    ]);
    setChatHistory([]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-academic-lg hover:shadow-academic-xl transition-all duration-300 hover:scale-105"
          iconName="Brain"
          iconSize={24}
        />
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
    }`}>
      <div className="bg-surface rounded-academic-lg shadow-academic-xl border border-border overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary-50 to-accent-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
              <Icon name="Brain" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary text-sm">
                AI Study Assistant
              </h3>
              <p className="text-xs text-text-secondary font-caption">
                {isTyping ? 'Thinking...' : 'Powered by Gemini'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              iconName="RotateCcw"
              iconSize={14}
              title="Clear chat"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              iconName={isMinimized ? "Maximize2" : "Minimize2"}
              iconSize={14}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              iconName="X"
              iconSize={14}
            />
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    msg.type === 'user' ? 'bg-primary text-primary-foreground rounded-academic-lg rounded-br-sm': 'bg-secondary-100 text-text-primary rounded-academic-lg rounded-bl-sm'
                  } px-3 py-2`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-primary-200' : 'text-text-muted'
                    } font-caption`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary-100 rounded-academic-lg rounded-bl-sm px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 border-t border-border-light">
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="xs"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs hover:bg-primary-50 transition-smooth"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything about your studies..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim() || isTyping}
                  iconName="Send"
                  iconSize={16}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;