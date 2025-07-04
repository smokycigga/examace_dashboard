import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistant from '../../components/ui/AIAssistant';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

import SubjectSelector from './components/SubjectSelector';
import DifficultySelector from './components/DifficultySelector';
import TestModeSelector from './components/TestModeSelector';
import TestPreview from './components/TestPreview';
import AdvancedOptions from './components/AdvancedOptions';
import TestTemplates from './components/TestTemplates';

const TestGenerator = () => {
  const navigate = useNavigate();
  
  // Test Configuration State
  const [subjects, setSubjects] = useState({
    Physics: { selected: false, questionCount: 25 },
    Chemistry: { selected: false, questionCount: 25 },
    Mathematics: { selected: false, questionCount: 25 },
    Biology: { selected: false, questionCount: 25 }
  });
  
  const [difficulty, setDifficulty] = useState('mixed');
  const [testMode, setTestMode] = useState('timed');
  const [duration, setDuration] = useState(60);
  const [customDuration, setCustomDuration] = useState(60);
  
  // Advanced Options State
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [questionTypes, setQuestionTypes] = useState(['mcq']);
  const [selectedChapters, setSelectedChapters] = useState({});
  const [excludePreviousTests, setExcludePreviousTests] = useState(false);
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Validation
  const validateTestConfiguration = () => {
    const errors = [];
    const selectedSubjects = Object.entries(subjects).filter(([_, config]) => config.selected);
    
    if (selectedSubjects.length === 0) {
      errors.push('Please select at least one subject');
    }
    
    const totalQuestions = selectedSubjects.reduce((sum, [_, config]) => sum + config.questionCount, 0);
    if (totalQuestions < 5) {
      errors.push('Minimum 5 questions required');
    }
    
    if (testMode === 'timed' && duration === 'custom' && (customDuration < 5 || customDuration > 300)) {
      errors.push('Custom duration must be between 5-300 minutes');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Event Handlers
  const handleSubjectChange = (subject, selected) => {
    setSubjects(prev => ({
      ...prev,
      [subject]: { ...prev[subject], selected }
    }));
  };

  const handleQuestionCountChange = (subject, count) => {
    setSubjects(prev => ({
      ...prev,
      [subject]: { ...prev[subject], questionCount: count }
    }));
  };

  const handleQuestionTypeChange = (type, checked) => {
    if (type === 'reset') {
      setQuestionTypes(['mcq']);
      return;
    }
    
    setQuestionTypes(prev => 
      checked 
        ? [...prev, type]
        : prev.filter(t => t !== type)
    );
  };

  const handleChapterChange = (subject, chapter, checked) => {
    if (subject === 'reset') {
      setSelectedChapters({});
      return;
    }
    
    setSelectedChapters(prev => ({
      ...prev,
      [subject]: checked
        ? [...(prev[subject] || []), chapter]
        : (prev[subject] || []).filter(c => c !== chapter)
    }));
  };

  const handleTemplateSelect = (template) => {
    // Apply template configuration
    if (template.questions) {
      const newSubjects = { ...subjects };
      Object.keys(newSubjects).forEach(subject => {
        newSubjects[subject] = {
          selected: template.subjects.includes(subject),
          questionCount: template.questions[subject] || 25
        };
      });
      setSubjects(newSubjects);
    }
    
    setDifficulty(template.difficulty);
    setTestMode(template.duration ? 'timed' : 'untimed');
    setDuration(template.duration || 60);
    setShowTemplates(false);
  };

  const handleSaveTemplate = () => {
    // Mock save template functionality
    const selectedSubjects = Object.entries(subjects)
      .filter(([_, config]) => config.selected)
      .map(([subject]) => subject);
    
    const templateName = `Custom Test - ${selectedSubjects.join(', ')}`;
    
    // In a real app, this would save to backend/localStorage
    console.log('Saving template:', {
      name: templateName,
      subjects: selectedSubjects,
      difficulty,
      testMode,
      duration
    });
    
    // Show success message (could use toast notification)
    alert('Template saved successfully!');
  };

  const handleGenerateTest = async () => {
    if (!validateTestConfiguration()) {
      return;
    }
    
    setIsGenerating(true);
    
    // Mock test generation process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to test interface with configuration
      const testConfig = {
        subjects: Object.entries(subjects)
          .filter(([_, config]) => config.selected)
          .reduce((acc, [subject, config]) => {
            acc[subject] = config.questionCount;
            return acc;
          }, {}),
        difficulty,
        testMode,
        duration: testMode === 'timed' ? (duration === 'custom' ? customDuration : duration) : null,
        questionTypes,
        selectedChapters,
        excludePreviousTests
      };
      
      // Store config in sessionStorage for test interface
      sessionStorage.setItem('testConfig', JSON.stringify(testConfig));
      
      navigate('/test-interface');
    } catch (error) {
      console.error('Error generating test:', error);
      alert('Failed to generate test. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate if template can be saved
  const canSaveTemplate = Object.values(subjects).some(config => config.selected);
  
  // Calculate total questions for validation
  const totalQuestions = Object.entries(subjects)
    .filter(([_, config]) => config.selected)
    .reduce((sum, [_, config]) => sum + config.questionCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pt-16">
        <Breadcrumb />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary font-heading">
                  Test Generator
                </h1>
                <p className="text-text-secondary mt-2">
                  Create customized practice tests tailored to your preparation needs
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplates(!showTemplates)}
                  iconName="Bookmark"
                  iconPosition="left"
                  iconSize={16}
                >
                  Templates
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => navigate('/test-history')}
                  iconName="History"
                  iconPosition="left"
                  iconSize={16}
                >
                  Test History
                </Button>
              </div>
            </div>
          </div>

          {/* Templates Section */}
          {showTemplates && (
            <div className="mb-8 p-6 bg-surface rounded-academic-lg border border-border shadow-academic">
              <TestTemplates
                onTemplateSelect={handleTemplateSelect}
                onSaveTemplate={handleSaveTemplate}
                canSaveTemplate={canSaveTemplate}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-2 space-y-8">
              {/* Subject Selection */}
              <div className="bg-surface p-6 rounded-academic-lg border border-border shadow-academic">
                <SubjectSelector
                  subjects={subjects}
                  onSubjectChange={handleSubjectChange}
                  onQuestionCountChange={handleQuestionCountChange}
                />
              </div>

              {/* Difficulty & Test Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-academic-lg border border-border shadow-academic">
                  <DifficultySelector
                    selectedDifficulty={difficulty}
                    onDifficultyChange={setDifficulty}
                  />
                </div>
                
                <div className="bg-surface p-6 rounded-academic-lg border border-border shadow-academic">
                  <TestModeSelector
                    testMode={testMode}
                    onTestModeChange={setTestMode}
                    duration={duration}
                    onDurationChange={setDuration}
                    customDuration={customDuration}
                    onCustomDurationChange={setCustomDuration}
                  />
                </div>
              </div>

              {/* Advanced Options */}
              <div className="bg-surface rounded-academic-lg border border-border shadow-academic">
                <AdvancedOptions
                  isExpanded={showAdvancedOptions}
                  onToggle={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  questionTypes={questionTypes}
                  onQuestionTypeChange={handleQuestionTypeChange}
                  selectedChapters={selectedChapters}
                  onChapterChange={handleChapterChange}
                  excludePreviousTests={excludePreviousTests}
                  onExcludePreviousTestsChange={setExcludePreviousTests}
                />
              </div>
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="space-y-6">
              {/* Test Preview */}
              <div className="bg-surface p-6 rounded-academic-lg border border-border shadow-academic sticky top-24">
                <TestPreview
                  subjects={subjects}
                  difficulty={difficulty}
                  testMode={testMode}
                  duration={duration}
                  customDuration={customDuration}
                />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 bg-surface p-6 rounded-academic-lg border border-border shadow-academic">
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-academic">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                  <div>
                    <h4 className="font-medium text-error text-sm mb-2">
                      Please fix the following issues:
                    </h4>
                    <ul className="text-sm text-error space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-1 h-1 bg-error rounded-full" />
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>{totalQuestions} questions selected</span>
                </div>
                {testMode === 'timed' && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>
                      {duration === 'custom' ? customDuration : duration} minutes
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Reset all configurations
                    setSubjects({
                      Physics: { selected: false, questionCount: 25 },
                      Chemistry: { selected: false, questionCount: 25 },
                      Mathematics: { selected: false, questionCount: 25 },
                      Biology: { selected: false, questionCount: 25 }
                    });
                    setDifficulty('mixed');
                    setTestMode('timed');
                    setDuration(60);
                    setQuestionTypes(['mcq']);
                    setSelectedChapters({});
                    setExcludePreviousTests(false);
                    setValidationErrors([]);
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={16}
                >
                  Reset
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleGenerateTest}
                  disabled={isGenerating || totalQuestions === 0}
                  loading={isGenerating}
                  iconName={isGenerating ? undefined : "Play"}
                  iconPosition="left"
                  iconSize={18}
                  className="min-w-[140px]"
                >
                  {isGenerating ? 'Generating...' : 'Generate Test'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default TestGenerator;