import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistant from '../../components/ui/AIAssistant';
import OverallScoreCard from './components/OverallScoreCard';
import SubjectBreakdown from './components/SubjectBreakdown';
import TimeAnalysis from './components/TimeAnalysis';
import AccuracyMetrics from './components/AccuracyMetrics';
import WeakAreasAnalysis from './components/WeakAreasAnalysis';
import StrengthsHighlight from './components/StrengthsHighlight';
import ActionButtons from './components/ActionButtons';

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Mock test result data
  const testResult = {
    testId: "TEST_2024_001",
    testName: "JEE Main Mock Test - Physics & Chemistry",
    date: "2024-01-15",
    duration: "3 hours",
    totalQuestions: 90,
    correctAnswers: 68,
    incorrectAnswers: 15,
    skippedQuestions: 7,
    overallPercentage: 76,
    accuracy: 82,
    rank: 1247,
    timeTaken: "2h 45m",
    totalTime: "3h 00m",
    improvement: 8
  };

  const subjectData = [
    {
      name: "Physics",
      total: 30,
      attempted: 28,
      correct: 22,
      incorrect: 6,
      skipped: 2,
      percentage: 79,
      avgTimePerQuestion: "1:45",
      weakTopics: ["Thermodynamics", "Waves"]
    },
    {
      name: "Chemistry",
      total: 30,
      attempted: 29,
      correct: 24,
      incorrect: 5,
      skipped: 1,
      percentage: 83,
      avgTimePerQuestion: "1:30",
      weakTopics: ["Organic Reactions"]
    },
    {
      name: "Mathematics",
      total: 30,
      attempted: 27,
      correct: 22,
      incorrect: 4,
      skipped: 4,
      percentage: 81,
      avgTimePerQuestion: "2:10",
      weakTopics: ["Coordinate Geometry", "Probability"]
    }
  ];

  const timeData = {
    physics: 52,
    chemistry: 45,
    mathematics: 65,
    biology: 0,
    quick: 25,
    normal: 45,
    slow: 20,
    fastestSubject: "Chemistry",
    fastestTime: "1:30",
    timeSaved: 15,
    efficiencyScore: 85
  };

  const accuracyData = {
    correct: 68,
    incorrect: 15,
    skipped: 7,
    easy: { correct: 28, total: 30, percentage: 93 },
    medium: { correct: 32, total: 40, percentage: 80 },
    hard: { correct: 8, total: 20, percentage: 40 },
    bestSubject: "Chemistry",
    bestAccuracy: 83,
    weakestSubject: "Physics",
    weakestAccuracy: 79,
    improvement: 8,
    consistencyScore: 78,
    recommendations: [
      {
        title: "Focus on Hard Questions",
        description: "Your accuracy drops significantly on hard questions. Practice more challenging problems daily."
      },
      {
        title: "Maintain Easy Question Accuracy",
        description: "Excellent performance on easy questions. Keep this consistency to secure maximum marks."
      },
      {
        title: "Time Management",
        description: "You\'re spending optimal time per question. Continue this balanced approach."
      }
    ]
  };

  const weakAreas = [
    {
      subject: "Physics",
      topic: "Thermodynamics",
      chapter: "Heat and Temperature",
      accuracy: 45,
      attempted: 8,
      avgTime: "2:30",
      masteryLevel: 35,
      priority: "High",
      commonMistakes: [
        "Confusion between heat and temperature concepts",
        "Incorrect application of first law of thermodynamics",
        "Sign convention errors in work calculations"
      ],
      recommendations: [
        "Review fundamental concepts of heat and temperature",
        "Practice more problems on thermodynamic processes",
        "Focus on sign conventions and their applications"
      ]
    },
    {
      subject: "Chemistry",
      topic: "Organic Reactions",
      chapter: "Hydrocarbons",
      accuracy: 60,
      attempted: 10,
      avgTime: "1:50",
      masteryLevel: 55,
      priority: "Medium",
      commonMistakes: [
        "Incorrect identification of reaction mechanisms",
        "Confusion in stereochemistry concepts",
        "Wrong prediction of major products"
      ],
      recommendations: [
        "Create reaction mechanism flowcharts",
        "Practice stereochemistry problems daily",
        "Use molecular models for better visualization"
      ]
    },
    {
      subject: "Mathematics",
      topic: "Coordinate Geometry",
      chapter: "Straight Lines and Circles",
      accuracy: 55,
      attempted: 12,
      avgTime: "2:45",
      masteryLevel: 45,
      priority: "High",
      commonMistakes: [
        "Calculation errors in distance formulas",
        "Incorrect slope calculations",
        "Wrong application of circle equations"
      ],
      recommendations: [
        "Practice basic coordinate geometry formulas",
        "Solve more problems on circle properties",
        "Focus on accuracy in calculations"
      ]
    }
  ];

  const strengths = [
    {
      subject: "Chemistry",
      topic: "Inorganic Chemistry",
      accuracy: 92,
      questionsCorrect: 11,
      avgTime: "1:20"
    },
    {
      subject: "Mathematics",
      topic: "Algebra",
      accuracy: 88,
      questionsCorrect: 14,
      avgTime: "1:45"
    },
    {
      subject: "Physics",
      topic: "Mechanics",
      accuracy: 85,
      questionsCorrect: 17,
      avgTime: "1:35"
    },
    {
      subject: "Chemistry",
      topic: "Physical Chemistry",
      accuracy: 83,
      questionsCorrect: 10,
      avgTime: "1:40"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRetakeTest = () => {
    navigate('/test-generator', { 
      state: { 
        retakeConfig: {
          subjects: ['Physics', 'Chemistry', 'Mathematics'],
          difficulty: 'Mixed',
          duration: 180,
          questionCount: 90
        }
      }
    });
  };

  const handleReviewSolutions = () => {
    // Navigate to solutions review page or open modal
    console.log('Opening solutions review...');
  };

  const handleShareResults = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Test Results - ExamAce',
          text: `I scored ${testResult.overallPercentage}% in my recent mock test! 🎉`,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(
          `Check out my test results: ${testResult.overallPercentage}% score with rank #${testResult.rank}! ${window.location.href}`
        );
        alert('Results link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };

  const handleExportReport = async () => {
    // Simulate PDF generation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Generating PDF report...');
        // In a real app, this would generate and download a PDF
        const link = document.createElement('a');
        link.href = '#';
        link.download = `test-results-${testResult.testId}.pdf`;
        link.click();
        resolve();
      }, 2000);
    });
  };

  const handleStudyMaterial = (topic, subject) => {
    navigate('/ai-study-planner', {
      state: {
        focusTopic: topic,
        subject: subject
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <div className="lg:ml-80 pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary font-caption">Loading test results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-80 pt-16">
        <Breadcrumb />
        
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                Test Results
              </h1>
              <p className="text-text-secondary font-caption mt-1">
                {testResult.testName} • {testResult.date}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                Completed
              </span>
              <span className="text-sm text-text-muted font-caption">
                Test ID: {testResult.testId}
              </span>
            </div>
          </div>

          {/* Overall Score Card */}
          <OverallScoreCard testResult={testResult} />

          {/* Subject Breakdown and Time Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SubjectBreakdown subjects={subjectData} />
            <TimeAnalysis timeData={timeData} />
          </div>

          {/* Accuracy Metrics */}
          <AccuracyMetrics accuracyData={accuracyData} />

          {/* Strengths and Weak Areas */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <StrengthsHighlight strengths={strengths} />
            <WeakAreasAnalysis 
              weakAreas={weakAreas} 
              onStudyMaterial={handleStudyMaterial}
            />
          </div>

          {/* Action Buttons */}
          <ActionButtons
            testId={testResult.testId}
            onRetakeTest={handleRetakeTest}
            onReviewSolutions={handleReviewSolutions}
            onShareResults={handleShareResults}
            onExportReport={handleExportReport}
          />
        </main>
      </div>

      <AIAssistant />
    </div>
  );
};

export default TestResults;