import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NavigationSidebar = ({ 
  questions, 
  currentQuestionIndex, 
  onQuestionSelect, 
  questionStatuses,
  onSubmitTest 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-success text-white';
      case 'marked':
        return 'bg-warning text-white';
      case 'skipped':
        return 'bg-error text-white';
      case 'not-visited':
        return 'bg-secondary-200 text-text-secondary';
      default:
        return 'bg-surface border border-border text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered':
        return 'Check';
      case 'marked':
        return 'Flag';
      case 'skipped':
        return 'X';
      default:
        return null;
    }
  };

  const filteredQuestions = questions.filter((_, index) => {
    if (!searchQuery) return true;
    return (index + 1).toString().includes(searchQuery);
  });

  const getStatusCounts = () => {
    const counts = {
      answered: 0,
      marked: 0,
      skipped: 0,
      'not-visited': 0
    };
    
    Object.values(questionStatuses).forEach(status => {
      counts[status] = (counts[status] || 0) + 1;
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  const handleSubmitClick = () => {
    setShowSubmitConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    onSubmitTest();
  };

  return (
    <div className="bg-surface rounded-academic border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-secondary-50">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Grid3x3" size={18} className="text-primary" />
          <span className="font-heading font-semibold text-text-primary">
            Question Navigator
          </span>
        </div>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm"
        />
      </div>

      {/* Status Legend */}
      <div className="p-4 border-b border-border-light">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-text-secondary">Answered ({statusCounts.answered})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-text-secondary">Marked ({statusCounts.marked})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-text-secondary">Skipped ({statusCounts.skipped})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary-200 rounded-full"></div>
            <span className="text-text-secondary">Not Visited ({statusCounts['not-visited']})</span>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-4 gap-2">
          {filteredQuestions.map((question, index) => {
            const questionNumber = questions.indexOf(question) + 1;
            const actualIndex = questions.indexOf(question);
            const status = questionStatuses[actualIndex] || 'not-visited';
            const isActive = actualIndex === currentQuestionIndex;
            const statusIcon = getStatusIcon(status);
            
            return (
              <button
                key={actualIndex}
                onClick={() => onQuestionSelect(actualIndex)}
                className={`relative w-10 h-10 rounded-academic text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  getStatusColor(status)
                } ${
                  isActive ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
              >
                <span className="relative z-10">{questionNumber}</span>
                {statusIcon && (
                  <Icon 
                    name={statusIcon} 
                    size={10} 
                    className="absolute top-0 right-0 transform translate-x-1 -translate-y-1" 
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Section */}
      <div className="p-4 border-t border-border bg-background">
        <div className="space-y-3">
          <div className="text-xs text-text-secondary space-y-1 font-caption">
            <div className="flex justify-between">
              <span>Total Questions:</span>
              <span className="font-medium text-text-primary">{questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Attempted:</span>
              <span className="font-medium text-success">{statusCounts.answered}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-medium text-warning">
                {questions.length - statusCounts.answered}
              </span>
            </div>
          </div>
          
          <Button
            variant="danger"
            size="sm"
            fullWidth
            onClick={handleSubmitClick}
            iconName="Send"
            iconPosition="left"
            iconSize={14}
          >
            Submit Test
          </Button>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface rounded-academic-lg shadow-academic-xl border border-border p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-primary">
                  Submit Test?
                </h3>
                <p className="text-sm text-text-secondary">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-academic p-4 mb-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <span className="font-medium text-success">{statusCounts.answered}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Marked:</span>
                  <span className="font-medium text-warning">{statusCounts.marked}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Skipped:</span>
                  <span className="font-medium text-error">{statusCounts.skipped}</span>
                </div>
                <div className="flex justify-between">
                  <span>Not Attempted:</span>
                  <span className="font-medium text-text-secondary">{statusCounts['not-visited']}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => setShowSubmitConfirm(false)}
              >
                Continue Test
              </Button>
              <Button
                variant="danger"
                size="sm"
                fullWidth
                onClick={handleConfirmSubmit}
              >
                Submit Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationSidebar;