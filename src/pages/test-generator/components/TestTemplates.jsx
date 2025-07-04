import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestTemplates = ({ onTemplateSelect, onSaveTemplate, canSaveTemplate }) => {
  const savedTemplates = [
    {
      id: 1,
      name: 'JEE Main Practice',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      totalQuestions: 90,
      duration: 180,
      difficulty: 'mixed',
      lastUsed: '2024-01-15',
      timesUsed: 12
    },
    {
      id: 2,
      name: 'Physics Focus',
      subjects: ['Physics'],
      totalQuestions: 30,
      duration: 60,
      difficulty: 'advanced',
      lastUsed: '2024-01-14',
      timesUsed: 8
    },
    {
      id: 3,
      name: 'Quick Chemistry',
      subjects: ['Chemistry'],
      totalQuestions: 20,
      duration: 30,
      difficulty: 'easy',
      lastUsed: '2024-01-13',
      timesUsed: 15
    },
    {
      id: 4,
      name: 'NEET Biology',
      subjects: ['Biology'],
      totalQuestions: 45,
      duration: 90,
      difficulty: 'mixed',
      lastUsed: '2024-01-12',
      timesUsed: 6
    }
  ];

  const quickStartTemplates = [
    {
      id: 'jee-main',
      name: 'JEE Main Full Test',
      description: 'Complete JEE Main pattern test',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      questions: { Physics: 25, Chemistry: 25, Mathematics: 25 },
      duration: 180,
      difficulty: 'mixed',
      icon: 'Calculator',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 'neet-full',
      name: 'NEET Full Test',
      description: 'Complete NEET pattern test',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      questions: { Physics: 45, Chemistry: 45, Biology: 90 },
      duration: 180,
      difficulty: 'mixed',
      icon: 'Stethoscope',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    {
      id: 'quick-practice',
      name: 'Quick Practice',
      description: '30-minute focused practice',
      subjects: ['Physics', 'Chemistry'],
      questions: { Physics: 15, Chemistry: 15 },
      duration: 30,
      difficulty: 'easy',
      icon: 'Zap',
      color: 'bg-amber-50 border-amber-200 text-amber-700'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'mixed': return 'text-amber-600 bg-amber-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Start Templates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-text-primary">Quick Start</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {quickStartTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className={`p-4 rounded-academic border-2 text-left transition-all duration-200 hover:shadow-academic ${template.color}`}
            >
              <div className="flex items-start space-x-3">
                <Icon name={template.icon} size={20} className="mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                  <p className="text-xs opacity-80 mb-2">{template.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span>{template.subjects.join(', ')}</span>
                    <span>•</span>
                    <span>{Object.values(template.questions).reduce((a, b) => a + b, 0)} questions</span>
                    <span>•</span>
                    <span>{template.duration} min</span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="opacity-60" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Templates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-text-primary">Saved Templates</h3>
          </div>
          
          {canSaveTemplate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveTemplate}
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
            >
              Save Current
            </Button>
          )}
        </div>
        
        {savedTemplates.length > 0 ? (
          <div className="space-y-3">
            {savedTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 bg-surface border border-border rounded-academic hover:border-border-dark transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">{template.name}</h4>
                    <div className="flex items-center space-x-3 text-sm text-text-secondary">
                      <span>{template.subjects.join(', ')}</span>
                      <span>•</span>
                      <span>{template.totalQuestions} questions</span>
                      <span>•</span>
                      <span>{template.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    <span>Used {template.timesUsed} times</span>
                    <span>•</span>
                    <span>Last used {formatDate(template.lastUsed)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTemplateSelect(template)}
                      iconName="Play"
                      iconSize={14}
                    >
                      Use Template
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {}}
                      iconName="MoreHorizontal"
                      iconSize={14}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="BookmarkX" size={48} className="text-text-muted mx-auto mb-4" />
            <h4 className="font-medium text-text-primary mb-2">No Saved Templates</h4>
            <p className="text-sm text-text-secondary">
              Create and save your test configurations for quick access
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestTemplates;