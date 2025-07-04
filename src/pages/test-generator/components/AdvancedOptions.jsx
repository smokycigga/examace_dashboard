import React from 'react';
import Icon from '../../../components/AppIcon';

const AdvancedOptions = ({ 
  isExpanded, 
  onToggle, 
  questionTypes, 
  onQuestionTypeChange,
  selectedChapters,
  onChapterChange,
  excludePreviousTests,
  onExcludePreviousTestsChange
}) => {
  const questionTypeOptions = [
    { value: 'mcq', label: 'Multiple Choice Questions', description: 'Single correct answer' },
    { value: 'numerical', label: 'Numerical Answer Type', description: 'Integer or decimal answers' },
    { value: 'assertion', label: 'Assertion & Reasoning', description: 'Statement-based questions' },
    { value: 'comprehension', label: 'Comprehension Based', description: 'Passage-based questions' }
  ];

  const chapterOptions = {
    Physics: [
      'Mechanics', 'Thermodynamics', 'Waves & Oscillations', 'Electromagnetism', 
      'Optics', 'Modern Physics', 'Current Electricity', 'Magnetism'
    ],
    Chemistry: [
      'Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 
      'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Electrochemistry'
    ],
    Mathematics: [
      'Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 
      'Probability', 'Statistics', 'Vectors', 'Complex Numbers'
    ],
    Biology: [
      'Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Plant Physiology', 
      'Animal Physiology', 'Biotechnology', 'Human Health'
    ]
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 bg-surface border border-border rounded-academic hover:bg-secondary-50 transition-smooth"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <span className="font-heading font-semibold text-text-primary">Advanced Options</span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isExpanded && (
        <div className="space-y-6 p-4 bg-secondary-50 rounded-academic border border-border-light">
          {/* Question Types */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name="List" size={18} className="text-primary" />
              <h4 className="font-medium text-text-primary">Question Types</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {questionTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`block p-3 rounded-academic border cursor-pointer transition-all duration-200 ${
                    questionTypes.includes(option.value)
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark bg-surface'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={questionTypes.includes(option.value)}
                      onChange={(e) => onQuestionTypeChange(option.value, e.target.checked)}
                      className="w-4 h-4 text-primary border-2 border-border rounded mt-0.5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-text-muted font-caption">{option.description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Chapter Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name="BookMarked" size={18} className="text-primary" />
              <h4 className="font-medium text-text-primary">Specific Chapters</h4>
            </div>
            
            <div className="space-y-4">
              {Object.entries(chapterOptions).map(([subject, chapters]) => (
                <div key={subject} className="space-y-2">
                  <h5 className="font-medium text-sm text-text-primary flex items-center space-x-2">
                    <Icon name="ChevronRight" size={14} />
                    <span>{subject}</span>
                  </h5>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ml-6">
                    {chapters.map((chapter) => (
                      <label
                        key={`${subject}-${chapter}`}
                        className="flex items-center space-x-2 p-2 rounded-academic-sm hover:bg-surface cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedChapters[subject]?.includes(chapter) || false}
                          onChange={(e) => onChapterChange(subject, chapter, e.target.checked)}
                          className="w-3 h-3 text-primary border border-border rounded focus:ring-1 focus:ring-primary"
                        />
                        <span className="text-xs text-text-secondary">{chapter}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exclude Previous Tests */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="History" size={18} className="text-primary" />
              <h4 className="font-medium text-text-primary">Test History</h4>
            </div>
            
            <label className="flex items-start space-x-3 p-3 bg-surface rounded-academic border border-border cursor-pointer hover:bg-secondary-50 transition-smooth">
              <input
                type="checkbox"
                checked={excludePreviousTests}
                onChange={(e) => onExcludePreviousTestsChange(e.target.checked)}
                className="w-4 h-4 text-primary border-2 border-border rounded mt-0.5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-text-primary">
                  Exclude questions from previous tests
                </div>
                <div className="text-xs text-text-secondary font-caption mt-1">
                  Avoid repeating questions you've already attempted to ensure fresh practice
                </div>
              </div>
            </label>
          </div>

          {/* Reset Options */}
          <div className="pt-4 border-t border-border-light">
            <button
              onClick={() => {
                onQuestionTypeChange('reset');
                onChapterChange('reset');
                onExcludePreviousTestsChange(false);
              }}
              className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="RotateCcw" size={14} />
              <span>Reset all advanced options</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;