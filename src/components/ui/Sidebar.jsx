import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics'
    },
    {
      label: 'Practice Tests',
      icon: 'FileText',
      description: 'Test Management',
      children: [
        {
          label: 'Test Generator',
          path: '/test-generator',
          icon: 'Plus',
          description: 'Create new tests'
        },
        {
          label: 'Test Interface',
          path: '/test-interface',
          icon: 'Play',
          description: 'Take practice tests'
        },
        {
          label: 'Test Results',
          path: '/test-results',
          icon: 'BarChart3',
          description: 'View results'
        }
      ]
    },
    {
      label: 'Performance',
      icon: 'TrendingUp',
      description: 'Analytics & Planning',
      children: [
        {
          label: 'Test History',
          path: '/test-history',
          icon: 'History',
          description: 'Past performance'
        },
        {
          label: 'AI Study Planner',
          path: '/ai-study-planner',
          icon: 'Brain',
          description: 'Personalized planning'
        }
      ]
    }
  ];

  const [expandedSections, setExpandedSections] = useState({
    'Practice Tests': true,
    'Performance': true
  });

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const isActiveSection = (children) => {
    return children?.some(child => isActivePath(child.path));
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      setIsMobileOpen(false);
    }
  };

  const toggleSection = (label) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={20} className="text-primary" />
            <span className="font-heading font-semibold text-text-primary">
              Navigation
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex"
          iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
          iconSize={16}
        />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {navigationItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              // Section with children
              <div>
                <button
                  onClick={() => toggleSection(item.label)}
                  className={`w-full flex items-center justify-between p-3 rounded-academic transition-smooth hover:bg-secondary-50 ${
                    isActiveSection(item.children) ? 'bg-primary-50 text-primary' : 'text-text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={isActiveSection(item.children) ? 'text-primary' : 'text-text-secondary'} 
                    />
                    {!isCollapsed && (
                      <div className="text-left">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-text-muted font-caption">
                          {item.description}
                        </div>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`transition-transform duration-200 ${
                        expandedSections[item.label] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Children Items */}
                {expandedSections[item.label] && !isCollapsed && (
                  <div className="ml-6 mt-2 space-y-1 border-l border-border-light pl-4">
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => handleNavigation(child.path)}
                        className={`w-full flex items-center space-x-3 p-2 rounded-academic-sm transition-smooth hover:bg-secondary-50 ${
                          isActivePath(child.path)
                            ? 'bg-primary text-primary-foreground shadow-academic'
                            : 'text-text-primary'
                        }`}
                      >
                        <Icon 
                          name={child.icon} 
                          size={16} 
                          className={isActivePath(child.path) ? 'text-primary-foreground' : 'text-text-secondary'} 
                        />
                        <div className="text-left flex-1">
                          <div className="font-medium text-sm">{child.label}</div>
                          <div className={`text-xs font-caption ${
                            isActivePath(child.path) ? 'text-primary-200' : 'text-text-muted'
                          }`}>
                            {child.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Single navigation item
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 p-3 rounded-academic transition-smooth hover:bg-secondary-50 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-academic'
                    : 'text-text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={isActivePath(item.path) ? 'text-primary-foreground' : 'text-text-secondary'} 
                />
                {!isCollapsed && (
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className={`text-xs font-caption ${
                      isActivePath(item.path) ? 'text-primary-200' : 'text-text-muted'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                )}
              </button>
            )}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-academic p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="font-medium text-sm text-text-primary">
                Quick Tip
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              Use keyboard shortcuts to navigate faster during tests.
            </p>
            <Button
              variant="ghost"
              size="xs"
              className="mt-2 text-primary hover:text-primary-600"
              onClick={() => {}}
            >
              Learn More
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col bg-surface border-r border-border shadow-academic transition-all duration-300 ${
        isCollapsed ? 'lg:w-20' : 'lg:w-80'
      }`} style={{ top: '64px' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-80 max-w-xs bg-surface border-r border-border shadow-academic-xl">
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                iconName="X"
                iconSize={16}
              />
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile Sidebar Toggle */}
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-30 shadow-academic-lg"
        iconName="Menu"
        iconSize={18}
      />
    </>
  );
};

export default Sidebar;