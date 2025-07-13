import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { generateEnhancedStudyPlan, generatePersonalizedMotivation } from '../../services/openRouterService';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WeeklyPlanCard from './components/WeeklyPlanCard';
import CalendarView from './components/CalendarView';
import AIRecommendations from './components/AIRecommendations';
import ProgressAnalytics from './components/ProgressAnalytics';
import StudyStreakTracker from './components/StudyStreakTracker';

const AIStudyPlanner = () => {
  const navigate = useNavigate();
  const { profile, performanceData, studyPlan, setStudyPlan } = useUserContext();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, analytics
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [aiMotivation, setAiMotivation] = useState(null);

  // Mock data for study plan
  const mockWeeks = [
    {
      id: 1,
      title: "Week 1: Foundation Building",
      dateRange: "Dec 16 - Dec 22, 2024",
      totalHours: 42,
      focusAreas: ["Physics Mechanics", "Organic Chemistry"],
      badge: { type: 'streak', text: '7-day streak' },
      days: [
        {
          id: 1,
          name: "Monday",
          date: "2024-12-16",
          tasks: [
            {
              id: 1,
              title: "Newton\'s Laws - Theory",
              duration: "2 hours",
              type: "theory",
              completed: true
            },
            {
              id: 2,
              title: "Mechanics Practice Problems",
              duration: "1.5 hours",
              type: "practice",
              completed: true
            },
            {
              id: 3,
              title: "Organic Chemistry - Basics",
              duration: "2 hours",
              type: "theory",
              completed: false
            }
          ]
        },
        {
          id: 2,
          name: "Tuesday",
          date: "2024-12-17",
          tasks: [
            {
              id: 4,
              title: "Force and Motion Mock Test",
              duration: "1 hour",
              type: "test",
              completed: true
            },
            {
              id: 5,
              title: "Alkanes and Alkenes",
              duration: "2.5 hours",
              type: "theory",
              completed: false
            }
          ]
        },
        {
          id: 3,
          name: "Wednesday",
          date: "2024-12-18",
          tasks: [
            {
              id: 6,
              title: "Previous Year Questions - Mechanics",
              duration: "2 hours",
              type: "practice",
              completed: false
            },
            {
              id: 7,
              title: "Reaction Mechanisms",
              duration: "1.5 hours",
              type: "theory",
              completed: false
            }
          ]
        },
        {
          id: 4,
          name: "Thursday",
          date: "2024-12-19",
          tasks: [
            {
              id: 8,
              title: "Mathematics - Calculus Basics",
              duration: "2 hours",
              type: "theory",
              completed: false
            },
            {
              id: 9,
              title: "Chemistry Revision",
              duration: "1 hour",
              type: "review",
              completed: false
            }
          ]
        },
        {
          id: 5,
          name: "Friday",
          date: "2024-12-20",
          tasks: [
            {
              id: 10,
              title: "Full Length Mock Test",
              duration: "3 hours",
              type: "test",
              completed: false
            }
          ]
        },
        {
          id: 6,
          name: "Saturday",
          date: "2024-12-21",
          tasks: [
            {
              id: 11,
              title: "Test Analysis and Review",
              duration: "2 hours",
              type: "review",
              completed: false
            },
            {
              id: 12,
              title: "Weak Areas Practice",
              duration: "2 hours",
              type: "practice",
              completed: false
            }
          ]
        },
        {
          id: 7,
          name: "Sunday",
          date: "2024-12-22",
          tasks: [
            {
              id: 13,
              title: "Weekly Revision",
              duration: "3 hours",
              type: "review",
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Week 2: Advanced Concepts",
      dateRange: "Dec 23 - Dec 29, 2024",
      totalHours: 45,
      focusAreas: ["Thermodynamics", "Coordination Chemistry"],
      badge: { type: 'improvement', text: '+15% improvement' },
      days: [
        {
          id: 8,
          name: "Monday",
          date: "2024-12-23",
          tasks: [
            {
              id: 14,
              title: "Thermodynamics Laws",
              duration: "2.5 hours",
              type: "theory",
              completed: false
            },
            {
              id: 15,
              title: "Heat Engine Problems",
              duration: "2 hours",
              type: "practice",
              completed: false
            }
          ]
        },
        {
          id: 9,
          name: "Tuesday",
          date: "2024-12-24",
          tasks: [
            {
              id: 16,
              title: "Coordination Compounds",
              duration: "2 hours",
              type: "theory",
              completed: false
            },
            {
              id: 17,
              title: "Isomerism Practice",
              duration: "1.5 hours",
              type: "practice",
              completed: false
            }
          ]
        },
        {
          id: 10,
          name: "Wednesday",
          date: "2024-12-25",
          tasks: [
            {
              id: 18,
              title: "Holiday Break - Light Study",
              duration: "1 hour",
              type: "review",
              completed: false
            }
          ]
        },
        {
          id: 11,
          name: "Thursday",
          date: "2024-12-26",
          tasks: [
            {
              id: 19,
              title: "Mathematics - Integration",
              duration: "2.5 hours",
              type: "theory",
              completed: false
            },
            {
              id: 20,
              title: "Physics Problem Solving",
              duration: "2 hours",
              type: "practice",
              completed: false
            }
          ]
        },
        {
          id: 12,
          name: "Friday",
          date: "2024-12-27",
          tasks: [
            {
              id: 21,
              title: "Chemistry Mock Test",
              duration: "2 hours",
              type: "test",
              completed: false
            },
            {
              id: 22,
              title: "Error Analysis",
              duration: "1 hour",
              type: "review",
              completed: false
            }
          ]
        },
        {
          id: 13,
          name: "Saturday",
          date: "2024-12-28",
          tasks: [
            {
              id: 23,
              title: "Previous Year Paper",
              duration: "3 hours",
              type: "test",
              completed: false
            }
          ]
        },
        {
          id: 14,
          name: "Sunday",
          date: "2024-12-29",
          tasks: [
            {
              id: 24,
              title: "Week 2 Comprehensive Review",
              duration: "3 hours",
              type: "review",
              completed: false
            }
          ]
        }
      ]
    }
  ];

  const mockRecommendations = [
    {
      id: 1,
      type: 'focus',
      priority: 'high',
      title: 'Focus on Physics Mechanics',
      description: 'Your recent test shows 45% accuracy in mechanics. Spend extra time on Newton\'s laws and force analysis.',
      estimatedTime: '3-4 hours',
      expectedImprovement: '20',
      analysis: `Based on your last 5 test attempts, mechanics consistently shows the lowest accuracy rate. The main issues are:\n\n1. Conceptual gaps in force analysis\n2. Difficulty with free body diagrams\n3. Mathematical errors in problem solving\n\nFocusing on these areas will significantly improve your overall Physics score.`,
      actionItems: [
        'Review Newton\'s laws with practical examples',
        'Practice 20 force analysis problems daily',
        'Watch recommended video lectures on free body diagrams',
        'Solve previous year questions on mechanics'
      ],
      resources: [
        { title: 'Mechanics Video Series', url: 'https://example.com/mechanics' },
        { title: 'Practice Problem Set', url: 'https://example.com/problems' },
        { title: 'Concept Notes PDF', url: 'https://example.com/notes' }
      ]
    },
    {
      id: 2,
      type: 'practice',
      priority: 'medium',
      title: 'Increase Organic Chemistry Practice',
      description: 'Good theoretical understanding but need more problem-solving practice for reaction mechanisms.',
      estimatedTime: '2-3 hours',
      expectedImprovement: '15',
      analysis: 'Your organic chemistry theory is strong (78% accuracy) but practical application needs work. Focus on reaction mechanisms and synthesis problems.',
      actionItems: [
        'Solve 15 reaction mechanism problems daily',
        'Practice synthesis pathways',
        'Review named reactions'
      ],
      resources: [
        { title: 'Organic Reactions Guide', url: 'https://example.com/organic' },
        { title: 'Synthesis Problems', url: 'https://example.com/synthesis' }
      ]
    },
    {
      id: 3,
      type: 'test',
      priority: 'low',
      title: 'Take More Timed Tests',
      description: 'Your accuracy is good but speed needs improvement. Take more timed sectional tests.',
      estimatedTime: '1 hour daily',
      expectedImprovement: '10',
      analysis: 'Time management is affecting your overall performance. Regular timed practice will help build speed without compromising accuracy.',
      actionItems: [
        'Take daily 1-hour sectional tests',
        'Practice time allocation strategies',
        'Review time management techniques'
      ],
      resources: [
        { title: 'Timed Test Series', url: 'https://example.com/tests' }
      ]
    }
  ];

  const mockAnalyticsData = {
    weeklyGoalCompletion: 78,
    completedTasks: 23,
    totalTasks: 30,
    studyHoursThisWeek: 28,
    averageDaily: 4.2,
    improvementRate: 12,
    weeklyTrend: [
      { week: 'Week 1', completion: 65, accuracy: 72 },
      { week: 'Week 2', completion: 78, accuracy: 75 },
      { week: 'Week 3', completion: 82, accuracy: 78 },
      { week: 'Week 4', completion: 78, accuracy: 80 }
    ],
    timeStats: [
      { label: 'Daily Average', value: '4.2h', icon: 'Clock', description: 'Study time per day' },
      { label: 'Peak Hours', value: '6-9 PM', icon: 'TrendingUp', description: 'Most productive time' },
      { label: 'Efficiency', value: '85%', icon: 'Target', description: 'Task completion rate' },
      { label: 'Focus Time', value: '2.1h', icon: 'Brain', description: 'Deep work sessions' }
    ],
    dailyPattern: [
      { hour: '6 AM', minutes: 45 },
      { hour: '7 AM', minutes: 60 },
      { hour: '8 AM', minutes: 30 },
      { hour: '6 PM', minutes: 90 },
      { hour: '7 PM', minutes: 120 },
      { hour: '8 PM', minutes: 105 },
      { hour: '9 PM', minutes: 75 }
    ]
  };

  const mockStreakData = {
    currentStreak: 12,
    longestStreak: 28,
    monthlyStreak: 18,
    totalStudyDays: 156,
    nextMilestone: 15,
    calendar: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const isToday = i === 29;
      const isFuture = i > 29;
      const completed = !isFuture && Math.random() > 0.2; // 80% completion rate
      
      return {
        date: date.toISOString().split('T')[0],
        completed: completed && !isToday,
        isToday,
        isFuture
      };
    }),
    achievements: [
      { title: '7-Day Streak', description: 'Study for 7 consecutive days', icon: 'Flame', unlocked: true },
      { title: '30-Day Streak', description: 'Study for 30 consecutive days', icon: 'Award', unlocked: false },
      { title: 'Early Bird', description: 'Study before 8 AM for 5 days', icon: 'Sunrise', unlocked: true },
      { title: 'Night Owl', description: 'Study after 10 PM for 5 days', icon: 'Moon', unlocked: false },
      { title: 'Weekend Warrior', description: 'Study on weekends for 4 weeks', icon: 'Shield', unlocked: true }
    ]
  };

  const mockPerformanceData = {
    subjectWise: [
      { subject: 'Physics', score: 72 },
      { subject: 'Chemistry', score: 78 },
      { subject: 'Mathematics', score: 85 }
    ],
    taskDistribution: [
      { name: 'Theory', value: 35 },
      { name: 'Practice', value: 30 },
      { name: 'Tests', value: 20 },
      { name: 'Review', value: 15 }
    ],
    trends: [
      { date: 'Dec 1', physics: 68, chemistry: 72, mathematics: 80 },
      { date: 'Dec 8', physics: 70, chemistry: 75, mathematics: 82 },
      { date: 'Dec 15', physics: 72, chemistry: 78, mathematics: 85 },
      { date: 'Dec 22', physics: 74, chemistry: 80, mathematics: 87 }
    ]
  };

  const [weeks, setWeeks] = useState(mockWeeks);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set first week as selected by default
    if (weeks.length > 0) {
      setSelectedWeek(weeks[0]);
    }
    
    // Load personalized AI content on mount
    loadPersonalizedContent();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [weeks]);

  const loadPersonalizedContent = async () => {
    try {
      setIsLoadingRecommendations(true);
      
      // Generate personalized motivation
      const motivationContext = {
        mood: 'motivated',
        studyStreak: performanceData.studyStreak || 0,
        recentAchievement: performanceData.recentTests?.length > 0 ? 'recent_test_completion' : 'none',
        currentChallenge: performanceData.weakAreas?.[0]?.name || 'none',
        examDate: profile.examDate || 'Not set',
        progressLevel: profile.currentLevel || 'Intermediate'
      };
      
      const motivation = await generatePersonalizedMotivation(motivationContext);
      setAiMotivation(motivation);
      
      // Generate enhanced study plan if user data is available
      if (profile && performanceData) {
        const enhancedPlan = await generateEnhancedStudyPlan(profile, performanceData);
        setStudyPlan(enhancedPlan);
      }
    } catch (error) {
      console.error('Error loading personalized content:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleTaskToggle = (weekId, dayId, taskId) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => 
        week.id === weekId 
          ? {
              ...week,
              days: week.days.map(day => 
                day.id === dayId 
                  ? {
                      ...day,
                      tasks: day.tasks.map(task => 
                        task.id === taskId 
                          ? { ...task, completed: !task.completed }
                          : task
                      )
                    }
                  : day
              )
            }
          : week
      )
    );
  };

  const handleWeekSelect = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    setSelectedWeek(week);
  };

  const handleDateSelect = (date) => {
    // Handle calendar date selection
    console.log('Selected date:', date);
  };

  const handleTaskDrop = (taskData, newDate) => {
    // Handle drag and drop task rescheduling
    console.log('Moving task:', taskData, 'to date:', newDate);
  };

  const handleApplyRecommendation = (recommendation) => {
    // Handle applying AI recommendation
    console.log('Applying recommendation:', recommendation);
  };

  const handleDismissRecommendation = (recommendationId) => {
    // Handle dismissing recommendation
    console.log('Dismissing recommendation:', recommendationId);
  };

  const handleStreakGoalUpdate = () => {
    // Handle streak goal update
    console.log('Updating streak goal');
  };

  const renderMobileView = () => (
    <div className="space-y-6">
      {/* Personalized Motivation Banner */}
      {aiMotivation && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-academic-lg p-4 border border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Your Daily Inspiration</h3>
              <p className="text-sm text-text-secondary whitespace-pre-line">
                {aiMotivation.content?.split('\n')[0] || 'Keep pushing forward! Every study session brings you closer to your goals.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Selector */}
      <div className="flex space-x-1 bg-secondary-50 rounded-academic p-1">
        {[
          { id: 'timeline', label: 'Timeline', icon: 'List' },
          { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
          { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-academic-sm transition-all duration-200 ${
              viewMode === mode.id
                ? 'bg-surface text-primary shadow-academic'
                : 'text-text-secondary'
            }`}
          >
            <Icon name={mode.icon} size={16} />
            <span className="text-sm font-medium">{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on view mode */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          <StudyStreakTracker 
            streakData={mockStreakData}
            onStreakGoalUpdate={handleStreakGoalUpdate}
          />
          
          <AIRecommendations
            recommendations={mockRecommendations}
            onApplyRecommendation={handleApplyRecommendation}
            onDismissRecommendation={handleDismissRecommendation}
            isLoading={isLoadingRecommendations}
          />
          
          {weeks.map((week) => (
            <WeeklyPlanCard
              key={week.id}
              week={week}
              onTaskToggle={handleTaskToggle}
              onWeekSelect={handleWeekSelect}
              isSelected={selectedWeek?.id === week.id}
            />
          ))}
        </div>
      )}

      {viewMode === 'calendar' && (
        <CalendarView
          weeks={weeks}
          selectedWeek={selectedWeek}
          onDateSelect={handleDateSelect}
          onTaskDrop={handleTaskDrop}
        />
      )}

      {viewMode === 'analytics' && (
        <div className="space-y-6">
          <ProgressAnalytics
            analyticsData={mockAnalyticsData}
            streakData={mockStreakData}
            performanceData={mockPerformanceData}
          />
        </div>
      )}
    </div>
  );

  const renderDesktopView = () => (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Timeline and Recommendations */}
      <div className="col-span-4 space-y-6">
        {/* Personalized Motivation Banner */}
        {aiMotivation && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-academic-lg p-6 border border-primary/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Welcome back, {profile.name}!</h3>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {aiMotivation.content?.split('\n')[0] || 'Keep pushing forward! Every study session brings you closer to your goals.'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <StudyStreakTracker 
          streakData={mockStreakData}
          onStreakGoalUpdate={handleStreakGoalUpdate}
        />
        
        <AIRecommendations
          recommendations={mockRecommendations}
          onApplyRecommendation={handleApplyRecommendation}
          onDismissRecommendation={handleDismissRecommendation}
          isLoading={isLoadingRecommendations}
        />
        
        <div className="space-y-4">
          {weeks.map((week) => (
            <WeeklyPlanCard
              key={week.id}
              week={week}
              onTaskToggle={handleTaskToggle}
              onWeekSelect={handleWeekSelect}
              isSelected={selectedWeek?.id === week.id}
            />
          ))}
        </div>
      </div>

      {/* Right Column - Calendar and Analytics */}
      <div className="col-span-8 space-y-6">
        <CalendarView
          weeks={weeks}
          selectedWeek={selectedWeek}
          onDateSelect={handleDateSelect}
          onTaskDrop={handleTaskDrop}
        />
        
        <ProgressAnalytics
          analyticsData={mockAnalyticsData}
          streakData={mockStreakData}
          performanceData={mockPerformanceData}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header - Changed from sticky to relative positioning */}
      <div className="bg-surface border-b border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconSize={16}
              />
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  AI Study Planner
                </h1>
                <p className="text-text-secondary font-caption">
                  Personalized study roadmap powered by AI
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/test-generator')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                New Test
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadPersonalizedContent}
                iconName="RefreshCw"
                iconSize={16}
                disabled={isLoadingRecommendations}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
                iconName="Settings"
                iconSize={16}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>

      {/* Quick Actions FAB (Mobile) */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/test-generator')}
            className="rounded-full shadow-academic-lg"
            iconName="Plus"
            iconSize={24}
          />
        </div>
      )}
    </div>
  );
};

export default AIStudyPlanner;