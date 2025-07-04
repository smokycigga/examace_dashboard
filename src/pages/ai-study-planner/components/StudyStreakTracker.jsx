import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyStreakTracker = ({ streakData, onStreakGoalUpdate }) => {
  const getDayStatus = (day) => {
    if (day.completed) return 'completed';
    if (day.isToday) return 'today';
    if (day.isFuture) return 'future';
    return 'missed';
  };

  const getDayColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-white';
      case 'today': return 'bg-primary text-white ring-2 ring-primary-200';
      case 'future': return 'bg-secondary-100 text-text-muted';
      case 'missed': return 'bg-error-100 text-error-600';
      default: return 'bg-secondary-100 text-text-muted';
    }
  };

  const getStreakIcon = (streak) => {
    if (streak >= 30) return 'Crown';
    if (streak >= 14) return 'Award';
    if (streak >= 7) return 'Star';
    return 'Flame';
  };

  const getStreakMessage = (streak) => {
    if (streak >= 30) return 'Legendary streak! You\'re unstoppable! 👑';
    if (streak >= 14) return 'Amazing consistency! Keep it up! 🏆';
    if (streak >= 7) return 'Great momentum! You\'re on fire! ⭐';
    if (streak >= 3) return 'Building momentum! 🔥';
    return 'Start your streak today! 💪';
  };

  const calculateWeeklyProgress = () => {
    const thisWeek = streakData.calendar.slice(-7);
    const completed = thisWeek.filter(day => day.completed).length;
    return Math.round((completed / 7) * 100);
  };

  const weeklyProgress = calculateWeeklyProgress();

  return (
    <div className="bg-surface rounded-academic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning-400 to-warning-600 rounded-full flex items-center justify-center">
            <Icon name={getStreakIcon(streakData.currentStreak)} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Study Streak
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {getStreakMessage(streakData.currentStreak)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onStreakGoalUpdate()}
          iconName="Settings"
          iconSize={16}
        />
      </div>

      {/* Current Streak Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-warning-50 to-warning-100 rounded-academic-lg px-6 py-4">
          <Icon name="Flame" size={24} className="text-warning-600" />
          <div>
            <div className="text-3xl font-bold text-warning-700 font-data">
              {streakData.currentStreak}
            </div>
            <div className="text-sm text-warning-600 font-caption">
              day{streakData.currentStreak !== 1 ? 's' : ''} streak
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            This Week's Progress
          </span>
          <span className="text-sm font-bold text-primary font-data">
            {weeklyProgress}%
          </span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-success to-success-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
      </div>

      {/* Calendar View */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">
          Last 30 Days
        </h4>
        <div className="grid grid-cols-10 gap-1">
          {streakData.calendar.map((day, index) => {
            const status = getDayStatus(day);
            return (
              <div
                key={index}
                className={`w-6 h-6 rounded-academic-sm flex items-center justify-center text-xs font-medium transition-all duration-200 ${getDayColor(status)}`}
                title={`${day.date} - ${status === 'completed' ? 'Completed' : status === 'missed' ? 'Missed' : status === 'today' ? 'Today' : 'Future'}`}
              >
                {status === 'completed' && <Icon name="Check" size={12} />}
                {status === 'today' && <Icon name="Circle" size={8} />}
                {status === 'missed' && <Icon name="X" size={10} />}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded-sm"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error-100 rounded-sm"></div>
              <span>Missed</span>
            </div>
          </div>
          <span className="font-caption">
            {streakData.calendar.filter(day => day.completed).length} / {streakData.calendar.length} days
          </span>
        </div>
      </div>

      {/* Streak Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-academic p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Trophy" size={16} className="text-primary" />
            <span className="text-lg font-bold text-primary font-data">
              {streakData.longestStreak}
            </span>
          </div>
          <p className="text-sm font-medium text-text-primary">Longest Streak</p>
          <p className="text-xs text-text-secondary font-caption">
            Personal best
          </p>
        </div>

        <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-academic p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Calendar" size={16} className="text-success" />
            <span className="text-lg font-bold text-success font-data">
              {streakData.monthlyStreak}
            </span>
          </div>
          <p className="text-sm font-medium text-text-primary">This Month</p>
          <p className="text-xs text-text-secondary font-caption">
            Study days
          </p>
        </div>
      </div>

      {/* Motivational Section */}
      <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-academic p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className="text-accent-600" />
          <div>
            <h4 className="font-medium text-text-primary">
              {streakData.currentStreak === 0 ? 'Start Your Journey' : 'Keep Going!'}
            </h4>
            <p className="text-sm text-text-secondary">
              {streakData.currentStreak === 0 
                ? 'Complete today\'s study plan to start your streak'
                : `Just ${streakData.nextMilestone - streakData.currentStreak} more days to reach ${streakData.nextMilestone} days!`
              }
            </p>
          </div>
        </div>
        {streakData.currentStreak > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
              <span>Progress to next milestone</span>
              <span>{streakData.currentStreak}/{streakData.nextMilestone}</span>
            </div>
            <div className="w-full bg-accent-200 rounded-full h-1.5">
              <div 
                className="bg-accent-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(streakData.currentStreak / streakData.nextMilestone) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyStreakTracker;