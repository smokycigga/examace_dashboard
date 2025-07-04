import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaderboardWidget = ({ 
  userRank = 1247, 
  userScore = 85,
  topPerformers = [
    { name: 'Rahul Kumar', score: 95, rank: 1 },
    { name: 'Priya Sharma', score: 92, rank: 2 },
    { name: 'Amit Singh', score: 90, rank: 3 }
  ]
}) => {
  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-600';
    if (rank === 3) return 'text-orange-600';
    return 'text-text-secondary';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return 'Crown';
    if (rank === 2) return 'Medal';
    if (rank === 3) return 'Award';
    return 'User';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-academic-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Leaderboard
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Your current position
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-heading font-bold text-blue-600">
            #{userRank}
          </div>
          <div className="text-sm text-text-secondary font-caption">
            {userScore}% avg
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary mb-2">Top Performers</h4>
        {topPerformers.map((performer, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                performer.rank === 1 ? 'bg-yellow-100' :
                performer.rank === 2 ? 'bg-gray-100' :
                performer.rank === 3 ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                <Icon 
                  name={getRankIcon(performer.rank)} 
                  size={12} 
                  className={getRankColor(performer.rank)} 
                />
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">
                  {performer.name}
                </p>
                <p className="text-xs text-text-secondary">
                  Rank #{performer.rank}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-text-primary">
                {performer.score}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Position */}
      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} className="text-blue-600" />
            <span className="font-medium text-text-primary">You</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-600">#{userRank}</div>
            <div className="text-sm text-text-secondary">{userScore}% avg</div>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-3 text-center">
        <p className="text-xs text-text-secondary">
          {userRank <= 100 ? 'Excellent! You\'re in the top 100!' :
           userRank <= 500 ? 'Great job! Keep climbing!' :
           userRank <= 1000 ? 'Good progress! Push harder!': 'Every expert was once a beginner!'}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardWidget;