import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StrengthsCard = ({ strengths, isLoading }) => {
  const navigate = useNavigate();

  const getSubjectIcon = (subject) => {
    const icons = {
      'Physics': 'Atom',
      'Chemistry': 'FlaskConical',
      'Mathematics': 'Calculator',
      'Biology': 'Microscope'
    };
    return icons[subject] || 'BookOpen';
  };

  const getPerformanceLevel = (accuracy) => {
    if (accuracy >= 90) return { label: 'Excellent', color: 'text-success', bg: 'bg-success-100' };
    if (accuracy >= 80) return { label: 'Good', color: 'text-primary', bg: 'bg-primary-100' };
    return { label: 'Average', color: 'text-warning', bg: 'bg-warning-100' };
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
        <div className="h-6 bg-secondary-200 rounded w-32 animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-secondary-50 rounded-academic animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-200 rounded"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-secondary-200 rounded w-24"></div>
                  <div className="h-3 bg-secondary-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-8 bg-secondary-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Your Strengths
          </h3>
          <p className="text-text-secondary font-caption text-sm">
            Topics where you excel
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Trophy" size={16} className="text-accent" />
          <span className="text-sm font-data font-semibold text-accent">
            Top 3
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {strengths.map((strength, index) => {
          const performance = getPerformanceLevel(strength.accuracy);
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-success-50 to-primary-50 rounded-academic border border-success-200"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-academic flex items-center justify-center ${performance.bg}`}>
                    <Icon 
                      name={getSubjectIcon(strength.subject)} 
                      size={20} 
                      className={performance.color} 
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-sm mb-1">
                    {strength.name}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-text-secondary font-caption">
                    <span>{strength.subject}</span>
                    <span>•</span>
                    <span>{strength.questionsAttempted} questions</span>
                    <span>•</span>
                    <span>Avg: {strength.averageTime}s</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-data font-bold ${performance.color}`}>
                    {strength.accuracy}%
                  </div>
                  <div className={`text-xs font-caption ${performance.color}`}>
                    {performance.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-academic p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lightbulb" size={16} className="text-primary" />
            <span className="font-medium text-sm text-text-primary">
              Leverage Your Strengths
            </span>
          </div>
          <p className="text-xs text-text-secondary mb-3">
            Use these strong areas to boost confidence and maintain momentum in challenging tests.
          </p>
          <div className="flex space-x-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/test-generator', { 
                state: { 
                  strengthMode: true,
                  preselectedTopics: strengths.map(s => s.name)
                }
              })}
              iconName="Zap"
              iconSize={14}
            >
              Quick Review
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/ai-study-planner')}
              iconName="Calendar"
              iconSize={14}
            >
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthsCard;