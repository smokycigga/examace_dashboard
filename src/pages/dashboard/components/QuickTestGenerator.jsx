import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const QuickTestGenerator = () => {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState(['Physics']);
  const [difficulty, setDifficulty] = useState('Mixed');
  const [duration, setDuration] = useState(60);
  const [testMode, setTestMode] = useState('Timed');

  const subjects = [
    { name: 'Physics', icon: 'Atom', color: 'text-blue-600' },
    { name: 'Chemistry', icon: 'FlaskConical', color: 'text-green-600' },
    { name: 'Mathematics', icon: 'Calculator', color: 'text-purple-600' },
    { name: 'Biology', icon: 'Microscope', color: 'text-red-600' }
  ];

  const difficulties = ['Easy', 'Mixed', 'Advanced'];
  const durations = [15, 30, 60, 180];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleGenerateTest = () => {
    const testConfig = {
      subjects: selectedSubjects,
      difficulty,
      duration,
      mode: testMode,
      questionsPerSubject: Math.floor(30 / selectedSubjects.length)
    };
    
    navigate('/test-generator', { state: { quickConfig: testConfig } });
  };

  const getEstimatedQuestions = () => {
    const baseQuestions = duration <= 30 ? 15 : duration <= 60 ? 30 : 90;
    return Math.floor(baseQuestions / selectedSubjects.length) * selectedSubjects.length;
  };

  return (
    <div className="bg-surface rounded-academic-lg p-6 border border-border shadow-academic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Quick Test Generator
          </h3>
          <p className="text-text-secondary font-caption text-sm">
            Generate a personalized practice test
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-primary-50 rounded-academic px-3 py-1">
          <Icon name="Zap" size={16} className="text-primary" />
          <span className="text-sm font-data font-semibold text-primary">
            Quick Start
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Subject Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Select Subjects
          </label>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <button
                key={subject.name}
                onClick={() => handleSubjectToggle(subject.name)}
                className={`flex items-center space-x-3 p-3 rounded-academic border-2 transition-smooth ${
                  selectedSubjects.includes(subject.name)
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface text-text-primary hover:border-primary-300'
                }`}
              >
                <Icon 
                  name={subject.icon} 
                  size={20} 
                  className={selectedSubjects.includes(subject.name) ? 'text-primary' : subject.color} 
                />
                <span className="font-caption text-sm">
                  {subject.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Difficulty Level
          </label>
          <div className="flex space-x-2">
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 px-4 rounded-academic border transition-smooth ${
                  difficulty === level
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-text-primary hover:border-primary-300'
                }`}
              >
                <span className="font-caption text-sm">
                  {level}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration and Mode */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Duration (minutes)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border border-border rounded-academic bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur} minutes
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Test Mode
            </label>
            <select
              value={testMode}
              onChange={(e) => setTestMode(e.target.value)}
              className="w-full p-2 border border-border rounded-academic bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Timed">Timed</option>
              <option value="Untimed">Untimed</option>
            </select>
          </div>
        </div>

        {/* Test Preview */}
        <div className="bg-secondary-50 rounded-academic p-4">
          <h4 className="font-medium text-text-primary text-sm mb-2">
            Test Preview
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={14} className="text-text-secondary" />
              <span className="text-text-secondary font-caption">
                ~{getEstimatedQuestions()} questions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-text-secondary" />
              <span className="text-text-secondary font-caption">
                {duration} minutes
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={14} className="text-text-secondary" />
              <span className="text-text-secondary font-caption">
                {difficulty} level
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={14} className="text-text-secondary" />
              <span className="text-text-secondary font-caption">
                {selectedSubjects.length} subjects
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleGenerateTest}
            disabled={selectedSubjects.length === 0}
            iconName="Play"
            iconPosition="left"
            iconSize={16}
          >
            Start Test
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/test-generator')}
            iconName="Settings"
            iconSize={16}
          >
            Advanced
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickTestGenerator;