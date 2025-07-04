import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceGraph = ({ data }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('3months');

  const timeRangeOptions = [
    { value: '1month', label: '1M' },
    { value: '3months', label: '3M' },
    { value: '6months', label: '6M' },
    { value: '1year', label: '1Y' }
  ];

  const filterDataByTimeRange = (data, range) => {
    const now = new Date();
    let startDate;
    
    switch (range) {
      case '1month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '3months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case '6months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case '1year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        return data;
    }
    
    return data.filter(item => new Date(item.date) >= startDate);
  };

  const filteredData = filterDataByTimeRange(data, timeRange);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-academic shadow-academic-lg p-3">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">{entry.name}:</span>
              <span className="text-sm font-data text-text-primary">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getAverageScore = () => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((acc, item) => acc + item.score, 0);
    return Math.round(sum / filteredData.length);
  };

  const getTrend = () => {
    if (filteredData.length < 2) return 'neutral';
    const firstScore = filteredData[0].score;
    const lastScore = filteredData[filteredData.length - 1].score;
    const difference = lastScore - firstScore;
    
    if (difference > 5) return 'up';
    if (difference < -5) return 'down';
    return 'neutral';
  };

  const trend = getTrend();
  const averageScore = getAverageScore();

  return (
    <div className="bg-surface rounded-academic border border-border shadow-academic p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-text-primary text-lg mb-1">
            Performance Trend
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Average Score:</span>
              <span className="font-data font-semibold text-primary">{averageScore}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={
                  trend === 'up' ? 'text-success' : 
                  trend === 'down' ? 'text-error' : 'text-text-muted'
                } 
              />
              <span className={`text-sm font-caption ${
                trend === 'up' ? 'text-success' : 
                trend === 'down' ? 'text-error' : 'text-text-muted'
              }`}>
                {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex bg-background rounded-academic border border-border">
            {timeRangeOptions.map((option) => (
              <Button
                key={option.value}
                variant={timeRange === option.value ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setTimeRange(option.value)}
                className="rounded-none first:rounded-l-academic last:rounded-r-academic"
              >
                {option.label}
              </Button>
            ))}
          </div>
          
          <div className="flex bg-background rounded-academic border border-border">
            <Button
              variant={chartType === 'line' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
              iconSize={14}
              className="rounded-none rounded-l-academic"
            />
            <Button
              variant={chartType === 'area' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setChartType('area')}
              iconName="BarChart3"
              iconSize={14}
              className="rounded-none rounded-r-academic"
            />
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                name="Score"
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                name="Accuracy"
              />
            </LineChart>
          ) : (
            <AreaChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="var(--color-primary)" 
                fill="var(--color-primary-100)"
                strokeWidth={2}
                name="Score"
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke="var(--color-accent)" 
                fill="var(--color-accent-100)"
                strokeWidth={2}
                name="Accuracy"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-data font-bold text-text-primary">
            {filteredData.length}
          </div>
          <div className="text-sm text-text-secondary font-caption">Tests Taken</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-data font-bold text-success">
            {Math.max(...filteredData.map(d => d.score), 0)}%
          </div>
          <div className="text-sm text-text-secondary font-caption">Best Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-data font-bold text-primary">
            {Math.round(filteredData.reduce((acc, d) => acc + d.accuracy, 0) / filteredData.length) || 0}%
          </div>
          <div className="text-sm text-text-secondary font-caption">Avg Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-data font-bold text-accent">
            {Math.round(filteredData.reduce((acc, d) => acc + d.rank, 0) / filteredData.length) || 0}
          </div>
          <div className="text-sm text-text-secondary font-caption">Avg Rank</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;