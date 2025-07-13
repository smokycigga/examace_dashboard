import React from 'react';
import { useUser, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const AuthenticatedLayout = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-text-secondary">Loading ExamAce...</p>
        </div>
      </div>
    );
  }

  // Not signed in - show landing/auth page
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-6xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ExamAce
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  Your AI-powered study companion for competitive exam success. 
                  Personalized learning, intelligent recommendations, and comprehensive test preparation.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: 'Brain',
                    title: 'AI Study Planner',
                    description: 'Personalized study schedules powered by advanced AI algorithms'
                  },
                  {
                    icon: 'Target',
                    title: 'Smart Testing',
                    description: 'Adaptive tests that adjust to your learning pace and performance'
                  },
                  {
                    icon: 'TrendingUp',
                    title: 'Progress Analytics',
                    description: 'Detailed insights and performance tracking for continuous improvement'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-surface rounded-academic p-6 shadow-academic border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-academic-sm flex items-center justify-center mb-4 mx-auto">
                      <Icon name={feature.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                    <p className="text-text-secondary text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Auth Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
              >
                <SignUpButton mode="modal">
                  <Button variant="primary" size="lg" className="min-w-40">
                    Get Started Free
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg" className="min-w-40">
                    Sign In
                  </Button>
                </SignInButton>
              </motion.div>

              {/* Demo Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16"
              >
                <img 
                  src="/assets/images/image-1752392946280.png" 
                  alt="ExamAce Dashboard Preview"
                  className="w-full max-w-4xl mx-auto rounded-academic-lg shadow-academic-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Signed in - show app with user context
  return (
    <div className="min-h-screen bg-background">
      {/* Global App Header with User */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-heading font-bold text-primary">ExamAce</h1>
              {user?.firstName && (
                <span className="text-text-secondary">
                  Welcome back, {user.firstName}!
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Calendar" size={16} />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main App Content */}
      <main className="pt-0">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;