import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestHistoryCard = ({ test, onReview, onRetake }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success-50 border-success-200';
    if (score >= 60) return 'bg-warning-50 border-warning-200';
    return 'bg-error-50 border-error-200';
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-surface rounded-academic border border-border shadow-academic hover:shadow-academic-lg transition-smooth p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-text-primary text-lg mb-1">
            {test.name}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span className="font-caption">{test.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span className="font-caption">{formatDuration(test.duration)}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-academic border ${getScoreBgColor(test.score)}`}>
          <span className={`font-data font-semibold ${getScoreColor(test.score)}`}>
            {test.score}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-background rounded-academic-sm p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Accuracy</span>
          </div>
          <span className="text-lg font-data font-semibold text-text-primary">
            {test.accuracy}%
          </span>
        </div>
        <div className="bg-background rounded-academic-sm p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">Rank</span>
          </div>
          <span className="text-lg font-data font-semibold text-text-primary">
            #{test.rank.toLocaleString()}
          </span>
        </div>
      </div>

      {test.weakAreas && test.weakAreas.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
            <Icon name="AlertTriangle" size={14} className="text-warning mr-1" />
            Weak Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {test.weakAreas.slice(0, 3).map((area, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-error-50 text-error-700 rounded-academic-sm text-xs font-caption"
              >
                {area}
              </span>
            ))}
            {test.weakAreas.length > 3 && (
              <span className="px-2 py-1 bg-secondary-100 text-text-secondary rounded-academic-sm text-xs font-caption">
                +{test.weakAreas.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onReview(test)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Review
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onRetake(test)}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Retake
        </Button>
      </div>
    </div>
  );
};

export default TestHistoryCard;