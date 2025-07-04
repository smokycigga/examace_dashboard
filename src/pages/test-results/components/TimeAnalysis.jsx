import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const TimeAnalysis = ({ timeData }) => {
  const subjectTimeData = [
    { subject: 'Physics', time: timeData.physics, optimal: 45, color: '#3B82F6' },
    { subject: 'Chemistry', time: timeData.chemistry, optimal: 40, color: '#10B981' },
    { subject: 'Mathematics', time: timeData.mathematics, optimal: 50, color: '#F59E0B' },
    { subject: 'Biology', time: timeData.biology, optimal: 35, color: '#EF4444' }
  ].filter(item => item.time > 0);

  const timeDistributionData = [
    { name: 'Quick (<1 min)', value: timeData.quick, color: '#10B981' },
    { name: 'Normal (1-2 min)', value: timeData.normal, color: '#3B82F6' },
    { name: 'Slow (>2 min)', value: timeData.slow, color: '#F59E0B' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-academic p-3 shadow-academic">
          <p className="font-medium text-text-primary">{label}</p>
          <p className="text-sm text-primary font-data">
            Time: {payload[0].value} min
          </p>
          {payload[0].payload.optimal && (
            <p className="text-sm text-text-secondary font-caption">
              Optimal: {payload[0].payload.optimal} min
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Time Analysis
        </h2>
        <Icon name="Clock" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Time Distribution */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
            Subject-wise Time Usage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                  label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="time" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimal" fill="var(--color-secondary-300)" radius={[4, 4, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span className="text-text-secondary font-caption">Actual Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary-300 rounded-sm" />
              <span className="text-text-secondary font-caption">Optimal Time</span>
            </div>
          </div>
        </div>

        {/* Question Speed Distribution */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
            Question Speed Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} questions`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {timeDistributionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-text-secondary font-caption">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-data text-text-primary">
                  {item.value} questions
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Time Management Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-academic p-4 border border-primary-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Fastest Subject
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-primary">
              {timeData.fastestSubject}
            </div>
            <div className="text-xs text-primary-600 font-caption">
              Avg. {timeData.fastestTime} per question
            </div>
          </div>

          <div className="bg-warning-50 rounded-academic p-4 border border-warning-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning-600" />
              <span className="text-sm font-medium text-warning-700">
                Time Saved
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-warning-700">
              {timeData.timeSaved} min
            </div>
            <div className="text-xs text-warning-600 font-caption">
              vs allocated time
            </div>
          </div>

          <div className="bg-success-50 rounded-academic p-4 border border-success-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-700">
                Efficiency Score
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-success-700">
              {timeData.efficiencyScore}%
            </div>
            <div className="text-xs text-success-600 font-caption">
              Time vs Accuracy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAnalysis;