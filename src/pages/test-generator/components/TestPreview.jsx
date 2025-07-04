import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const TestPreview = ({ subjects, difficulty, testMode, duration, customDuration }) => {
  const selectedSubjects = Object.entries(subjects).filter(([_, config]) => config.selected);
  const totalQuestions = selectedSubjects.reduce((sum, [_, config]) => sum + config.questionCount, 0);
  
  const getEstimatedDuration = () => {
    if (testMode === 'untimed') return 'Unlimited';
    if (duration === 'custom') return `${customDuration} minutes`;
    return `${duration} minutes`;
  };

  const getTimePerQuestion = () => {
    if (testMode === 'untimed') return 'No limit';
    const totalMinutes = duration === 'custom' ? customDuration : duration;
    const timePerQuestion = Math.round((totalMinutes * 60) / totalQuestions);
    return `${Math.floor(timePerQuestion / 60)}:${(timePerQuestion % 60).toString().padStart(2, '0')} min`;
  };

  // Data for pie chart
  const pieData = selectedSubjects.map(([subject, config], index) => ({
    name: subject,
    value: config.questionCount,
    color: ['#3B82F6', '#10B981', '#8B5CF6', '#06B6D4'][index % 4]
  }));

  // Data for bar chart
  const barData = selectedSubjects.map(([subject, config]) => ({
    subject: subject.substring(0, 4),
    questions: config.questionCount
  }));

  const difficultyInfo = {
    easy: { label: 'Easy', color: 'text-green-600', bg: 'bg-green-50' },
    mixed: { label: 'Mixed', color: 'text-amber-600', bg: 'bg-amber-50' },
    advanced: { label: 'Advanced', color: 'text-red-600', bg: 'bg-red-50' }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Eye" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">Test Preview</h3>
      </div>

      {totalQuestions > 0 ? (
        <div className="space-y-6">
          {/* Test Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-50 p-4 rounded-academic border border-primary-200">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Total Questions</span>
              </div>
              <div className="text-2xl font-bold text-primary font-data">{totalQuestions}</div>
            </div>
            
            <div className="bg-accent-50 p-4 rounded-academic border border-accent-200">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Duration</span>
              </div>
              <div className="text-lg font-bold text-accent font-data">{getEstimatedDuration()}</div>
            </div>
          </div>

          {/* Test Details */}
          <div className="bg-surface p-4 rounded-academic border border-border">
            <h4 className="font-medium text-text-primary mb-3">Test Configuration</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Difficulty Level</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo[difficulty].bg} ${difficultyInfo[difficulty].color}`}>
                  {difficultyInfo[difficulty].label}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Test Mode</span>
                <span className="text-sm font-medium text-text-primary capitalize">{testMode}</span>
              </div>
              
              {testMode === 'timed' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Time per Question</span>
                  <span className="text-sm font-data text-text-primary">{getTimePerQuestion()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="bg-surface p-4 rounded-academic border border-border">
            <h4 className="font-medium text-text-primary mb-4">Subject Distribution</h4>
            
            {/* Pie Chart */}
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} questions`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-text-secondary">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Question Distribution Bar Chart */}
          <div className="bg-surface p-4 rounded-academic border border-border">
            <h4 className="font-medium text-text-primary mb-4">Questions per Subject</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} questions`, 'Questions']} />
                  <Bar dataKey="questions" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sample Questions Preview */}
          <div className="bg-surface p-4 rounded-academic border border-border">
            <h4 className="font-medium text-text-primary mb-3">Sample Question Types</h4>
            <div className="space-y-2">
              {selectedSubjects.slice(0, 2).map(([subject]) => (
                <div key={subject} className="flex items-center space-x-3 p-2 bg-secondary-50 rounded-academic-sm">
                  <Icon name="HelpCircle" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {subject} - Multiple choice questions with detailed explanations
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="FileQuestion" size={48} className="text-text-muted mx-auto mb-4" />
          <h4 className="font-medium text-text-primary mb-2">No Subjects Selected</h4>
          <p className="text-sm text-text-secondary">
            Select at least one subject to see the test preview
          </p>
        </div>
      )}
    </div>
  );
};

export default TestPreview;