import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectSelector = ({ subjects, onSubjectChange, onQuestionCountChange }) => {
  const subjectIcons = {
    Physics: 'Atom',
    Chemistry: 'FlaskConical',
    Mathematics: 'Calculator',
    Biology: 'Microscope'
  };

  const subjectColors = {
    Physics: 'text-blue-600 bg-blue-50 border-blue-200',
    Chemistry: 'text-green-600 bg-green-50 border-green-200',
    Mathematics: 'text-purple-600 bg-purple-50 border-purple-200',
    Biology: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">Select Subjects</h3>
      </div>
      
      <div className="space-y-3">
        {Object.entries(subjects).map(([subject, config]) => (
          <div key={subject} className={`p-4 rounded-academic border-2 transition-all duration-200 ${
            config.selected 
              ? `${subjectColors[subject]} border-opacity-100` 
              : 'border-border hover:border-border-dark bg-surface'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.selected}
                  onChange={(e) => onSubjectChange(subject, e.target.checked)}
                  className="w-5 h-5 text-primary border-2 border-border rounded focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={subjectIcons[subject]} 
                    size={18} 
                    className={config.selected ? subjectColors[subject].split(' ')[0] : 'text-text-secondary'} 
                  />
                  <span className={`font-medium ${
                    config.selected ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {subject}
                  </span>
                </div>
              </label>
              
              {config.selected && (
                <span className="text-sm font-data text-text-secondary">
                  {config.questionCount} questions
                </span>
              )}
            </div>
            
            {config.selected && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Questions: {config.questionCount}</span>
                  <span className="text-text-muted">Max: 50</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={config.questionCount}
                  onChange={(e) => onQuestionCountChange(subject, parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(config.questionCount / 50) * 100}%, var(--color-secondary-200) ${(config.questionCount / 50) * 100}%, var(--color-secondary-200) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-text-muted font-caption">
                  <span>5</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;