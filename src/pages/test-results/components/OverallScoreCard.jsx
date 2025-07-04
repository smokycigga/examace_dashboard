import React from 'react';
import Icon from '../../../components/AppIcon';

const OverallScoreCard = ({ testResult }) => {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (percentage) => {
    if (percentage >= 80) return 'bg-success-50 border-success-200';
    if (percentage >= 60) return 'bg-warning-50 border-warning-200';
    return 'bg-error-50 border-error-200';
  };

  return (
    <div className={`card p-6 ${getScoreBackground(testResult.overallPercentage)}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Overall Performance
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-accent" />
          <span className="text-sm font-caption text-text-secondary">
            Rank #{testResult.rank}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Circle */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${testResult.overallPercentage}, 100`}
                className={getScoreColor(testResult.overallPercentage)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-heading font-bold ${getScoreColor(testResult.overallPercentage)}`}>
                  {testResult.overallPercentage}%
                </div>
                <div className="text-xs text-text-muted font-caption">
                  {testResult.correctAnswers}/{testResult.totalQuestions}
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-text-secondary text-center">
            Overall Score
          </p>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-academic p-4 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Time Taken
                </span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">
                {testResult.timeTaken}
              </div>
              <div className="text-xs text-text-secondary font-caption">
                of {testResult.totalTime} allocated
              </div>
            </div>

            <div className="bg-surface rounded-academic p-4 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-success" />
                <span className="text-sm font-medium text-text-primary">
                  Accuracy
                </span>
              </div>
              <div className="text-2xl font-heading font-bold text-success">
                {testResult.accuracy}%
              </div>
              <div className="text-xs text-text-secondary font-caption">
                {testResult.correctAnswers} correct answers
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-academic p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-primary">
                Performance Comparison
              </span>
              <span className="text-xs text-text-secondary font-caption">
                vs Previous Attempts
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={testResult.improvement >= 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={testResult.improvement >= 0 ? "text-success" : "text-error"} 
                />
                <span className={`text-sm font-data ${testResult.improvement >= 0 ? "text-success" : "text-error"}`}>
                  {testResult.improvement >= 0 ? "+" : ""}{testResult.improvement}%
                </span>
              </div>
              <div className="text-xs text-text-muted font-caption">
                from last attempt
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScoreCard;