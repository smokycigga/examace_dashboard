import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestHistoryTable = ({ tests, onReview, onRetake, onCompare, selectedTests, onSelectTest }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortConfig.direction === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> : 
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const toggleRowExpansion = (testId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId);
    } else {
      newExpanded.add(testId);
    }
    setExpandedRows(newExpanded);
  };

  const sortedTests = [...tests].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return (
    <div className="bg-surface rounded-academic border border-border shadow-academic overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedTests.length === tests.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      tests.forEach(test => onSelectTest(test.id, true));
                    } else {
                      tests.forEach(test => onSelectTest(test.id, false));
                    }
                  }}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 font-heading font-semibold text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Date</span>
                  {getSortIcon('date')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 font-heading font-semibold text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Test Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center space-x-1 font-heading font-semibold text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Score</span>
                  {getSortIcon('score')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('accuracy')}
                  className="flex items-center space-x-1 font-heading font-semibold text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Accuracy</span>
                  {getSortIcon('accuracy')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('duration')}
                  className="flex items-center space-x-1 font-heading font-semibold text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Duration</span>
                  {getSortIcon('duration')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-semibold text-text-primary">Weak Areas</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-semibold text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedTests.map((test) => (
              <React.Fragment key={test.id}>
                <tr className="hover:bg-secondary-50 transition-smooth">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(test.id)}
                      onChange={(e) => onSelectTest(test.id, e.target.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-text-primary font-caption">{test.date}</span>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => toggleRowExpansion(test.id)}
                        iconName={expandedRows.has(test.id) ? "ChevronUp" : "ChevronDown"}
                        iconSize={14}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-text-primary">{test.name}</div>
                      <div className="text-sm text-text-secondary font-caption">{test.type}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-data font-semibold ${getScoreColor(test.score)}`}>
                      {test.score}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-data text-text-primary">{test.accuracy}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-data text-text-primary">{formatDuration(test.duration)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {test.weakAreas.slice(0, 2).map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-error-50 text-error-700 rounded-academic-sm text-xs font-caption"
                        >
                          {area}
                        </span>
                      ))}
                      {test.weakAreas.length > 2 && (
                        <span className="px-2 py-1 bg-secondary-100 text-text-secondary rounded-academic-sm text-xs font-caption">
                          +{test.weakAreas.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => onReview(test)}
                        iconName="Eye"
                        iconSize={14}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => onRetake(test)}
                        iconName="RotateCcw"
                        iconSize={14}
                      />
                    </div>
                  </td>
                </tr>
                {expandedRows.has(test.id) && (
                  <tr>
                    <td colSpan="8" className="px-4 py-3 bg-background">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Subject Performance</h4>
                          <div className="space-y-2">
                            {test.subjectPerformance.map((subject, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-sm text-text-secondary">{subject.name}</span>
                                <span className={`text-sm font-data ${getScoreColor(subject.score)}`}>
                                  {subject.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Time Analysis</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-text-secondary">Avg. per question</span>
                              <span className="text-sm font-data text-text-primary">{test.avgTimePerQuestion}s</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-text-secondary">Time efficiency</span>
                              <span className="text-sm font-data text-text-primary">{test.timeEfficiency}%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Question Stats</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-text-secondary">Attempted</span>
                              <span className="text-sm font-data text-text-primary">{test.attempted}/{test.totalQuestions}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-text-secondary">Correct</span>
                              <span className="text-sm font-data text-success">{test.correct}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestHistoryTable;