import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import Button from '../ui/Button';

import Icon from '../AppIcon';

const UserOnboarding = ({ onComplete }) => {
  const { updateProfile } = useUserContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    targetExam: 'JEE Main/Advanced',
    dailyStudyHours: 6,
    learningStyle: 'Mixed',
    subjects: [],
    currentLevel: 'Intermediate',
    studyTimePreference: 'Evening',
    goals: '',
  });

  const steps = [
    {
      title: 'Welcome to ExamAce!',
      description: 'Let\'s personalize your learning experience',
      icon: 'Sparkles',
    },
    {
      title: 'Your Target Exam',
      description: 'Which exam are you preparing for?',
      icon: 'Target',
    },
    {
      title: 'Study Schedule',
      description: 'How much time can you dedicate daily?',
      icon: 'Clock',
    },
    {
      title: 'Learning Preferences',
      description: 'Tell us about your learning style',
      icon: 'Brain',
    },
    {
      title: 'Subject Focus',
      description: 'Which subjects need the most attention?',
      icon: 'BookOpen',
    },
  ];

  const examOptions = [
    'JEE Main/Advanced',
    'NEET',
    'BITSAT',
    'KVPY/KISHORE',
    'NTA UGCNET',
    'Other',
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual', description: 'Learn through diagrams and charts' },
    { id: 'auditory', label: 'Auditory', description: 'Learn through lectures and discussions' },
    { id: 'kinesthetic', label: 'Hands-on', description: 'Learn through practice and experiments' },
    { id: 'mixed', label: 'Mixed', description: 'Combination of all methods' },
  ];

  const subjects = [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'English',
    'Computer Science',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      updateProfile(formData);
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto"
            >
              <Icon name="Sparkles" size={40} className="text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Welcome to your learning journey!
              </h3>
              <p className="text-text-secondary">
                We'll help you create a personalized study plan that adapts to your needs and goals.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary">Select your target exam</h3>
            <div className="grid gap-3">
              {examOptions.map((exam) => (
                <motion.button
                  key={exam}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('targetExam', exam)}
                  className={`p-4 rounded-academic-lg border-2 transition-all duration-200 text-left ${
                    formData.targetExam === exam
                      ? 'border-primary bg-primary/5 text-primary' :'border-border bg-surface hover:border-primary/50 text-text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{exam}</span>
                    {formData.targetExam === exam && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary">Daily study time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Hours per day: {formData.dailyStudyHours}
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={formData.dailyStudyHours}
                  onChange={(e) => handleInputChange('dailyStudyHours', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-100 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>2 hours</span>
                  <span>12 hours</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preferred study time
                </label>
                <select
                  value={formData.studyTimePreference}
                  onChange={(e) => handleInputChange('studyTimePreference', e.target.value)}
                  className="w-full p-3 border border-border rounded-academic-lg bg-surface text-text-primary"
                >
                  <option value="Morning">Morning (6 AM - 12 PM)</option>
                  <option value="Afternoon">Afternoon (12 PM - 6 PM)</option>
                  <option value="Evening">Evening (6 PM - 10 PM)</option>
                  <option value="Night">Night (10 PM - 2 AM)</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary">Learning style</h3>
            <div className="grid gap-3">
              {learningStyles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('learningStyle', style.id)}
                  className={`p-4 rounded-academic-lg border-2 transition-all duration-200 text-left ${
                    formData.learningStyle === style.id
                      ? 'border-primary bg-primary/5' :'border-border bg-surface hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{style.label}</h4>
                      <p className="text-sm text-text-secondary mt-1">{style.description}</p>
                    </div>
                    {formData.learningStyle === style.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary">Focus subjects</h3>
            <p className="text-text-secondary">Select subjects you want to prioritize</p>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((subject) => (
                <motion.button
                  key={subject}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`p-4 rounded-academic-lg border-2 transition-all duration-200 text-center ${
                    formData.subjects.includes(subject)
                      ? 'border-primary bg-primary/5 text-primary' :'border-border bg-surface hover:border-primary/50 text-text-primary'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-medium">{subject}</span>
                    {formData.subjects.includes(subject) && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Any specific goals? (Optional)
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                placeholder="e.g., Improve Physics problem-solving, Target 95+ percentile..."
                rows={3}
                className="w-full p-3 border border-border rounded-academic-lg bg-surface text-text-primary resize-none"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-surface rounded-academic-xl shadow-academic-lg border border-border p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-text-secondary">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={steps[currentStep].icon} size={24} className="text-primary" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  {steps[currentStep].title}
                </h2>
                <p className="text-text-secondary text-sm">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {renderStepContent()}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <Button
              variant="primary"
              onClick={handleNext}
              iconName={currentStep === steps.length - 1 ? 'Check' : 'ArrowRight'}
              iconPosition="right"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;