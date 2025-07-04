import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ testId, onRetakeTest, onReviewSolutions, onShareResults, onExportReport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExportReport();
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await onShareResults();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Next Steps
        </h2>
        <Icon name="ArrowRight" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Review Solutions */}
        <div className="bg-primary-50 border border-primary-200 rounded-academic p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="BookOpen" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-primary">
              Review Solutions
            </h3>
          </div>
          <p className="text-sm text-primary-600 font-caption mb-4">
            Go through detailed explanations for all questions to understand concepts better.
          </p>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={onReviewSolutions}
            iconName="Play"
            iconPosition="left"
            iconSize={14}
          >
            Start Review
          </Button>
        </div>

        {/* Retake Similar Test */}
        <div className="bg-accent-50 border border-accent-200 rounded-academic p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="RotateCcw" size={20} className="text-accent-600" />
            <h3 className="font-heading font-semibold text-accent-700">
              Retake Test
            </h3>
          </div>
          <p className="text-sm text-accent-600 font-caption mb-4">
            Take another test with similar difficulty and topics to track improvement.
          </p>
          <Button
            variant="warning"
            size="sm"
            fullWidth
            onClick={onRetakeTest}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            Generate Test
          </Button>
        </div>

        {/* Share Results */}
        <div className="bg-success-50 border border-success-200 rounded-academic p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Share2" size={20} className="text-success-600" />
            <h3 className="font-heading font-semibold text-success-700">
              Share Results
            </h3>
          </div>
          <p className="text-sm text-success-600 font-caption mb-4">
            Share your performance with friends or mentors for feedback and motivation.
          </p>
          <Button
            variant="success"
            size="sm"
            fullWidth
            onClick={handleShare}
            loading={isSharing}
            iconName="Share"
            iconPosition="left"
            iconSize={14}
          >
            Share Now
          </Button>
        </div>

        {/* Export Report */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-academic p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Download" size={20} className="text-secondary-600" />
            <h3 className="font-heading font-semibold text-secondary-700">
              Export Report
            </h3>
          </div>
          <p className="text-sm text-secondary-600 font-caption mb-4">
            Download a detailed PDF report for offline review and record keeping.
          </p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleExport}
            loading={isExporting}
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
          >
            Schedule Next Test
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={14}
          >
            Ask AI Tutor
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            iconName="Users"
            iconPosition="left"
            iconSize={14}
          >
            Join Study Group
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            iconName="BookMarked"
            iconPosition="left"
            iconSize={14}
          >
            Save to Favorites
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            iconName="Flag"
            iconPosition="left"
            iconSize={14}
          >
            Report Issue
          </Button>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-academic p-4 border border-primary-200">
          <div className="flex items-start space-x-3">
            <Icon name="Quote" size={20} className="text-primary mt-1" />
            <div>
              <p className="text-text-primary font-medium mb-2">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </p>
              <p className="text-sm text-text-secondary font-caption">
                - Winston Churchill
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Goals */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Set Your Next Goal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-border rounded-academic p-4 text-center">
            <Icon name="Target" size={24} className="text-primary mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">
              Accuracy Goal
            </h4>
            <p className="text-2xl font-heading font-bold text-primary mb-1">
              85%
            </p>
            <p className="text-xs text-text-muted font-caption">
              Next target
            </p>
          </div>
          <div className="bg-surface border border-border rounded-academic p-4 text-center">
            <Icon name="Clock" size={24} className="text-success mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">
              Time Goal
            </h4>
            <p className="text-2xl font-heading font-bold text-success mb-1">
              2:30
            </p>
            <p className="text-xs text-text-muted font-caption">
              Per question
            </p>
          </div>
          <div className="bg-surface border border-border rounded-academic p-4 text-center">
            <Icon name="Award" size={24} className="text-accent mx-auto mb-2" />
            <h4 className="font-medium text-text-primary mb-1">
              Rank Goal
            </h4>
            <p className="text-2xl font-heading font-bold text-accent mb-1">
              Top 500
            </p>
            <p className="text-xs text-text-muted font-caption">
              Target rank
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;