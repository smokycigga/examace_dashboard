import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

const ClerkWrapper = ({ children, meta }) => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    console.error('Missing Clerk Publishable Key');
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Authentication Configuration Error
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Clerk Publishable Key is missing from environment variables.
            </p>
            <div className="bg-gray-50 rounded-md p-4 text-left">
              <p className="text-xs text-gray-600 mb-2">To fix this issue:</p>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in your project root</li>
                <li>2. Add: <code className="bg-gray-200 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code></li>
                <li>3. Get your key from <a href="https://dashboard.clerk.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Clerk Dashboard</a></li>
                <li>4. Restart your development server</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;