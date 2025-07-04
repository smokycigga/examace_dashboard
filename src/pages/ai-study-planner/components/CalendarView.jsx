import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({ weeks, selectedWeek, onDateSelect, onTaskDrop }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getTasksForDate = (date) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    const allTasks = [];
    
    weeks.forEach(week => {
      week.days.forEach(day => {
        if (day.date === dateStr) {
          allTasks.push(...day.tasks.map(task => ({
            ...task,
            weekId: week.id,
            dayId: day.id
          })));
        }
      });
    });
    
    return allTasks;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedWeek) return false;
    const dateStr = date.toISOString().split('T')[0];
    return selectedWeek.days.some(day => day.date === dateStr);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    const taskData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onTaskDrop(taskData, date);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-surface rounded-academic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const tasks = getTasksForDate(date);
          const completedTasks = tasks.filter(task => task.completed).length;
          const totalTasks = tasks.length;
          
          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 border border-border-light rounded-academic-sm transition-colors ${
                date ? 'hover:bg-secondary-50 cursor-pointer' : ''
              } ${
                isToday(date) ? 'bg-primary-50 border-primary-200' : ''
              } ${
                isSelected(date) ? 'bg-accent-50 border-accent-200' : ''
              }`}
              onClick={() => date && onDateSelect(date)}
              onDragOver={handleDragOver}
              onDrop={(e) => date && handleDrop(e, date)}
            >
              {date && (
                <>
                  <div className="text-sm font-medium text-text-primary mb-1">
                    {date.getDate()}
                  </div>
                  {totalTasks > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary font-caption">
                          {completedTasks}/{totalTasks}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          completedTasks === totalTasks ? 'bg-success' :
                          completedTasks > 0 ? 'bg-warning' : 'bg-error'
                        }`} />
                      </div>
                      <div className="space-y-0.5">
                        {tasks.slice(0, 2).map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            className={`text-xs p-1 rounded truncate ${
                              task.type === 'theory' ? 'bg-primary-100 text-primary-700' :
                              task.type === 'practice' ? 'bg-warning-100 text-warning-700' :
                              task.type === 'test'? 'bg-error-100 text-error-700' : 'bg-success-100 text-success-700'
                            } ${task.completed ? 'opacity-50' : ''}`}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', JSON.stringify({
                                ...task,
                                originalDate: date
                              }));
                            }}
                          >
                            {task.title}
                          </div>
                        ))}
                        {tasks.length > 2 && (
                          <div className="text-xs text-text-muted text-center">
                            +{tasks.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-secondary-50 rounded-academic">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-100 rounded"></div>
            <span className="text-text-secondary font-caption">Theory</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-100 rounded"></div>
            <span className="text-text-secondary font-caption">Practice</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error-100 rounded"></div>
            <span className="text-text-secondary font-caption">Test</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-100 rounded"></div>
            <span className="text-text-secondary font-caption">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;