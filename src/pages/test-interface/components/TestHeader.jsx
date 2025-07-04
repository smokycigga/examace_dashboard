import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestHeader = ({ 
  testName, 
  sections, 
  activeSection, 
  onSectionChange, 
  duration, 
  onTimeUp,
  onSubmitTest 
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert minutes to seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeWarningClass = () => {
    const percentage = (timeRemaining / (duration * 60)) * 100;
    if (percentage <= 10) return 'text-error bg-error-50 border-error-200';
    if (percentage <= 25) return 'text-warning bg-warning-50 border-warning-200';
    return 'text-success bg-success-50 border-success-200';
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleExitAttempt = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setShowExitConfirm(false);
    setIsFullscreen(false);
  };

  return (
    <>
      <header className="bg-surface border-b border-border shadow-academic sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Test Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-white" />
                </div>
                <div>
                  <h1 className="font-heading font-semibold text-text-primary">
                    {testName}
                  </h1>
                  <p className="text-xs text-text-secondary font-caption">
                    Live Test Session
                  </p>
                </div>
              </div>
            </div>

            {/* Center Section - Timer */}
            <div className={`flex items-center space-x-3 px-4 py-2 rounded-academic border-2 font-data ${getTimeWarningClass()}`}>
              <Icon name="Clock" size={18} />
              <div className="text-center">
                <div className="text-lg font-bold">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-xs opacity-80">
                  Time Remaining
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                iconName={isFullscreen ? "Minimize2" : "Maximize2"}
                iconSize={16}
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={onSubmitTest}
                iconName="Send"
                iconPosition="left"
                iconSize={14}
              >
                Submit Test
              </Button>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex items-center space-x-1 mt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-academic transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-academic'
                    : 'bg-secondary-50 text-text-primary hover:bg-secondary-100'
                }`}
              >
                <Icon 
                  name={section.icon} 
                  size={16} 
                  className={activeSection === section.id ? 'text-primary-foreground' : 'text-text-secondary'} 
                />
                <span className="font-medium text-sm">{section.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeSection === section.id
                    ? 'bg-primary-200 text-primary-800' :'bg-secondary-200 text-text-secondary'
                }`}>
                  {section.questionCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface rounded-academic-lg shadow-academic-xl border border-border p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-primary">
                  Exit Fullscreen?
                </h3>
                <p className="text-sm text-text-secondary">
                  This may affect your test experience
                </p>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-6">
              Exiting fullscreen mode during the test is not recommended as it may cause distractions and affect your performance.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => setShowExitConfirm(false)}
              >
                Stay in Fullscreen
              </Button>
              <Button
                variant="danger"
                size="sm"
                fullWidth
                onClick={confirmExit}
              >
                Exit Anyway
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestHeader;