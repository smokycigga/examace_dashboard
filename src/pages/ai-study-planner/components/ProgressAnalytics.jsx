import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressAnalytics = ({ analyticsData, streakData, performanceData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'streak', label: 'Study Streak', icon: 'Flame' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'time', label: 'Time Analysis', icon: 'Clock' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-academic p-3 shadow-academic">
          <p className="font-medium text-text-primary">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name.includes('Rate') || entry.name.includes('Score') ? '%' : 
               entry.name.includes('Time') ? ' min' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-academic-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Target" size={20} className="text-primary" />
            <span className="text-2xl font-bold text-primary font-data">
              {analyticsData.weeklyGoalCompletion}%
            </span>
          </div>
          <h4 className="font-medium text-text-primary">Weekly Goal</h4>
          <p className="text-sm text-text-secondary font-caption">
            {analyticsData.completedTasks}/{analyticsData.totalTasks} tasks completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-academic-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} className="text-success" />
            <span className="text-2xl font-bold text-success font-data">
              {analyticsData.studyHoursThisWeek}h
            </span>
          </div>
          <h4 className="font-medium text-text-primary">Study Hours</h4>
          <p className="text-sm text-text-secondary font-caption">
            {analyticsData.averageDaily}h daily average
          </p>
        </div>

        <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-academic-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} className="text-warning" />
            <span className="text-2xl font-bold text-warning font-data">
              +{analyticsData.improvementRate}%
            </span>
          </div>
          <h4 className="font-medium text-text-primary">Improvement</h4>
          <p className="text-sm text-text-secondary font-caption">
            vs last week
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-academic-lg border border-border p-6">
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          Weekly Progress Trend
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="week" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Completion Rate"
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Accuracy Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderStreak = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-warning-400 to-warning-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-academic-lg">
          <div className="text-center">
            <Icon name="Flame" size={32} className="text-white mb-1" />
            <div className="text-2xl font-bold text-white font-data">
              {streakData.currentStreak}
            </div>
            <div className="text-xs text-warning-100 font-caption">
              days
            </div>
          </div>
        </div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Current Study Streak
        </h3>
        <p className="text-text-secondary">
          Keep it up! You're on fire 🔥
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-academic-lg border border-border p-6">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Streak Statistics
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Longest Streak</span>
              <span className="font-bold text-text-primary font-data">
                {streakData.longestStreak} days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">This Month</span>
              <span className="font-bold text-text-primary font-data">
                {streakData.monthlyStreak} days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Study Days</span>
              <span className="font-bold text-text-primary font-data">
                {streakData.totalStudyDays} days
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-academic-lg border border-border p-6">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Achievements
          </h4>
          <div className="space-y-3">
            {streakData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? 'bg-success-100' : 'bg-secondary-100'
                }`}>
                  <Icon 
                    name={achievement.icon} 
                    size={16} 
                    className={achievement.unlocked ? 'text-success' : 'text-text-muted'} 
                  />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    achievement.unlocked ? 'text-text-primary' : 'text-text-muted'
                  }`}>
                    {achievement.title}
                  </p>
                  <p className="text-sm text-text-secondary font-caption">
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-academic-lg border border-border p-6">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Subject-wise Performance
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData.subjectWise}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="subject" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="score" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  name="Average Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface rounded-academic-lg border border-border p-6">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Task Distribution
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData.taskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-academic-lg border border-border p-6">
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          Performance Trends
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData.trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="physics" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Physics"
              />
              <Line 
                type="monotone" 
                dataKey="chemistry" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Chemistry"
              />
              <Line 
                type="monotone" 
                dataKey="mathematics" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Mathematics"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTimeAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.timeStats.map((stat, index) => (
          <div key={index} className="bg-surface rounded-academic-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={stat.icon} size={20} className="text-primary" />
              <span className="text-lg font-bold text-text-primary font-data">
                {stat.value}
              </span>
            </div>
            <h4 className="font-medium text-text-primary">{stat.label}</h4>
            <p className="text-sm text-text-secondary font-caption">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-academic-lg border border-border p-6">
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          Daily Study Pattern
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.dailyPattern}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="hour" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="minutes" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                name="Study Time"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'streak': return renderStreak();
      case 'performance': return renderPerformance();
      case 'time': return renderTimeAnalysis();
      default: return renderOverview();
    }
  };

  return (
    <div className="bg-surface rounded-academic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Progress Analytics
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          iconName="Download"
          iconSize={16}
        >
          Export Report
        </Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-secondary-50 rounded-academic p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-academic-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-surface text-primary shadow-academic'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="font-medium text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default ProgressAnalytics;