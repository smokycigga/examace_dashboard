import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionPanel = ({ 
  currentQuestion, 
  questionNumber, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onMarkForReview, 
  onClearResponse,
  isMarkedForReview 
}) => {
  const formatQuestionText = (text) => {
    // Handle mathematical formulas and formatting
    return text.replace(/\$\$(.*?)\$\$/g, '<span class="font-data bg-secondary-100 px-2 py-1 rounded">$1</span>');
  };

  return (
    <div className="bg-surface rounded-academic border border-border h-full flex flex-col">
      {/* Question Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-secondary-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={18} className="text-primary" />
            <span className="font-heading font-semibold text-text-primary">
              Question {questionNumber}
            </span>
          </div>
          <div className="text-sm text-text-secondary font-caption">
            of {totalQuestions}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isMarkedForReview && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-warning-100 rounded-academic-sm">
              <Icon name="Flag" size={14} className="text-warning-600" />
              <span className="text-xs font-medium text-warning-700">Marked</span>
            </div>
          )}
          <div className="text-sm font-data text-text-secondary">
            {currentQuestion.difficulty}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        <div className="space-y-6">
          {/* Question Text */}
          <div className="prose prose-sm max-w-none">
            <div 
              className="text-text-primary leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: formatQuestionText(currentQuestion.question) 
              }}
            />
          </div>

          {/* Question Image/Diagram */}
          {currentQuestion.image && (
            <div className="flex justify-center">
              <div className="max-w-md w-full bg-secondary-50 rounded-academic p-4 border border-border-light">
                <img
                  src={currentQuestion.image}
                  alt="Question diagram"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
            </div>
          )}

          {/* Additional Information */}
          {currentQuestion.additionalInfo && (
            <div className="bg-primary-50 rounded-academic p-4 border border-primary-200">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-700">
                  {currentQuestion.additionalInfo}
                </div>
              </div>
            </div>
          )}

          {/* Formula Reference */}
          {currentQuestion.formulas && currentQuestion.formulas.length > 0 && (
            <div className="bg-secondary-50 rounded-academic p-4 border border-border-light">
              <h4 className="font-heading font-medium text-text-primary mb-2 flex items-center">
                <Icon name="Calculator" size={16} className="mr-2" />
                Relevant Formulas
              </h4>
              <div className="space-y-2">
                {currentQuestion.formulas.map((formula, index) => (
                  <div key={index} className="font-data text-sm bg-surface px-3 py-2 rounded-academic-sm border">
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Question Actions */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkForReview}
            iconName="Flag"
            iconPosition="left"
            iconSize={14}
            className={isMarkedForReview ? 'bg-warning-50 border-warning-200 text-warning-700' : ''}
          >
            {isMarkedForReview ? 'Marked' : 'Mark for Review'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearResponse}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
          >
            Clear Response
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={questionNumber === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={14}
          >
            Previous
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            disabled={questionNumber === totalQuestions}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={14}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;