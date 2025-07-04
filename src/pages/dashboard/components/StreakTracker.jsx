import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakTracker = ({ streak = 0, dailyGoal = 2, completedToday = 0 }) => {
  const streakDays = Math.min(streak, 30); // Show max 30 days
  const progressPercentage = (completedToday / dailyGoal) * 100;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-academic-lg p-6 border border-orange-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Icon name="Flame" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Study Streak
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Keep the momentum going!
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-heading font-bold text-orange-600">
            {streak}
          </div>
          <div className="text-sm text-text-secondary font-caption">
            days
          </div>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">
            Today's Progress
          </span>
          <span className="text-sm text-text-secondary">
            {completedToday} / {dailyGoal} tests
          </span>
        </div>
        <div className="w-full bg-orange-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Streak Visualization */}
      <div className="flex items-center justify-center space-x-1 mb-3">
        {[...Array(7)].map((_, index) => {
          const isActive = index < Math.min(streakDays, 7);
          return (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                isActive ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          );
        })}
        {streak > 7 && (
          <div className="text-orange-600 font-medium text-sm">
            +{streak - 7}
          </div>
        )}
      </div>

      {/* Motivational Message */}
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          {streak === 0 ? 'Start your streak today!' :
           streak < 7 ? 'Great start! Keep going!' :
           streak < 30 ? 'Amazing consistency! You\'re on fire!' : 'Incredible dedication! You\'re a champion!'}
        </p>
      </div>
    </div>
  );
};

export default StreakTracker;