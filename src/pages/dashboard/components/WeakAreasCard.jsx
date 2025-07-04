import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeakAreasCard = ({ weakAreas, isLoading }) => {
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

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 70) return 'text-success';
    if (accuracy >= 50) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyBgColor = (accuracy) => {
    if (accuracy >= 70) return 'bg-success-100';
    if (accuracy >= 50) return 'bg-warning-100';
    return 'bg-error-100';
  };

  const handlePracticeNow = (topic) => {
    navigate('/test-generator', { 
      state: { 
        preselectedTopic: topic.name,
        difficulty: 'Mixed',
        focusMode: true 
      }
    });
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
            Areas to Improve
          </h3>
          <p className="text-text-secondary font-caption text-sm">
            Focus on these topics for better scores
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/test-history')}
          iconName="ExternalLink"
          iconSize={14}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {weakAreas.map((area, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-secondary-50 rounded-academic hover:bg-secondary-100 transition-smooth"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className={`w-10 h-10 rounded-academic flex items-center justify-center ${getAccuracyBgColor(area.accuracy)}`}>
                <Icon 
                  name={getSubjectIcon(area.subject)} 
                  size={20} 
                  className={getAccuracyColor(area.accuracy)} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary text-sm mb-1">
                  {area.name}
                </h4>
                <div className="flex items-center space-x-3 text-xs text-text-secondary font-caption">
                  <span>{area.subject}</span>
                  <span>•</span>
                  <span>{area.questionsAttempted} questions</span>
                  <span>•</span>
                  <span>Avg: {area.averageTime}s</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-data font-bold ${getAccuracyColor(area.accuracy)}`}>
                  {area.accuracy}%
                </div>
                <div className="text-xs text-text-secondary font-caption">
                  Accuracy
                </div>
              </div>
            </div>
            <div className="ml-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handlePracticeNow(area)}
                iconName="Play"
                iconSize={14}
              >
                Practice
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-caption text-text-secondary">
              Recommended daily practice: 30 minutes
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/ai-study-planner')}
            iconName="Brain"
            iconSize={14}
          >
            AI Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeakAreasCard;