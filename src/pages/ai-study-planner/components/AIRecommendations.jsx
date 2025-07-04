import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ recommendations, onApplyRecommendation, onDismissRecommendation }) => {
  const [expandedRec, setExpandedRec] = useState(null);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'focus': return 'Target';
      case 'practice': return 'Repeat';
      case 'revision': return 'BookOpen';
      case 'test': return 'FileText';
      case 'break': return 'Coffee';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error-200 bg-error-50';
      case 'medium': return 'border-warning-200 bg-warning-50';
      case 'low': return 'border-success-200 bg-success-50';
      default: return 'border-primary-200 bg-primary-50';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error-100 text-error-700',
      medium: 'bg-warning-100 text-warning-700',
      low: 'bg-success-100 text-success-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </span>
    );
  };

  return (
    <div className="bg-surface rounded-academic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              AI Recommendations
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Personalized suggestions based on your performance
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          iconName="RefreshCw"
          iconSize={16}
        >
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`border rounded-academic-lg p-4 transition-all duration-200 ${getRecommendationColor(rec.priority)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-error-100' :
                  rec.priority === 'medium'? 'bg-warning-100' : 'bg-success-100'
                }`}>
                  <Icon 
                    name={getRecommendationIcon(rec.type)} 
                    size={18} 
                    className={
                      rec.priority === 'high' ? 'text-error-600' :
                      rec.priority === 'medium'? 'text-warning-600' : 'text-success-600'
                    } 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {rec.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getPriorityBadge(rec.priority)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
                  iconName={expandedRec === rec.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={16}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-text-muted" />
                  <span className="text-text-secondary font-caption">
                    {rec.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-text-muted" />
                  <span className="text-text-secondary font-caption">
                    +{rec.expectedImprovement}% improvement
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismissRecommendation(rec.id)}
                  iconName="X"
                  iconSize={14}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onApplyRecommendation(rec)}
                >
                  Apply
                </Button>
              </div>
            </div>

            {expandedRec === rec.id && (
              <div className="mt-4 pt-4 border-t border-border-light animate-slide-up">
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">
                      Detailed Analysis
                    </h5>
                    <p className="text-sm text-text-secondary">
                      {rec.analysis}
                    </p>
                  </div>
                  
                  {rec.actionItems && (
                    <div>
                      <h5 className="font-medium text-text-primary mb-2">
                        Action Items
                      </h5>
                      <ul className="space-y-1">
                        {rec.actionItems.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="ArrowRight" size={12} className="text-text-muted" />
                            <span className="text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {rec.resources && (
                    <div>
                      <h5 className="font-medium text-text-primary mb-2">
                        Recommended Resources
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {rec.resources.map((resource, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="xs"
                            onClick={() => window.open(resource.url, '_blank')}
                            iconName="ExternalLink"
                            iconPosition="right"
                            iconSize={12}
                          >
                            {resource.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">
            All Caught Up!
          </h4>
          <p className="text-sm text-text-secondary">
            You're following your study plan perfectly. Keep up the great work!
          </p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;