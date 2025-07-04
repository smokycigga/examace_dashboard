import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const WeeklyPlanCard = ({ week, onTaskToggle, onWeekSelect, isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedTasks = week.days.reduce((total, day) => 
    total + day.tasks.filter(task => task.completed).length, 0
  );
  const totalTasks = week.days.reduce((total, day) => total + day.tasks.length, 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getProgressColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-surface rounded-academic-lg border transition-all duration-200 ${
      isSelected ? 'border-primary shadow-academic-lg' : 'border-border hover:border-border-dark'
    }`}>
      <div 
        className="p-4 cursor-pointer"
        onClick={() => {
          onWeekSelect(week.id);
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              {week.title}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {week.dateRange}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`text-right ${getProgressColor(completionRate)}`}>
              <div className="text-lg font-bold font-data">
                {completionRate}%
              </div>
              <div className="text-xs font-caption">
                {completedTasks}/{totalTasks}
              </div>
            </div>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-text-secondary" 
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex-1 bg-secondary-100 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                completionRate >= 80 ? 'bg-success' :
                completionRate >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-text-muted" />
              <span className="text-text-secondary font-caption">
                {week.totalHours}h planned
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Target" size={14} className="text-text-muted" />
              <span className="text-text-secondary font-caption">
                {week.focusAreas.join(', ')}
              </span>
            </div>
          </div>
          {week.badge && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              week.badge.type === 'streak' ? 'bg-success-100 text-success-700' :
              week.badge.type === 'improvement'? 'bg-primary-100 text-primary-700' : 'bg-warning-100 text-warning-700'
            }`}>
              {week.badge.text}
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border-light animate-slide-up">
          <div className="p-4 space-y-4">
            {week.days.map((day) => (
              <div key={day.id} className="bg-background rounded-academic p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">
                    {day.name}
                  </h4>
                  <span className="text-sm text-text-secondary font-caption">
                    {day.date}
                  </span>
                </div>
                <div className="space-y-2">
                  {day.tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskToggle(week.id, day.id, task.id);
                        }}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-success border-success' :'border-border-dark hover:border-primary'
                        }`}
                      >
                        {task.completed && (
                          <Icon name="Check" size={12} className="text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${
                          task.completed ? 'text-text-muted line-through' : 'text-text-primary'
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-text-secondary font-caption">
                            {task.duration}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.type === 'theory' ? 'bg-primary-100 text-primary-700' :
                            task.type === 'practice' ? 'bg-warning-100 text-warning-700' :
                            task.type === 'test'? 'bg-error-100 text-error-700' : 'bg-success-100 text-success-700'
                          }`}>
                            {task.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlanCard;