import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities, isLoading }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    const icons = {
      'test_completed': 'CheckCircle',
      'test_started': 'Play',
      'ai_recommendation': 'Brain',
      'study_plan_updated': 'Calendar',
      'achievement_unlocked': 'Trophy',
      'weak_area_identified': 'Target'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'test_completed': 'text-success',
      'test_started': 'text-primary',
      'ai_recommendation': 'text-accent',
      'study_plan_updated': 'text-purple-600',
      'achievement_unlocked': 'text-yellow-600',
      'weak_area_identified': 'text-error'
    };
    return colors[type] || 'text-text-secondary';
  };

  const getActivityBg = (type) => {
    const backgrounds = {
      'test_completed': 'bg-success-50',
      'test_started': 'bg-primary-50',
      'ai_recommendation': 'bg-accent-50',
      'study_plan_updated': 'bg-purple-50',
      'achievement_unlocked': 'bg-yellow-50',
      'weak_area_identified': 'bg-error-50'
    };
    return backgrounds[type] || 'bg-secondary-50';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleActivityClick = (activity) => {
    switch (activity.type) {
      case 'test_completed':
        navigate('/test-results', { state: { testId: activity.testId } });
        break;
      case 'test_started': navigate('/test-interface', { state: { testId: activity.testId } });
        break;
      case 'ai_recommendation': navigate('/ai-study-planner');
        break;
      case 'study_plan_updated': navigate('/ai-study-planner');
        break;
      case 'weak_area_identified':
        navigate('/test-history');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
        <div className="h-6 bg-secondary-200 rounded w-32 animate-pulse mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-academic animate-pulse">
              <div className="w-8 h-8 bg-secondary-200 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              </div>
              <div className="h-3 bg-secondary-200 rounded w-12"></div>
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
            Recent Activity
          </h3>
          <p className="text-text-secondary font-caption text-sm">
            Your latest learning activities
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

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            onClick={() => handleActivityClick(activity)}
            className={`flex items-center space-x-3 p-3 rounded-academic cursor-pointer transition-smooth hover:bg-secondary-50 ${
              activity.clickable ? 'hover:shadow-academic' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityBg(activity.type)}`}>
              <Icon 
                name={getActivityIcon(activity.type)} 
                size={16} 
                className={getActivityColor(activity.type)} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary mb-1">
                {activity.title}
              </p>
              <p className="text-xs text-text-secondary font-caption">
                {activity.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-muted font-caption">
                {formatTimeAgo(activity.timestamp)}
              </span>
              {activity.clickable && (
                <Icon name="ChevronRight" size={14} className="text-text-muted" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-caption text-text-secondary">
              You're on a 5-day learning streak!
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={14} className="text-accent" />
            <span className="text-sm font-data font-semibold text-accent">
              5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;