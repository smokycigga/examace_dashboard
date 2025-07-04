import React from 'react';
import Icon from '../../../components/AppIcon';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficultyOptions = [
    {
      value: 'easy',
      label: 'Easy',
      description: 'Basic concepts and fundamental problems',
      icon: 'TrendingDown',
      color: 'text-green-600 bg-green-50 border-green-200',
      percentage: '70-80% accuracy expected'
    },
    {
      value: 'mixed',
      label: 'Mixed',
      description: 'Combination of easy, medium, and hard questions',
      icon: 'BarChart3',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      percentage: '50-65% accuracy expected'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Complex problems and challenging concepts',
      icon: 'TrendingUp',
      color: 'text-red-600 bg-red-50 border-red-200',
      percentage: '35-50% accuracy expected'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Target" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">Difficulty Level</h3>
      </div>
      
      <div className="space-y-3">
        {difficultyOptions.map((option) => (
          <label
            key={option.value}
            className={`block p-4 rounded-academic border-2 cursor-pointer transition-all duration-200 ${
              selectedDifficulty === option.value
                ? `${option.color} border-opacity-100`
                : 'border-border hover:border-border-dark bg-surface'
            }`}
          >
            <div className="flex items-start space-x-3">
              <input
                type="radio"
                name="difficulty"
                value={option.value}
                checked={selectedDifficulty === option.value}
                onChange={(e) => onDifficultyChange(e.target.value)}
                className="w-5 h-5 text-primary border-2 border-border mt-0.5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={selectedDifficulty === option.value ? option.color.split(' ')[0] : 'text-text-secondary'} 
                  />
                  <span className={`font-medium ${
                    selectedDifficulty === option.value ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {option.label}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  {option.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Icon name="Info" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-muted font-caption">
                    {option.percentage}
                  </span>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;