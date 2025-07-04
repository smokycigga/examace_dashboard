import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectBreakdown = ({ subjects }) => {
  const getSubjectIcon = (subject) => {
    const icons = {
      'Physics': 'Atom',
      'Chemistry': 'Flask',
      'Mathematics': 'Calculator',
      'Biology': 'Microscope'
    };
    return icons[subject] || 'BookOpen';
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'bg-success text-success-foreground';
    if (percentage >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-error text-error-foreground';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Subject-wise Performance
        </h2>
        <Icon name="BarChart3" size={20} className="text-primary" />
      </div>

      <div className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={index} className="border border-border rounded-academic p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-50 rounded-academic flex items-center justify-center">
                  <Icon 
                    name={getSubjectIcon(subject.name)} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-text-secondary font-caption">
                    {subject.attempted}/{subject.total} questions attempted
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-data ${getPerformanceColor(subject.percentage)}`}>
                {subject.percentage}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary font-caption">Progress</span>
                <span className="text-text-primary font-data">
                  {subject.correct}/{subject.total}
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(subject.percentage)}`}
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-heading font-bold text-success">
                  {subject.correct}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Correct
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-heading font-bold text-error">
                  {subject.incorrect}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Incorrect
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-heading font-bold text-text-muted">
                  {subject.skipped}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Skipped
                </div>
              </div>
            </div>

            {/* Time Analysis */}
            <div className="mt-4 pt-4 border-t border-border-light">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary font-caption">
                    Avg. time per question
                  </span>
                </div>
                <span className="font-data text-text-primary">
                  {subject.avgTimePerQuestion}
                </span>
              </div>
            </div>

            {/* Weak Topics */}
            {subject.weakTopics && subject.weakTopics.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border-light">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={14} className="text-warning" />
                  <span className="text-sm font-medium text-text-primary">
                    Areas to Focus
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subject.weakTopics.map((topic, topicIndex) => (
                    <span 
                      key={topicIndex}
                      className="px-2 py-1 bg-warning-50 text-warning-700 rounded-academic-sm text-xs font-caption"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectBreakdown;