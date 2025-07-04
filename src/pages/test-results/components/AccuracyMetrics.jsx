import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const AccuracyMetrics = ({ accuracyData }) => {
  const overallData = [
    { name: 'Correct', value: accuracyData.correct, color: '#10B981' },
    { name: 'Incorrect', value: accuracyData.incorrect, color: '#EF4444' },
    { name: 'Skipped', value: accuracyData.skipped, color: '#6B7280' }
  ];

  const difficultyData = [
    { level: 'Easy', correct: accuracyData.easy.correct, total: accuracyData.easy.total, percentage: accuracyData.easy.percentage },
    { level: 'Medium', correct: accuracyData.medium.correct, total: accuracyData.medium.total, percentage: accuracyData.medium.percentage },
    { level: 'Hard', correct: accuracyData.hard.correct, total: accuracyData.hard.total, percentage: accuracyData.hard.percentage }
  ];

  const getDifficultyColor = (level) => {
    const colors = {
      'Easy': '#10B981',
      'Medium': '#F59E0B',
      'Hard': '#EF4444'
    };
    return colors[level];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-academic p-3 shadow-academic">
          <p className="font-medium text-text-primary">{label}</p>
          <p className="text-sm text-primary font-data">
            Accuracy: {payload[0].value}%
          </p>
          <p className="text-sm text-text-secondary font-caption">
            {payload[0].payload.correct}/{payload[0].payload.total} questions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Accuracy Metrics
        </h2>
        <Icon name="Target" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Distribution */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
            Overall Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {overallData.map((entry, index) => (
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
            {overallData.map((item, index) => (
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

        {/* Difficulty-wise Accuracy */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
            Difficulty-wise Accuracy
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="level" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                  label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="percentage" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {difficultyData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: getDifficultyColor(item.level) }}
                  />
                  <span className="text-sm text-text-secondary font-caption">
                    {item.level}
                  </span>
                </div>
                <span className="text-sm font-data text-text-primary">
                  {item.correct}/{item.total} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Accuracy Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-success-50 rounded-academic p-4 border border-success-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-700">
                Best Performance
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-success-700">
              {accuracyData.bestSubject}
            </div>
            <div className="text-xs text-success-600 font-caption">
              {accuracyData.bestAccuracy}% accuracy
            </div>
          </div>

          <div className="bg-warning-50 rounded-academic p-4 border border-warning-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning-600" />
              <span className="text-sm font-medium text-warning-700">
                Needs Focus
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-warning-700">
              {accuracyData.weakestSubject}
            </div>
            <div className="text-xs text-warning-600 font-caption">
              {accuracyData.weakestAccuracy}% accuracy
            </div>
          </div>

          <div className="bg-primary-50 rounded-academic p-4 border border-primary-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Improvement
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-primary">
              +{accuracyData.improvement}%
            </div>
            <div className="text-xs text-primary-600 font-caption">
              from last attempt
            </div>
          </div>

          <div className="bg-accent-50 rounded-academic p-4 border border-accent-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Award" size={16} className="text-accent-600" />
              <span className="text-sm font-medium text-accent-700">
                Consistency
              </span>
            </div>
            <div className="text-lg font-heading font-bold text-accent-700">
              {accuracyData.consistencyScore}%
            </div>
            <div className="text-xs text-accent-600 font-caption">
              across subjects
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Recommendations
        </h3>
        <div className="space-y-3">
          {accuracyData.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-academic">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm text-text-primary font-medium">
                  {recommendation.title}
                </p>
                <p className="text-sm text-text-secondary font-caption mt-1">
                  {recommendation.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccuracyMetrics;