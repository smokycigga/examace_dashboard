import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistant from '../../components/ui/AIAssistant';
import QuestionPanel from './components/QuestionPanel';
import AnswerPalette from './components/AnswerPalette';
import NavigationSidebar from './components/NavigationSidebar';
import TestHeader from './components/TestHeader';
import MobileTestInterface from './components/MobileTestInterface';
import Icon from '../../components/AppIcon';


const TestInterface = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [numericAnswers, setNumericAnswers] = useState({});
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [activeSection, setActiveSection] = useState('physics');
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  // Mock test data
  const testData = {
    name: "JEE Main Mock Test - Physics, Chemistry & Mathematics",
    duration: 180, // 3 hours in minutes
    sections: [
      {
        id: 'physics',
        name: 'Physics',
        icon: 'Zap',
        questionCount: 30,
        questions: Array.from({ length: 30 }, (_, i) => ({
          id: `physics_${i + 1}`,
          question: `A particle moves in a straight line with constant acceleration. If the particle covers 100 m in the first 10 seconds and 150 m in the next 10 seconds, find the initial velocity and acceleration of the particle. Consider the motion equations and solve step by step.`,
          type: i % 5 === 0 ? 'numeric' : 'mcq',
          options: i % 5 === 0 ? null : [
            "Initial velocity = 5 m/s, Acceleration = 2.5 m/s²",
            "Initial velocity = 7.5 m/s, Acceleration = 2.5 m/s²",
            "Initial velocity = 10 m/s, Acceleration = 1.5 m/s²",
            "Initial velocity = 2.5 m/s, Acceleration = 5 m/s²"
          ],
          answerRange: i % 5 === 0 ? "0-100" : null,
          marks: 4,
          negativeMarks: i % 5 === 0 ? 0 : 1,
          difficulty: i < 10 ? 'Easy' : i < 20 ? 'Medium' : 'Hard',
          image: i % 8 === 0 ? "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" : null,
          additionalInfo: i % 6 === 0 ? "Use g = 10 m/s² for calculations" : null,
          formulas: i % 7 === 0 ? [
            "v = u + at",
            "s = ut + ½at²",
            "v² = u² + 2as"
          ] : []
        }))
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        icon: 'TestTube',
        questionCount: 30,
        questions: Array.from({ length: 30 }, (_, i) => ({
          id: `chemistry_${i + 1}`,
          question: `Calculate the molarity of a solution prepared by dissolving 5.85 g of NaCl in 250 mL of water. Given that the molar mass of NaCl is 58.5 g/mol. Show your calculation steps and express the answer in appropriate units.`,
          type: i % 4 === 0 ? 'numeric' : 'mcq',
          options: i % 4 === 0 ? null : [
            "0.4 M",
            "0.2 M",
            "0.6 M",
            "0.8 M"
          ],
          answerRange: i % 4 === 0 ? "0-10" : null,
          marks: 4,
          negativeMarks: i % 4 === 0 ? 0 : 1,
          difficulty: i < 10 ? 'Easy' : i < 20 ? 'Medium' : 'Hard',
          image: i % 9 === 0 ? "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop" : null,
          additionalInfo: i % 5 === 0 ? "Assume complete dissociation of NaCl" : null,
          formulas: i % 6 === 0 ? [
            "Molarity = moles of solute / volume of solution (L)",
            "moles = mass / molar mass"
          ] : []
        }))
      },
      {
        id: 'mathematics',
        name: 'Mathematics',
        icon: 'Calculator',
        questionCount: 30,
        questions: Array.from({ length: 30 }, (_, i) => ({
          id: `mathematics_${i + 1}`,
          question: `Find the derivative of f(x) = x³ + 2x² - 5x + 3 at x = 2. Use the power rule and show all steps of differentiation. Then evaluate the derivative at the given point.`,
          type: i % 6 === 0 ? 'numeric' : 'mcq',
          options: i % 6 === 0 ? null : [
            "f'(2) = 15",
            "f'(2) = 19",
            "f'(2) = 23",
            "f'(2) = 27"
          ],
          answerRange: i % 6 === 0 ? "0-50" : null,
          marks: 4,
          negativeMarks: i % 6 === 0 ? 0 : 1,
          difficulty: i < 10 ? 'Easy' : i < 20 ? 'Medium' : 'Hard',
          image: i % 10 === 0 ? "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop" : null,
          additionalInfo: i % 7 === 0 ? "Use standard differentiation rules" : null,
          formulas: i % 8 === 0 ? [
            "d/dx(xⁿ) = nxⁿ⁻¹",
            "d/dx(c) = 0",
            "d/dx(cf(x)) = c·f'(x)"
          ] : []
        }))
      }
    ]
  };

  const currentSection = testData.sections.find(section => section.id === activeSection);
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = currentSection?.questions.length || 0;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Auto-save functionality
    const saveInterval = setInterval(() => {
      localStorage.setItem('testProgress', JSON.stringify({
        selectedAnswers,
        numericAnswers,
        questionStatuses,
        currentQuestionIndex,
        activeSection,
        timestamp: Date.now()
      }));
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [selectedAnswers, numericAnswers, questionStatuses, currentQuestionIndex, activeSection]);

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem('testProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setSelectedAnswers(progress.selectedAnswers || {});
      setNumericAnswers(progress.numericAnswers || {});
      setQuestionStatuses(progress.questionStatuses || {});
      setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
      setActiveSection(progress.activeSection || 'physics');
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    const questionId = currentQuestion.id;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: 'answered'
    }));
  };

  const handleNumericAnswerChange = (value) => {
    const questionId = currentQuestion.id;
    setNumericAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    if (value.trim()) {
      setQuestionStatuses(prev => ({
        ...prev,
        [currentQuestionIndex]: 'answered'
      }));
    }
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
    
    // Mark as visited if not already marked
    if (!questionStatuses[index]) {
      setQuestionStatuses(prev => ({
        ...prev,
        [index]: 'not-visited'
      }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleMarkForReview = () => {
    const currentStatus = questionStatuses[currentQuestionIndex];
    const newStatus = currentStatus === 'marked' ? 'not-visited' : 'marked';
    
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: newStatus
    }));
  };

  const handleClearResponse = () => {
    const questionId = currentQuestion.id;
    
    if (currentQuestion.type === 'mcq') {
      setSelectedAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      });
    } else {
      setNumericAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      });
    }
    
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: 'not-visited'
    }));
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setCurrentQuestionIndex(0);
  };

  const handleTimeUp = () => {
    handleSubmitTest();
  };

  const handleSubmitTest = () => {
    // Calculate results
    const results = {
      selectedAnswers,
      numericAnswers,
      questionStatuses,
      submittedAt: new Date().toISOString(),
      testData
    };
    
    // Save results
    localStorage.setItem('testResults', JSON.stringify(results));
    
    // Clear progress
    localStorage.removeItem('testProgress');
    
    setIsTestSubmitted(true);
    
    // Navigate to results
    setTimeout(() => {
      navigate('/test-results');
    }, 2000);
  };

  const getCurrentAnswer = () => {
    const questionId = currentQuestion?.id;
    if (currentQuestion?.type === 'mcq') {
      return selectedAnswers[questionId] || '';
    } else {
      return numericAnswers[questionId] || '';
    }
  };

  const isMarkedForReview = questionStatuses[currentQuestionIndex] === 'marked';

  // Show submission confirmation
  if (isTestSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Check" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Test Submitted Successfully!
          </h2>
          <p className="text-text-secondary">
            Redirecting to results page...
          </p>
        </div>
      </div>
    );
  }

  // Mobile interface
  if (isMobile) {
    return (
      <MobileTestInterface
        currentQuestion={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        selectedAnswer={currentQuestion?.type === 'mcq' ? getCurrentAnswer() : ''}
        numericAnswer={currentQuestion?.type === 'numeric' ? getCurrentAnswer() : ''}
        onAnswerSelect={handleAnswerSelect}
        onNumericAnswerChange={handleNumericAnswerChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onMarkForReview={handleMarkForReview}
        onClearResponse={handleClearResponse}
        isMarkedForReview={isMarkedForReview}
        timeRemaining={180 * 60} // Mock time remaining
        onSubmitTest={handleSubmitTest}
      />
    );
  }

  // Desktop interface
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-80 pt-16">
        <Breadcrumb />
        
        <TestHeader
          testName={testData.name}
          sections={testData.sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          duration={testData.duration}
          onTimeUp={handleTimeUp}
          onSubmitTest={handleSubmitTest}
        />

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            {/* Question Panel */}
            <div className="col-span-7">
              <QuestionPanel
                currentQuestion={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onMarkForReview={handleMarkForReview}
                onClearResponse={handleClearResponse}
                isMarkedForReview={isMarkedForReview}
              />
            </div>

            {/* Answer Palette */}
            <div className="col-span-3">
              <AnswerPalette
                currentQuestion={currentQuestion}
                selectedAnswer={currentQuestion?.type === 'mcq' ? getCurrentAnswer() : ''}
                numericAnswer={currentQuestion?.type === 'numeric' ? getCurrentAnswer() : ''}
                onAnswerSelect={handleAnswerSelect}
                onNumericAnswerChange={handleNumericAnswerChange}
              />
            </div>

            {/* Navigation Sidebar */}
            <div className="col-span-2">
              <NavigationSidebar
                questions={currentSection?.questions || []}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionSelect={handleQuestionNavigation}
                questionStatuses={questionStatuses}
                onSubmitTest={handleSubmitTest}
              />
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
};

export default TestInterface;