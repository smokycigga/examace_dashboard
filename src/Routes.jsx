import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import TestHistory from "pages/test-history";
import TestGenerator from "pages/test-generator";
import TestInterface from "pages/test-interface";
import AiStudyPlanner from "pages/ai-study-planner";
import TestResults from "pages/test-results";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-history" element={<TestHistory />} />
        <Route path="/test-generator" element={<TestGenerator />} />
        <Route path="/test-interface" element={<TestInterface />} />
        <Route path="/ai-study-planner" element={<AiStudyPlanner />} />
        <Route path="/test-results" element={<TestResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;