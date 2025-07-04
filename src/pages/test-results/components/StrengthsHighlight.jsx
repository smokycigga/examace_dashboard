import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StrengthsHighlight = ({ strengths }) => {
  const getSubjectIcon = (subject) => {
    const icons = {
      'Physics': 'Atom',
      'Chemistry': 'Flask',
      'Mathematics': 'Calculator',
      'Biology': 'Microscope'
    };
    return icons[subject] || 'BookOpen';
  };

  const getPerformanceLevel = (accuracy) => {
    if (accuracy >= 90) return { level: 'Excellent', color: 'success', icon: 'Star' };
    if (accuracy >= 80) return { level: 'Very Good', color: 'primary', icon: 'Award' };
    if (accuracy >= 70) return { level: 'Good', color: 'accent', icon: 'ThumbsUp' };
    return { level: 'Average', color: 'secondary', icon: 'Check' };
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Your Strengths
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-success" />
          <span className="text-sm text-text-secondary font-caption">
            {strengths.length} strong areas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {strengths.map((strength, index) => {
          const performance = getPerformanceLevel(strength.accuracy);
          return (
            <div key={index} className={`bg-${performance.color}-50 border border-${performance.color}-200 rounded-academic p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 bg-${performance.color} rounded-academic flex items-center justify-center`}>
                    <Icon 
                      name={getSubjectIcon(strength.subject)} 
                      size={16} 
                      className="text-white" 
                    />
                  </div>
                  <div>
                    <h3 className={`font-heading font-semibold text-${performance.color}-700 text-sm`}>
                      {strength.topic}
                    </h3>
                    <p className={`text-xs text-${performance.color}-600 font-caption`}>
                      {strength.subject}
                    </p>
                  </div>
                </div>
                <Icon 
                  name={performance.icon} 
                  size={16} 
                  className={`text-${performance.color}-600`} 
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-xs text-${performance.color}-600 font-caption`}>
                    Accuracy
                  </span>
                  <span className={`text-sm font-data font-bold text-${performance.color}-700`}>
                    {strength.accuracy}%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-${performance.color}`}
                    style={{ width: `${strength.accuracy}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className={`font-bold text-${performance.color}-700`}>
                    {strength.questionsCorrect}
                  </div>
                  <div className={`text-${performance.color}-600 font-caption`}>
                    Correct
                  </div>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-${performance.color}-700`}>
                    {strength.avgTime}
                  </div>
                  <div className={`text-${performance.color}-600 font-caption`}>
                    Avg. Time
                  </div>
                </div>
              </div>

              <div className={`mt-3 px-2 py-1 bg-white rounded-academic-sm border border-${performance.color}-200`}>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className={`text-${performance.color}-600`} />
                  <span className={`text-xs text-${performance.color}-700 font-caption`}>
                    {performance.level} Performance
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Section */}
      <div className="bg-gradient-to-r from-success-50 to-primary-50 rounded-academic p-6 border border-success-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Excellent Work! Keep It Up! 🎉
            </h3>
            <p className="text-text-secondary font-caption mb-4">
              You've shown strong performance in these areas. Your consistent practice and understanding are paying off. 
              Use these strengths to boost your confidence and help with challenging topics.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-academic p-3 border border-success-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-success" />
                  <span className="text-sm font-medium text-text-primary">
                    Consistency Score
                  </span>
                </div>
                <div className="text-2xl font-heading font-bold text-success">
                  {Math.round(strengths.reduce((acc, s) => acc + s.accuracy, 0) / strengths.length)}%
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Across strong topics
                </div>
              </div>

              <div className="bg-white rounded-academic p-3 border border-primary-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">
                    Efficiency
                  </span>
                </div>
                <div className="text-2xl font-heading font-bold text-primary">
                  {strengths[0]?.avgTime || '1:30'}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  Average time per question
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={() => {}}
                iconName="BookOpen"
                iconPosition="left"
                iconSize={14}
              >
                Advanced Practice
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                iconName="Users"
                iconPosition="left"
                iconSize={14}
              >
                Help Others
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
                iconName="Share"
                iconPosition="left"
                iconSize={14}
              >
                Share Achievement
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips to Maintain Strengths */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
          Tips to Maintain Your Strengths
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Repeat" size={16} className="text-primary mt-1" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">
                  Regular Practice
                </h4>
                <p className="text-sm text-text-secondary font-caption">
                  Continue practicing these topics to maintain your edge
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="ArrowUp" size={16} className="text-success mt-1" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">
                  Challenge Yourself
                </h4>
                <p className="text-sm text-text-secondary font-caption">
                  Try advanced level questions in these areas
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Users" size={16} className="text-accent mt-1" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">
                  Teach Others
                </h4>
                <p className="text-sm text-text-secondary font-caption">
                  Explaining concepts reinforces your understanding
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Link" size={16} className="text-primary mt-1" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">
                  Connect Concepts
                </h4>
                <p className="text-sm text-text-secondary font-caption">
                  Use these strengths to understand related topics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthsHighlight;