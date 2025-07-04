import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/test-generator': { label: 'Test Generator', icon: 'Plus', parent: 'Practice Tests' },
    '/test-interface': { label: 'Test Interface', icon: 'Play', parent: 'Practice Tests' },
    '/test-results': { label: 'Test Results', icon: 'BarChart3', parent: 'Practice Tests' },
    '/test-history': { label: 'Test History', icon: 'History', parent: 'Performance' },
    '/ai-study-planner': { label: 'AI Study Planner', icon: 'Brain', parent: 'Performance' }
  };

  const parentMap = {
    'Practice Tests': { label: 'Practice Tests', icon: 'FileText' },
    'Performance': { label: 'Performance', icon: 'TrendingUp' }
  };

  const currentRoute = routeMap[location.pathname];
  
  if (!currentRoute) return null;

  const breadcrumbItems = [];

  // Add home/dashboard
  if (location.pathname !== '/dashboard') {
    breadcrumbItems.push({
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    });
  }

  // Add parent section if exists
  if (currentRoute.parent) {
    const parent = parentMap[currentRoute.parent];
    breadcrumbItems.push({
      label: parent.label,
      icon: parent.icon,
      isSection: true
    });
  }

  // Add current page
  breadcrumbItems.push({
    label: currentRoute.label,
    path: location.pathname,
    icon: currentRoute.icon,
    isCurrent: true
  });

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 py-4 px-6 bg-background border-b border-border-light">
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-text-muted flex-shrink-0" 
              />
            )}
            
            <div className="flex items-center space-x-2">
              {item.isCurrent ? (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary-50 rounded-academic border border-primary-200">
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className="text-primary flex-shrink-0" 
                  />
                  <span className="font-medium text-primary font-heading">
                    {item.label}
                  </span>
                </div>
              ) : item.isSection ? (
                <div className="flex items-center space-x-2 px-2 py-1 text-text-secondary">
                  <Icon 
                    name={item.icon} 
                    size={14} 
                    className="text-text-muted flex-shrink-0" 
                  />
                  <span className="font-caption">
                    {item.label}
                  </span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center space-x-2 px-2 py-1 text-text-secondary hover:text-primary hover:bg-primary-50 transition-smooth"
                >
                  <Icon 
                    name={item.icon} 
                    size={14} 
                    className="flex-shrink-0" 
                  />
                  <span className="font-caption">
                    {item.label}
                  </span>
                </Button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center space-x-2">
          {location.pathname === '/test-interface' && (
            <div className="flex items-center space-x-3 px-3 py-1.5 bg-warning-50 rounded-academic border border-warning-200">
              <Icon name="Clock" size={14} className="text-warning-600" />
              <span className="text-sm font-data text-warning-700">
                02:45:30
              </span>
            </div>
          )}
          
          {location.pathname === '/dashboard' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/test-generator')}
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
            >
              New Test
            </Button>
          )}

          {(location.pathname === '/test-results' || location.pathname === '/test-history') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;