import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileTestInterface = ({ 
  currentQuestion,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  numericAnswer,
  onAnswerSelect,
  onNumericAnswerChange,
  onPrevious,
  onNext,
  onMarkForReview,
  onClearResponse,
  isMarkedForReview,
  timeRemaining,
  onSubmitTest
}) => {
  const [activePanel, setActivePanel] = useState('question'); // 'question', 'answer', 'navigator'
  const [showAnswerPalette, setShowAnswerPalette] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeWarningClass = () => {
    const percentage = (timeRemaining / (180 * 60)) * 100; // Assuming 3 hours max
    if (percentage <= 10) return 'text-error';
    if (percentage <= 25) return 'text-warning';
    return 'text-success';
  };

  const renderQuestionPanel = () => (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
      <div className="space-y-4">
        {/* Question Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-primary" />
            <span className="font-heading font-semibold text-text-primary">
              Question {questionNumber}
            </span>
          </div>
          <div className="text-sm text-text-secondary font-caption">
            of {totalQuestions}
          </div>
        </div>

        {/* Question Content */}
        <div className="bg-surface rounded-academic border border-border p-4">
          <div className="prose prose-sm max-w-none">
            <div className="text-text-primary leading-relaxed">
              {currentQuestion.question}
            </div>
          </div>

          {/* Question Image */}
          {currentQuestion.image && (
            <div className="mt-4">
              <img
                src={currentQuestion.image}
                alt="Question diagram"
                className="w-full h-auto object-contain rounded-academic"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
          )}
        </div>

        {/* Quick Answer Section */}
        {currentQuestion.type === 'mcq' && (
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary">Quick Select:</h4>
            <div className="grid grid-cols-2 gap-2">
              {currentQuestion.options.map((option, index) => {
                const optionLabel = String.fromCharCode(65 + index);
                const isSelected = selectedAnswer === optionLabel;
                
                return (
                  <button
                    key={index}
                    onClick={() => onAnswerSelect(optionLabel)}
                    className={`p-3 rounded-academic border-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                        isSelected
                          ? 'border-primary bg-primary text-white' :'border-border-dark'
                      }`}>
                        {optionLabel}
                      </span>
                      <span className="text-sm truncate">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Mobile Header */}
      <header className="bg-surface border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={18} className="text-primary" />
            <span className="font-heading font-semibold text-text-primary">
              Test Interface
            </span>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-academic border font-data ${getTimeWarningClass()}`}>
            <Icon name="Clock" size={14} />
            <span className="text-sm font-bold">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{questionNumber} of {totalQuestions}</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {renderQuestionPanel()}
      </div>

      {/* Answer Palette Overlay */}
      {showAnswerPalette && (
        <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-surface w-full max-h-[70vh] rounded-t-academic-lg border-t border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-semibold text-text-primary">
                Answer Options
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnswerPalette(false)}
                iconName="X"
                iconSize={16}
              />
            </div>
            
            <div className="p-4 overflow-y-auto scrollbar-hide">
              {currentQuestion.type === 'mcq' ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLabel = String.fromCharCode(65 + index);
                    const isSelected = selectedAnswer === optionLabel;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          onAnswerSelect(optionLabel);
                          setShowAnswerPalette(false);
                        }}
                        className={`w-full text-left p-4 rounded-academic border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-primary bg-primary text-white' :'border-border-dark'
                          }`}>
                            <span className="text-sm font-medium">{optionLabel}</span>
                          </div>
                          <div className="text-sm text-text-primary">
                            {option}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="Enter your answer"
                    value={numericAnswer}
                    onChange={(e) => onNumericAnswerChange(e.target.value)}
                    className="w-full p-4 text-center font-data text-lg border border-border rounded-academic focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="bg-surface border-t border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkForReview}
            iconName="Flag"
            iconPosition="left"
            iconSize={14}
            className={isMarkedForReview ? 'bg-warning-50 border-warning-200 text-warning-700' : ''}
          >
            {isMarkedForReview ? 'Marked' : 'Mark'}
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAnswerPalette(true)}
            iconName="Target"
            iconPosition="left"
            iconSize={14}
          >
            Answer
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearResponse}
            iconName="RotateCcw"
            iconSize={14}
          />
        </div>

        <div className="flex items-center justify-between">
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
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary font-caption">
              {questionNumber} of {totalQuestions}
            </span>
          </div>
          
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

        {/* Submit Button */}
        <Button
          variant="danger"
          size="sm"
          fullWidth
          onClick={onSubmitTest}
          iconName="Send"
          iconPosition="left"
          iconSize={14}
          className="mt-3"
        >
          Submit Test
        </Button>
      </div>
    </div>
  );
};

export default MobileTestInterface;