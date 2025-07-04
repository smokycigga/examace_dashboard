import React from 'react';
import Icon from '../../../components/AppIcon';

const TestModeSelector = ({ testMode, onTestModeChange, duration, onDurationChange, customDuration, onCustomDurationChange }) => {
  const durationOptions = [
    { value: 15, label: '15 minutes', description: 'Quick practice' },
    { value: 30, label: '30 minutes', description: 'Short test' },
    { value: 60, label: '1 hour', description: 'Standard test' },
    { value: 180, label: '3 hours', description: 'Full exam simulation' },
    { value: 'custom', label: 'Custom', description: 'Set your own time' }
  ];

  return (
    <div className="space-y-6">
      {/* Test Mode Toggle */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-text-primary">Test Mode</h3>
        </div>
        
        <div className="flex bg-secondary-100 rounded-academic p-1">
          <button
            onClick={() => onTestModeChange('timed')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-academic-sm transition-all duration-200 ${
              testMode === 'timed' ?'bg-primary text-primary-foreground shadow-academic' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Timer" size={16} />
            <span className="font-medium">Timed</span>
          </button>
          <button
            onClick={() => onTestModeChange('untimed')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-academic-sm transition-all duration-200 ${
              testMode === 'untimed' ?'bg-primary text-primary-foreground shadow-academic' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Infinity" size={16} />
            <span className="font-medium">Untimed</span>
          </button>
        </div>
        
        <div className="text-sm text-text-secondary bg-secondary-50 p-3 rounded-academic">
          <Icon name="Info" size={14} className="inline mr-2" />
          {testMode === 'timed' ?'Time pressure simulates real exam conditions and improves speed' :'Practice without time constraints to focus on accuracy and understanding'
          }
        </div>
      </div>

      {/* Duration Selection */}
      {testMode === 'timed' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Hourglass" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-text-primary">Duration</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {durationOptions.map((option) => (
              <label
                key={option.value}
                className={`block p-3 rounded-academic border-2 cursor-pointer transition-all duration-200 ${
                  duration === option.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark bg-surface'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="duration"
                    value={option.value}
                    checked={duration === option.value}
                    onChange={(e) => onDurationChange(e.target.value === 'custom' ? 'custom' : parseInt(e.target.value))}
                    className="w-4 h-4 text-primary border-2 border-border focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-text-muted font-caption">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          
          {duration === 'custom' && (
            <div className="mt-4 p-4 bg-secondary-50 rounded-academic">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Custom Duration (minutes)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={customDuration}
                  onChange={(e) => onCustomDurationChange(parseInt(e.target.value) || 0)}
                  className="w-24 px-3 py-2 border border-border rounded-academic focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="60"
                />
                <span className="text-sm text-text-secondary">minutes</span>
                <div className="text-xs text-text-muted">
                  (5-300 minutes allowed)
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestModeSelector;