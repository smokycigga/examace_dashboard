import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistant from '../../components/ui/AIAssistant';
import WelcomeCard from './components/WelcomeCard';
import ProgressChart from './components/ProgressChart';
import AccuracySnapshot from './components/AccuracySnapshot';
import WeakAreasCard from './components/WeakAreasCard';
import StrengthsCard from './components/StrengthsCard';
import QuickTestGenerator from './components/QuickTestGenerator';
import RecentActivity from './components/RecentActivity';
import StreakTracker from './components/StreakTracker';
import LeaderboardWidget from './components/LeaderboardWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { generateStudyPlan, generateMotivation } from '../../services/geminiService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [aiStudyPlan, setAiStudyPlan] = useState(null);

  // Enhanced mock data with AI integration
  const mockDashboardData = {
    user: {
      name: "Arjun Sharma",
      currentStreak: 12,
      totalTests: 47,
      currentRank: 1247,
      averageScore: 85
    },
    progressData: [
      { date: "15/11", score: 65 },
      { date: "17/11", score: 72 },
      { date: "19/11", score: 68 },
      { date: "21/11", score: 78 },
      { date: "23/11", score: 75 },
      { date: "25/11", score: 82 },
      { date: "27/11", score: 79 },
      { date: "29/11", score: 85 },
      { date: "01/12", score: 88 },
      { date: "03/12", score: 91 }
    ],
    accuracyData: {
      correct: 142,
      incorrect: 58,
      skipped: 25,
      totalQuestions: 225
    },
    weakAreas: [
      {
        name: "Thermodynamics",
        subject: "Physics",
        accuracy: 45,
        questionsAttempted: 32,
        averageTime: 145
      },
      {
        name: "Organic Chemistry",
        subject: "Chemistry", 
        accuracy: 52,
        questionsAttempted: 28,
        averageTime: 132
      },
      {
        name: "Coordinate Geometry",
        subject: "Mathematics",
        accuracy: 58,
        questionsAttempted: 24,
        averageTime: 178
      }
    ],
    strengths: [
      {
        name: "Mechanics",
        subject: "Physics",
        accuracy: 92,
        questionsAttempted: 45,
        averageTime: 98
      },
      {
        name: "Algebra",
        subject: "Mathematics",
        accuracy: 89,
        questionsAttempted: 38,
        averageTime: 87
      },
      {
        name: "Inorganic Chemistry",
        subject: "Chemistry",
        accuracy: 85,
        questionsAttempted: 42,
        averageTime: 105
      }
    ],
    recentActivities: [
      {
        type: "test_completed",
        title: "Mock Test #47 Completed",
        description: "Scored 91% in JEE Main Practice Test",
        timestamp: new Date(Date.now() - 1800000),
        clickable: true,
        testId: "test_47"
      },
      {
        type: "ai_recommendation",
        title: "AI Study Plan Updated",
        description: "Personalized plan for Thermodynamics improvement",
        timestamp: new Date(Date.now() - 3600000),
        clickable: true
      },
      {
        type: "achievement_unlocked",
        title: "Achievement Unlocked!",
        description: "Completed 12-day study streak",
        timestamp: new Date(Date.now() - 7200000),
        clickable: false
      },
      {
        type: "weak_area_identified",
        title: "Weak Area Identified",
        description: "AI detected pattern in Organic Chemistry reactions",
        timestamp: new Date(Date.now() - 10800000),
        clickable: true
      }
    ],
    streakData: {
      currentStreak: 12,
      dailyGoal: 2,
      completedToday: 1
    },
    leaderboard: {
      userRank: 1247,
      userScore: 85,
      topPerformers: [
        { name: 'Rahul Kumar', score: 95, rank: 1 },
        { name: 'Priya Sharma', score: 92, rank: 2 },
        { name: 'Amit Singh', score: 90, rank: 3 }
      ]
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadMotivationalQuote();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDashboardData(mockDashboardData);
      
      // Generate AI study plan based on performance
      const studyPlan = await generateStudyPlan({
        weakAreas: mockDashboardData.weakAreas,
        strengths: mockDashboardData.strengths,
        averageStudyTime: '3-4 hours',
        testFrequency: 'Daily',
        targetExam: 'JEE Main/Advanced'
      });
      
      setAiStudyPlan(studyPlan);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to mock data
      setDashboardData(mockDashboardData);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMotivationalQuote = async () => {
    try {
      const motivation = await generateMotivation('daily_motivation');
      setMotivationalQuote(motivation.content);
    } catch (error) {
      console.error('Error loading motivational quote:', error);
      setMotivationalQuote("Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill");
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'new_test': navigate('/test-generator');
        break;
      case 'view_results': navigate('/test-results');
        break;
      case 'study_plan': navigate('/ai-study-planner');
        break;
      case 'test_history': navigate('/test-history');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pt-16">
        <Breadcrumb />
        
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WelcomeCard
                userName={dashboardData?.user?.name || "Student"}
                currentStreak={dashboardData?.user?.currentStreak || 0}
                totalTests={dashboardData?.user?.totalTests || 0}
                currentRank={dashboardData?.user?.currentRank || 0}
              />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-accent-50 to-warning-50 rounded-academic-lg p-6 border border-accent-200 h-full flex flex-col justify-center">
                <div className="text-center">
                  <Icon name="Target" size={32} className="text-accent mx-auto mb-3" />
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    Daily Goal
                  </h3>
                  <p className="text-text-secondary font-caption text-sm mb-4">
                    Complete 2 practice tests today
                  </p>
                  <div className="w-full bg-white rounded-full h-2 mb-3">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-text-muted font-caption">
                    {dashboardData?.streakData?.completedToday || 1} of {dashboardData?.streakData?.dailyGoal || 2} tests completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressChart 
              progressData={dashboardData?.progressData || []}
              isLoading={isLoading}
            />
            <AccuracySnapshot 
              accuracyData={dashboardData?.accuracyData || { correct: 0, incorrect: 0, skipped: 0 }}
              isLoading={isLoading}
            />
          </div>

          {/* Performance Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeakAreasCard 
              weakAreas={dashboardData?.weakAreas || []}
              isLoading={isLoading}
            />
            <StrengthsCard 
              strengths={dashboardData?.strengths || []}
              isLoading={isLoading}
            />
          </div>

          {/* Streak & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StreakTracker 
              streak={dashboardData?.streakData?.currentStreak || 0}
              dailyGoal={dashboardData?.streakData?.dailyGoal || 2}
              completedToday={dashboardData?.streakData?.completedToday || 1}
            />
            <LeaderboardWidget 
              userRank={dashboardData?.leaderboard?.userRank || 1247}
              userScore={dashboardData?.leaderboard?.userScore || 85}
              topPerformers={dashboardData?.leaderboard?.topPerformers || []}
            />
          </div>

          {/* Quick Actions & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickTestGenerator />
            <RecentActivity 
              activities={dashboardData?.recentActivities || []}
              isLoading={isLoading}
            />
          </div>

          {/* AI Study Plan Section */}
          {aiStudyPlan && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-academic-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Icon name="Brain" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      AI Study Plan for the Week
                    </h3>
                    <p className="text-text-secondary font-caption text-sm">
                      Personalized recommendations based on your performance
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/ai-study-planner')}
                  iconName="ExternalLink"
                  iconSize={16}
                >
                  View Full Plan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2">Focus Areas</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {aiStudyPlan?.focusAreas?.slice(0, 3).map((area, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2">Today's Schedule</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {aiStudyPlan?.dailySchedule?.slice(0, 3).map((task, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-primary" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-20"
                onClick={() => handleQuickAction('new_test')}
              >
                <Icon name="Plus" size={20} className="text-primary" />
                <span className="text-sm font-caption">New Test</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-20"
                onClick={() => handleQuickAction('view_results')}
              >
                <Icon name="BarChart3" size={20} className="text-success" />
                <span className="text-sm font-caption">Results</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-20"
                onClick={() => handleQuickAction('study_plan')}
              >
                <Icon name="Brain" size={20} className="text-accent" />
                <span className="text-sm font-caption">AI Plan</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-20"
                onClick={() => handleQuickAction('test_history')}
              >
                <Icon name="History" size={20} className="text-secondary" />
                <span className="text-sm font-caption">History</span>
              </Button>
            </div>
          </div>

          {/* AI-Powered Motivational Quote */}
          <div className="bg-gradient-to-r from-primary to-primary-600 rounded-academic-lg p-6 text-center">
            <Icon name="Quote" size={24} className="text-primary-200 mx-auto mb-3" />
            <blockquote className="text-lg font-heading font-medium text-white mb-2">
              {motivationalQuote || "Success is not final, failure is not fatal: it is the courage to continue that counts."}
            </blockquote>
            <cite className="text-primary-200 font-caption text-sm">
              - Powered by AI
            </cite>
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default Dashboard;