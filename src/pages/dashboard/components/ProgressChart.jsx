import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressChart = ({ progressData, isLoading }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-academic p-3 shadow-academic">
          <p className="font-caption text-text-secondary text-sm mb-1">{label}</p>
          <p className="font-data font-semibold text-primary">
            Score: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-secondary-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-secondary-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="h-64 bg-secondary-100 rounded-academic animate-pulse"></div>
      </div>
    );
  }

  const latestScore = progressData[progressData.length - 1]?.score || 0;
  const previousScore = progressData[progressData.length - 2]?.score || 0;
  const improvement = latestScore - previousScore;

  return (
    <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Progress Overview
          </h3>
          <p className="text-text-secondary font-caption text-sm">
            Last 10 test performances
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={improvement >= 0 ? "TrendingUp" : "TrendingDown"} 
            size={16} 
            className={improvement >= 0 ? "text-success" : "text-error"} 
          />
          <span className={`font-data font-semibold text-sm ${
            improvement >= 0 ? "text-success" : "text-error"
          }`}>
            {improvement >= 0 ? "+" : ""}{improvement.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              fontFamily="var(--font-caption)"
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              fontFamily="var(--font-data)"
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-border-light">
        <div className="text-center">
          <div className="text-lg font-data font-bold text-text-primary">
            {Math.max(...progressData.map(d => d.score))}%
          </div>
          <div className="text-xs text-text-secondary font-caption">
            Best Score
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-data font-bold text-text-primary">
            {(progressData.reduce((sum, d) => sum + d.score, 0) / progressData.length).toFixed(1)}%
          </div>
          <div className="text-xs text-text-secondary font-caption">
            Average
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-data font-bold text-text-primary">
            {latestScore}%
          </div>
          <div className="text-xs text-text-secondary font-caption">
            Latest
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;