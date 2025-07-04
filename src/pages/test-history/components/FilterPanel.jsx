import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onFilterChange, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    examType: 'all',
    scoreRange: { min: 0, max: 100 },
    subjects: [],
    testType: 'all'
  });

  const examTypes = [
    { value: 'all', label: 'All Exams' },
    { value: 'jee-main', label: 'JEE Main' },
    { value: 'jee-advanced', label: 'JEE Advanced' },
    { value: 'neet', label: 'NEET UG' }
  ];

  const testTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'full-test', label: 'Full Test' },
    { value: 'subject-test', label: 'Subject Test' },
    { value: 'topic-test', label: 'Topic Test' },
    { value: 'mock-test', label: 'Mock Test' }
  ];

  const subjects = [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'biology', label: 'Biology' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSubjectToggle = (subject) => {
    const newSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter(s => s !== subject)
      : [...filters.subjects, subject];
    handleFilterChange('subjects', newSubjects);
  };

  const clearFilters = () => {
    const defaultFilters = {
      dateRange: { start: '', end: '' },
      examType: 'all',
      scoreRange: { min: 0, max: 100 },
      subjects: [],
      testType: 'all'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = () => {
    return filters.dateRange.start || 
           filters.dateRange.end || 
           filters.examType !== 'all' || 
           filters.scoreRange.min > 0 || 
           filters.scoreRange.max < 100 || 
           filters.subjects.length > 0 || 
           filters.testType !== 'all';
  };

  if (!isOpen) {
    return (
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="relative"
        >
          Filters
          {hasActiveFilters() && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-academic border border-border shadow-academic p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-text-primary flex items-center">
          <Icon name="Filter" size={18} className="mr-2" />
          Filters
        </h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="ChevronUp"
            iconSize={16}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date Range
          </label>
          <div className="space-y-2">
            <Input
              type="date"
              placeholder="Start Date"
              value={filters.dateRange.start}
              onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
            />
            <Input
              type="date"
              placeholder="End Date"
              value={filters.dateRange.end}
              onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
            />
          </div>
        </div>

        {/* Exam Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Exam Type
          </label>
          <select
            value={filters.examType}
            onChange={(e) => handleFilterChange('examType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-academic bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {examTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Test Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Test Type
          </label>
          <select
            value={filters.testType}
            onChange={(e) => handleFilterChange('testType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-academic bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {testTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Score Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Score Range
          </label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.scoreRange.min}
              onChange={(e) => handleFilterChange('scoreRange', { ...filters.scoreRange, min: parseInt(e.target.value) || 0 })}
              min="0"
              max="100"
            />
            <span className="text-text-secondary">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.scoreRange.max}
              onChange={(e) => handleFilterChange('scoreRange', { ...filters.scoreRange, max: parseInt(e.target.value) || 100 })}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Subjects */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Subjects
          </label>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject.value}
                variant={filters.subjects.includes(subject.value) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleSubjectToggle(subject.value)}
              >
                {subject.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;