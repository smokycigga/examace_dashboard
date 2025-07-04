import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnswerPalette = ({ 
  currentQuestion, 
  selectedAnswer, 
  onAnswerSelect, 
  onNumericAnswerChange,
  numericAnswer 
}) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('0');

  const handleOptionSelect = (option) => {
    onAnswerSelect(option);
  };

  const handleNumericInput = (value) => {
    onNumericAnswerChange(value);
  };

  const calculatorButtons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const handleCalculatorClick = (value) => {
    if (value === 'C') {
      setCalculatorValue('0');
    } else if (value === '=') {
      try {
        const result = eval(calculatorValue.replace('×', '*').replace('÷', '/'));
        setCalculatorValue(result.toString());
      } catch (error) {
        setCalculatorValue('Error');
      }
    } else if (value === '±') {
      setCalculatorValue(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
    } else {
      setCalculatorValue(prev => prev === '0' ? value : prev + value);
    }
  };

  const renderMCQOptions = () => (
    <div className="space-y-3">
      <h3 className="font-heading font-semibold text-text-primary flex items-center">
        <Icon name="CheckCircle" size={16} className="mr-2" />
        Select Answer
      </h3>
      
      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionLabel;
          
          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(optionLabel)}
              className={`w-full text-left p-4 rounded-academic border-2 transition-all duration-200 hover:shadow-academic ${
                isSelected
                  ? 'border-primary bg-primary-50 shadow-academic'
                  : 'border-border hover:border-primary-300 bg-surface'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isSelected
                    ? 'border-primary bg-primary text-white' :'border-border-dark'
                }`}>
                  <span className="text-sm font-medium">{optionLabel}</span>
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${isSelected ? 'text-primary-700' : 'text-text-primary'}`}>
                    {option}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderNumericInput = () => (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-text-primary flex items-center">
        <Icon name="Hash" size={16} className="mr-2" />
        Numeric Answer
      </h3>
      
      <div className="space-y-3">
        <Input
          type="number"
          placeholder="Enter your answer"
          value={numericAnswer}
          onChange={(e) => handleNumericInput(e.target.value)}
          className="text-center font-data text-lg"
        />
        
        <div className="text-xs text-text-secondary text-center font-caption">
          {currentQuestion.answerRange && (
            <span>Range: {currentQuestion.answerRange}</span>
          )}
        </div>
      </div>

      {/* Calculator Toggle */}
      <div className="border-t border-border pt-4">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => setShowCalculator(!showCalculator)}
          iconName="Calculator"
          iconPosition="left"
          iconSize={14}
        >
          {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
        </Button>
      </div>

      {/* Calculator */}
      {showCalculator && (
        <div className="bg-secondary-50 rounded-academic p-3 border border-border-light">
          <div className="bg-surface rounded-academic-sm p-2 mb-3 border">
            <div className="text-right font-data text-lg text-text-primary">
              {calculatorValue}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {calculatorButtons.flat().map((btn, index) => (
              <Button
                key={index}
                variant={['C', '±', '%', '÷', '×', '-', '+', '='].includes(btn) ? 'outline' : 'ghost'}
                size="sm"
                onClick={() => handleCalculatorClick(btn)}
                className={`h-10 ${btn === '0' ? 'col-span-2' : ''}`}
              >
                {btn}
              </Button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="xs"
            fullWidth
            onClick={() => handleNumericInput(calculatorValue)}
            className="mt-2"
          >
            Use This Value
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-surface rounded-academic border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-secondary-50">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={18} className="text-primary" />
          <span className="font-heading font-semibold text-text-primary">
            Answer Options
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        {currentQuestion.type === 'mcq' ? renderMCQOptions() : renderNumericInput()}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-border bg-background">
        <div className="text-xs text-text-secondary space-y-1 font-caption">
          <div className="flex items-center justify-between">
            <span>Question Type:</span>
            <span className="font-medium text-text-primary">
              {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'Numeric'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Marks:</span>
            <span className="font-medium text-success">+{currentQuestion.marks}</span>
          </div>
          {currentQuestion.negativeMarks && (
            <div className="flex items-center justify-between">
              <span>Negative Marks:</span>
              <span className="font-medium text-error">-{currentQuestion.negativeMarks}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerPalette;