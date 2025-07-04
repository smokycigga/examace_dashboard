import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const AccuracySnapshot = ({ accuracyData, isLoading }) => {
  const COLORS = {
    correct: 'var(--color-success)',
    incorrect: 'var(--color-error)',
    skipped: 'var(--color-warning)'
  };

  const pieData = [
    { name: 'Correct', value: accuracyData.correct, color: COLORS.correct },
    { name: 'Incorrect', value: accuracyData.incorrect, color: COLORS.incorrect },
    { name: 'Skipped', value: accuracyData.skipped, color: COLORS.skipped }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-border rounded-academic p-3 shadow-academic">
          <p className="font-caption text-text-secondary text-sm mb-1">{data.name}</p>
          <p className="font-data font-semibold text-text-primary">
            {data.value} questions ({((data.value / (accuracyData.correct + accuracyData.incorrect + accuracyData.skipped)) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
        <div className="h-6 bg-secondary-200 rounded w-40 animate-pulse mb-4"></div>
        <div className="h-48 bg-secondary-100 rounded-academic animate-pulse"></div>
      </div>
    );
  }

  const totalQuestions = accuracyData.correct + accuracyData.incorrect + accuracyData.skipped;
  const accuracyPercentage = totalQuestions > 0 ? ((accuracyData.correct / totalQuestions) * 100).toFixed(1) : 0;

  return (
    <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Accuracy Snapshot
          </h3>
          <p className="text-text-secondary font-caption text-sm">
            Recent test performance
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-data font-bold text-primary">
            {accuracyPercentage}%
          </div>
          <div className="text-xs text-text-secondary font-caption">
            Overall Accuracy
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-data font-bold text-text-primary">
              {totalQuestions}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Total Questions
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="font-caption text-text-primary text-sm">
                {item.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-data font-semibold text-text-primary">
                {item.value}
              </span>
              <span className="text-text-secondary text-sm font-caption">
                ({totalQuestions > 0 ? ((item.value / totalQuestions) * 100).toFixed(1) : 0}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary font-caption">
            Improvement from last test:
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="font-data font-semibold text-success">
              +2.3%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccuracySnapshot;