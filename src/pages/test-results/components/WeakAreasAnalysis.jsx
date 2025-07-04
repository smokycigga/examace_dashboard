import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeakAreasAnalysis = ({ weakAreas, onStudyMaterial }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-error-50 border-error-200 text-error-700',
      'Medium': 'bg-warning-50 border-warning-200 text-warning-700',
      'Low': 'bg-success-50 border-success-200 text-success-700'
    };
    return colors[priority] || colors['Medium'];
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      'High': 'AlertCircle',
      'Medium': 'AlertTriangle',
      'Low': 'Info'
    };
    return icons[priority] || 'AlertTriangle';
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'Physics': 'Atom',
      'Chemistry': 'Flask',
      'Mathematics': 'Calculator',
      'Biology': 'Microscope'
    };
    return icons[subject] || 'BookOpen';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Areas Needing Attention
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <span className="text-sm text-text-secondary font-caption">
            {weakAreas.length} areas identified
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {weakAreas.map((area, index) => (
          <div key={index} className="border border-border rounded-academic p-4 hover:shadow-academic transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-50 rounded-academic flex items-center justify-center">
                  <Icon 
                    name={getSubjectIcon(area.subject)} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-heading font-semibold text-text-primary">
                      {area.topic}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getPriorityColor(area.priority)}`}>
                      {area.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary font-caption">
                    {area.subject} • {area.chapter}
                  </p>
                </div>
              </div>
              <Icon 
                name={getPriorityIcon(area.priority)} 
                size={20} 
                className={area.priority === 'High' ? 'text-error' : area.priority === 'Medium' ? 'text-warning' : 'text-success'} 
              />
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-heading font-bold text-error">
                  {area.accuracy}%
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-heading font-bold text-warning">
                  {area.attempted}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Attempted
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-heading font-bold text-text-primary">
                  {area.avgTime}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Avg. Time
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary font-caption">Mastery Level</span>
                <span className="text-text-primary font-data">{area.masteryLevel}%</span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    area.masteryLevel >= 70 ? 'bg-success' : 
                    area.masteryLevel >= 40 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${area.masteryLevel}%` }}
                />
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Common Mistakes:
              </h4>
              <div className="space-y-1">
                {area.commonMistakes.map((mistake, mistakeIndex) => (
                  <div key={mistakeIndex} className="flex items-start space-x-2">
                    <Icon name="X" size={12} className="text-error mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-secondary font-caption">
                      {mistake}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Recommendations */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Study Recommendations:
              </h4>
              <div className="space-y-1">
                {area.recommendations.map((recommendation, recIndex) => (
                  <div key={recIndex} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={12} className="text-success mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-secondary font-caption">
                      {recommendation}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border-light">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onStudyMaterial(area.topic, area.subject)}
                iconName="BookOpen"
                iconPosition="left"
                iconSize={14}
              >
                Study Material
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                iconName="Play"
                iconPosition="left"
                iconSize={14}
              >
                Practice Questions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
                iconName="Video"
                iconPosition="left"
                iconSize={14}
              >
                Watch Videos
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
                iconName="Users"
                iconPosition="left"
                iconSize={14}
              >
                Ask Doubts
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Improvement Plan */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Suggested Improvement Plan
        </h3>
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-academic p-4 border border-primary-200">
          <div className="flex items-start space-x-3">
            <Icon name="Target" size={20} className="text-primary mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-text-primary mb-2">
                30-Day Focus Plan
              </h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p className="font-caption">
                  • Week 1-2: Focus on high-priority topics with daily practice
                </p>
                <p className="font-caption">
                  • Week 3: Mixed practice combining weak and strong areas
                </p>
                <p className="font-caption">
                  • Week 4: Full-length mock tests and revision
                </p>
              </div>
              <div className="mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {}}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={14}
                >
                  Create Study Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeakAreasAnalysis;