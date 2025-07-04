import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState('JEE Main');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const examOptions = [
    { value: 'JEE Main', label: 'JEE Main', icon: 'Calculator' },
    { value: 'JEE Advanced', label: 'JEE Advanced', icon: 'Zap' },
    { value: 'NEET', label: 'NEET', icon: 'Stethoscope' }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Test Reminder',
      message: 'Your scheduled mock test starts in 30 minutes',
      time: '2 min ago',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      title: 'Performance Update',
      message: 'Your Physics score improved by 15% this week',
      time: '1 hour ago',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'Study Plan',
      message: 'New AI recommendations available',
      time: '3 hours ago',
      type: 'info',
      unread: false
    },
    {
      id: 4,
      title: 'Achievement Unlocked',
      message: 'Completed 7-day study streak!',
      time: '5 hours ago',
      type: 'success',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExamChange = (examValue) => {
    setSelectedExam(examValue);
    // You can add logic here to update the dashboard based on selected exam
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here
  };

  const handleProfileAction = (action) => {
    setIsProfileOpen(false);
    switch (action) {
      case 'profile': navigate('/profile');
        break;
      case 'settings': navigate('/settings');
        break;
      case 'logout':
        // Handle logout logic
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark as read and handle navigation based on type
    setIsNotificationsOpen(false);
    // Add notification-specific navigation logic
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center shadow-academic">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-bold text-text-primary">
          ExamAce
        </h1>
        <p className="text-xs text-text-secondary font-caption">
          Your Success Partner
        </p>
      </div>
    </div>
  );

  const ExamSelector = () => (
    <div className="relative">
      <select
        value={selectedExam}
        onChange={(e) => handleExamChange(e.target.value)}
        className="appearance-none bg-surface border border-border rounded-academic px-4 py-2 pr-10 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth hover:border-border-dark"
      >
        {examOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Icon name="ChevronDown" size={16} className="text-text-secondary" />
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-academic">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center Section - Exam Selector (Desktop) */}
          <div className="hidden md:flex items-center">
            <ExamSelector />
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="hidden sm:flex"
              iconName={isDarkMode ? "Sun" : "Moon"}
              iconSize={18}
              title="Toggle theme"
            />

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative"
                iconName="Bell"
                iconSize={18}
                title="Notifications"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                  {unreadCount}
                </span>
              )}

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-academic-lg shadow-academic-lg border border-border z-50 animate-fade-in">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-semibold text-text-primary">
                      Notifications
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {unreadCount} unread notifications
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 border-b border-border-light hover:bg-secondary-50 cursor-pointer transition-smooth ${
                          notification.unread ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-success' :
                            notification.type === 'warning' ? 'bg-warning' :
                            notification.type === 'error' ? 'bg-error' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary text-sm">
                              {notification.title}
                            </p>
                            <p className="text-text-secondary text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-text-muted text-xs mt-2 font-caption">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-secondary hidden sm:block" />
              </Button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface rounded-academic-lg shadow-academic-lg border border-border z-50 animate-fade-in">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-text-primary">Arjun Sharma</p>
                    <p className="text-sm text-text-secondary">arjun@example.com</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        Premium
                      </span>
                      <span className="text-xs text-text-muted font-data">
                        Rank: #1,247
                      </span>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => handleProfileAction('profile')}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-smooth"
                    >
                      <Icon name="User" size={16} className="mr-3" />
                      My Profile
                    </button>
                    <button
                      onClick={() => handleProfileAction('settings')}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-smooth"
                    >
                      <Icon name="Settings" size={16} className="mr-3" />
                      Settings
                    </button>
                    <button
                      onClick={() => handleProfileAction('help')}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-smooth"
                    >
                      <Icon name="HelpCircle" size={16} className="mr-3" />
                      Help & Support
                    </button>
                  </div>
                  <div className="border-t border-border py-2">
                    <button
                      onClick={() => handleProfileAction('logout')}
                      className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              iconName="Menu"
              iconSize={18}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface animate-slide-up">
            <div className="px-4 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Select Exam
                </label>
                <ExamSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;