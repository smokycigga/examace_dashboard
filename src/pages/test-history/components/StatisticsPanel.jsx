import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ statistics }) => {
  const statCards = [
    {
      title: 'Total Tests',
      value: statistics.totalTests,
      icon: 'FileText',
      color: 'primary',
      change: `+${statistics.testsThisMonth} this month`
    },
    {
      title: 'Average Score',
      value: `${statistics.averageScore}%`,
      icon: 'Target',
      color: 'success',
      change: `${statistics.scoreImprovement >= 0 ? '+' : ''}${statistics.scoreImprovement}% from last month`
    },
    {
      title: 'Best Rank',
      value: `#${statistics.bestRank.toLocaleString()}`,
      icon: 'Trophy',
      color: 'accent',
      change: `Achieved on ${statistics.bestRankDate}`
    },
    {
      title: 'Study Streak',
      value: `${statistics.studyStreak} days`,
      icon: 'Flame',
      color: 'warning',
      change: `Current streak: ${statistics.currentStreak} days`
    },
    {
      title: 'Consistency',
      value: `${statistics.consistency}%`,
      icon: 'TrendingUp',
      color: 'primary',
      change: `Based on regular test attempts`
    },
    {
      title: 'Time Efficiency',
      value: `${statistics.timeEfficiency}%`,
      icon: 'Clock',
      color: 'secondary',
      change: `Average: ${statistics.avgTimePerQuestion}s per question`
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        icon: 'text-primary',
        text: 'text-primary-700'
      },
      success: {
        bg: 'bg-success-50',
        border: 'border-success-200',
        icon: 'text-success',
        text: 'text-success-700'
      },
      accent: {
        bg: 'bg-accent-50',
        border: 'border-accent-200',
        icon: 'text-accent',
        text: 'text-accent-700'
      },
      warning: {
        bg: 'bg-warning-50',
        border: 'border-warning-200',
        icon: 'text-warning',
        text: 'text-warning-700'
      },
      secondary: {
        bg: 'bg-secondary-50',
        border: 'border-secondary-200',
        icon: 'text-secondary',
        text: 'text-secondary-700'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface rounded-academic border border-border shadow-academic p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-text-primary text-lg">
          Performance Statistics
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span className="font-caption">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-academic p-4 transition-smooth hover:shadow-academic`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${colors.bg} rounded-academic flex items-center justify-center`}>
                  <Icon name={stat.icon} size={20} className={colors.icon} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-data font-bold text-text-primary">
                    {stat.value}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">{stat.title}</h4>
                <p className={`text-xs ${colors.text} font-caption`}>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background rounded-academic p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="font-medium text-text-primary">Improvement Areas</span>
            </div>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Mathematics score improved by 12% this month</li>
              <li>• Physics accuracy increased to 78%</li>
              <li>• Time management improved by 8%</li>
            </ul>
          </div>
          <div className="bg-background rounded-academic p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="font-medium text-text-primary">Focus Areas</span>
            </div>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Organic Chemistry needs attention</li>
              <li>• Reduce silly mistakes in calculations</li>
              <li>• Practice more numerical problems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;