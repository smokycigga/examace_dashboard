import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const UserContext = createContext();

const initialState = {
  profile: {
    name: '',
    targetExam: 'JEE Main/Advanced',
    dailyStudyHours: 6,
    learningStyle: 'Mixed',
    preferences: {
      studyReminders: true,
      difficultyLevel: 'Medium',
      focusAreas: [],
    }
  },
  performanceData: {
    overallAccuracy: 0,
    testsThisWeek: 0,
    studyStreak: 0,
    weakAreas: [],
    strengths: [],
    recentTests: [],
  },
  studyPlan: {
    currentWeek: null,
    recommendations: [],
    completedTasks: 0,
    totalTasks: 0,
  },
  isNewUser: true,
  lastLogin: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
        isNewUser: false,
      };
    
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performanceData: { ...state.performanceData, ...action.payload },
      };
    
    case 'SET_STUDY_PLAN':
      return {
        ...state,
        studyPlan: { ...state.studyPlan, ...action.payload },
      };
    
    case 'COMPLETE_TASK':
      return {
        ...state,
        studyPlan: {
          ...state.studyPlan,
          completedTasks: state.studyPlan.completedTasks + 1,
        },
      };
    
    case 'UPDATE_STREAK':
      return {
        ...state,
        performanceData: {
          ...state.performanceData,
          studyStreak: action.payload,
        },
      };
    
    case 'SET_LAST_LOGIN':
      return {
        ...state,
        lastLogin: action.payload,
      };
    
    case 'INITIALIZE_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { user, isSignedIn } = useUser();

  // Initialize user data when authenticated
  useEffect(() => {
    if (isSignedIn && user) {
      const userData = loadUserData(user.id);
      if (userData) {
        dispatch({ type: 'INITIALIZE_USER_DATA', payload: userData });
      } else {
        // New user setup
        const newUserProfile = {
          profile: {
            ...initialState.profile,
            name: user.firstName || user.username || 'Student',
          },
          isNewUser: true,
          lastLogin: new Date().toISOString(),
        };
        dispatch({ type: 'INITIALIZE_USER_DATA', payload: newUserProfile });
        saveUserData(user.id, newUserProfile);
      }
    }
  }, [isSignedIn, user]);

  // Auto-save user data when state changes
  useEffect(() => {
    if (isSignedIn && user && !state.isNewUser) {
      saveUserData(user.id, state);
    }
  }, [state, isSignedIn, user]);

  const updateProfile = (profileData) => {
    dispatch({ type: 'SET_USER_PROFILE', payload: profileData });
  };

  const updatePerformance = (performanceData) => {
    dispatch({ type: 'UPDATE_PERFORMANCE', payload: performanceData });
  };

  const setStudyPlan = (planData) => {
    dispatch({ type: 'SET_STUDY_PLAN', payload: planData });
  };

  const completeTask = () => {
    dispatch({ type: 'COMPLETE_TASK' });
  };

  const updateStreak = (days) => {
    dispatch({ type: 'UPDATE_STREAK', payload: days });
  };

  const value = {
    ...state,
    updateProfile,
    updatePerformance,
    setStudyPlan,
    completeTask,
    updateStreak,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Helper functions for data persistence
function loadUserData(userId) {
  try {
    const data = localStorage.getItem(`examace_user_${userId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}

function saveUserData(userId, userData) {
  try {
    localStorage.setItem(`examace_user_${userId}`, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
}