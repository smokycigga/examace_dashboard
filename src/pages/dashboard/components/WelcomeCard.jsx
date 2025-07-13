import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeCard = ({ userName, currentStreak, totalTests, currentRank }) => {
  const getStreakMessage = (streak) => {
    if (streak === 0) return "Start your learning journey today!";
    if (streak < 7) return "Keep building your streak!";
    if (streak < 30) return "Great consistency! Keep it up!";
    return "Amazing dedication! You're unstoppable!";
  };

  const getStreakIcon = (streak) => {
    if (streak === 0) return "Play";
    if (streak < 7) return "Flame";
    if (streak < 30) return "Zap";
    return "Trophy";
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-academic-lg p-6 border border-primary-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-1">
            Welcome back, {userName}!
          </h2>
          <p className="text-text-secondary font-caption">
            {getStreakMessage(currentStreak)}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white rounded-academic px-3 py-2 shadow-academic">
          <Icon 
            name={getStreakIcon(currentStreak)} 
            size={20} 
            className={currentStreak > 0 ? "text-accent" : "text-text-muted"} 
          />
          <span className="font-data font-semibold text-text-primary">
            {currentStreak}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-academic p-4 text-center shadow-academic">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {totalTests}
          </div>
          <div className="text-sm text-text-secondary font-caption">
            Tests Taken
          </div>
        </div>
        <div className="bg-white rounded-academic p-4 text-center shadow-academic">
          <div className="text-2xl font-heading font-bold text-success mb-1">
            #{currentRank?.toLocaleString() || 'N/A'}
          </div>
          <div className="text-sm text-text-secondary font-caption">
            Current Rank
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          className="flex-1"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Start New Test
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          iconName="BarChart3"
          iconPosition="left"
          iconSize={16}
        >
          View Analytics
        </Button>
      </div>
    </div>
  );
};

export default WelcomeCard;