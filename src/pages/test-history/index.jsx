import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistant from '../../components/ui/AIAssistant';
import TestHistoryCard from './components/TestHistoryCard';
import TestHistoryTable from './components/TestHistoryTable';
import PerformanceGraph from './components/PerformanceGraph';
import FilterPanel from './components/FilterPanel';
import StatisticsPanel from './components/StatisticsPanel';

const TestHistory = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock test history data
  const mockTests = [
    {
      id: 1,
      name: "JEE Main Mock Test #15",
      type: "Full Test",
      date: "15/12/2024",
      score: 85,
      accuracy: 78,
      duration: 180,
      rank: 1247,
      weakAreas: ["Organic Chemistry", "Thermodynamics", "Coordinate Geometry"],
      subjectPerformance: [
        { name: "Physics", score: 82 },
        { name: "Chemistry", score: 75 },
        { name: "Mathematics", score: 88 }
      ],
      avgTimePerQuestion: 125,
      timeEfficiency: 85,
      attempted: 85,
      totalQuestions: 90,
      correct: 66
    },
    {
      id: 2,
      name: "Physics Chapter Test - Mechanics",
      type: "Subject Test",
      date: "12/12/2024",
      score: 92,
      accuracy: 88,
      duration: 60,
      rank: 456,
      weakAreas: ["Rotational Motion", "Work Energy"],
      subjectPerformance: [
        { name: "Mechanics", score: 92 }
      ],
      avgTimePerQuestion: 95,
      timeEfficiency: 92,
      attempted: 28,
      totalQuestions: 30,
      correct: 25
    },
    {
      id: 3,
      name: "Chemistry Full Syllabus Test",
      type: "Full Test",
      date: "10/12/2024",
      score: 76,
      accuracy: 72,
      duration: 120,
      rank: 2156,
      weakAreas: ["Organic Chemistry", "Chemical Bonding", "Electrochemistry"],
      subjectPerformance: [
        { name: "Physical Chemistry", score: 78 },
        { name: "Organic Chemistry", score: 68 },
        { name: "Inorganic Chemistry", score: 82 }
      ],
      avgTimePerQuestion: 140,
      timeEfficiency: 78,
      attempted: 48,
      totalQuestions: 50,
      correct: 35
    },
    {
      id: 4,
      name: "Mathematics Topic Test - Calculus",
      type: "Topic Test",
      date: "08/12/2024",
      score: 88,
      accuracy: 85,
      duration: 45,
      rank: 678,
      weakAreas: ["Integration", "Differential Equations"],
      subjectPerformance: [
        { name: "Calculus", score: 88 }
      ],
      avgTimePerQuestion: 108,
      timeEfficiency: 88,
      attempted: 22,
      totalQuestions: 25,
      correct: 19
    },
    {
      id: 5,
      name: "JEE Advanced Mock Test #8",
      type: "Mock Test",
      date: "05/12/2024",
      score: 72,
      accuracy: 68,
      duration: 210,
      rank: 3245,
      weakAreas: ["Modern Physics", "Organic Chemistry", "3D Geometry"],
      subjectPerformance: [
        { name: "Physics", score: 75 },
        { name: "Chemistry", score: 65 },
        { name: "Mathematics", score: 78 }
      ],
      avgTimePerQuestion: 155,
      timeEfficiency: 72,
      attempted: 78,
      totalQuestions: 90,
      correct: 53
    }
  ];

  // Mock performance graph data
  const mockGraphData = [
    { date: "01/11/2024", score: 65, accuracy: 62, rank: 4500 },
    { date: "05/11/2024", score: 68, accuracy: 65, rank: 4200 },
    { date: "10/11/2024", score: 72, accuracy: 68, rank: 3800 },
    { date: "15/11/2024", score: 75, accuracy: 71, rank: 3500 },
    { date: "20/11/2024", score: 78, accuracy: 74, rank: 3200 },
    { date: "25/11/2024", score: 82, accuracy: 76, rank: 2800 },
    { date: "30/11/2024", score: 85, accuracy: 78, rank: 2400 },
    { date: "05/12/2024", score: 72, accuracy: 68, rank: 3245 },
    { date: "08/12/2024", score: 88, accuracy: 85, rank: 678 },
    { date: "10/12/2024", score: 76, accuracy: 72, rank: 2156 },
    { date: "12/12/2024", score: 92, accuracy: 88, rank: 456 },
    { date: "15/12/2024", score: 85, accuracy: 78, rank: 1247 }
  ];

  // Mock statistics data
  const mockStatistics = {
    totalTests: 45,
    testsThisMonth: 12,
    averageScore: 78,
    scoreImprovement: 8,
    bestRank: 456,
    bestRankDate: "12/12/2024",
    studyStreak: 28,
    currentStreak: 15,
    consistency: 85,
    timeEfficiency: 82,
    avgTimePerQuestion: 125
  };

  const handleReviewTest = (test) => {
    navigate('/test-results', { state: { testId: test.id } });
  };

  const handleRetakeTest = (test) => {
    navigate('/test-generator', { 
      state: { 
        retakeConfig: {
          subjects: test.subjectPerformance.map(s => s.name.toLowerCase()),
          difficulty: 'mixed',
          duration: test.duration,
          testType: test.type
        }
      }
    });
  };

  const handleCompareTests = () => {
    if (selectedTests.length < 2) {
      alert('Please select at least 2 tests to compare');
      return;
    }
    // Navigate to comparison view or show comparison modal
    console.log('Comparing tests:', selectedTests);
  };

  const handleExportData = () => {
    const dataToExport = selectedTests.length > 0 
      ? mockTests.filter(test => selectedTests.includes(test.id))
      : mockTests;
    
    const csvContent = [
      ['Date', 'Test Name', 'Score', 'Accuracy', 'Duration', 'Rank', 'Weak Areas'].join(','),
      ...dataToExport.map(test => [
        test.date,
        test.name,
        test.score,
        test.accuracy,
        test.duration,
        test.rank,
        test.weakAreas.join('; ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSelectTest = (testId, isSelected) => {
    setSelectedTests(prev => 
      isSelected 
        ? [...prev, testId]
        : prev.filter(id => id !== testId)
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to test data
  };

  const filteredTests = mockTests.filter(test => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return test.name.toLowerCase().includes(query) ||
             test.type.toLowerCase().includes(query) ||
             test.weakAreas.some(area => area.toLowerCase().includes(query));
    }
    return true;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pt-16">
        <Breadcrumb />
        
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Test History
              </h1>
              <p className="text-text-secondary font-caption">
                Track your preparation journey and analyze performance trends
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
                loading={isLoading}
              >
                Refresh
              </Button>
              
              {selectedTests.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCompareTests}
                    iconName="GitCompare"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Compare ({selectedTests.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportData}
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Statistics Panel */}
          <StatisticsPanel statistics={mockStatistics} />

          {/* Performance Graph */}
          <PerformanceGraph data={mockGraphData} />

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
                />
                <Input
                  type="search"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-background rounded-academic border border-border">
                <Button
                  variant={viewMode === 'cards' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                  iconSize={16}
                  className="rounded-none rounded-l-academic"
                />
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="List"
                  iconSize={16}
                  className="rounded-none rounded-r-academic"
                />
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            onFilterChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          {/* Test History Content */}
          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestHistoryCard
                  key={test.id}
                  test={test}
                  onReview={handleReviewTest}
                  onRetake={handleRetakeTest}
                />
              ))}
            </div>
          ) : (
            <TestHistoryTable
              tests={filteredTests}
              onReview={handleReviewTest}
              onRetake={handleRetakeTest}
              onCompare={handleCompareTests}
              selectedTests={selectedTests}
              onSelectTest={handleSelectTest}
            />
          )}

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" size={32} className="text-text-muted" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                No tests found
              </h3>
              <p className="text-text-secondary mb-4 font-caption">
                {searchQuery ? 'Try adjusting your search criteria' : 'Start taking tests to see your history here'}
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/test-generator')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Take Your First Test
              </Button>
            </div>
          )}
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default TestHistory;